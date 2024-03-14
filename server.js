import fs from "node:fs/promises";
import express from "express";
import { recursiveRender } from "./src/lib/recursiveRender.js";

// Константы для сервера и среды разработки
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Шаблон для html
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
// const ssrManifest = isProduction
//   ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
//   : undefined;

// Create http server ()
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let createApp;
    // let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      createApp = (await vite.ssrLoadModule("/src/entry-server.tsx")).default;
    } else {
      template = templateHtml;
      createApp = (await import("./dist/server/entry-server.js")).default;
    }

    const context = { url };
    const { app, store, cache } = await createApp(context);
    const html = await recursiveRender(app, cache);

    if (store.page.status >= 300 && store.page.status <= 308) {
      res.redirect(store.page.status, store.page.redirectTo);
    } else {
      res.status(store.page.status);

      const ssrData = {
        store: store.toJson(),
        cache: cache.data,
      };

      const page = template
        .replace("<!--ssr-->", html)
        .replace("<!--ssr-title-->", store.page.title)
        .replace(
          "<!--ssr-data-->",
          `<script>window.ssrData = ${JSON.stringify(ssrData)}</script>`
        );

      res.end(page);
    }
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
