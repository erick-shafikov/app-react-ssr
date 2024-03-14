import { StaticRouter } from "react-router-dom/server";

import createApp from "@src/createApp";

interface ServerAppContext {
  url: string;
}

async function createServerApp(context: ServerAppContext) {
  const { app, store, cache } = await createApp();
  // главная цель createServerApp - создать статическую обертку вокруг app и пробросить store, cache
  const serverApp = <StaticRouter location={context.url}>{app}</StaticRouter>;

  return { app: serverApp, store, cache };
}

export default createServerApp;
