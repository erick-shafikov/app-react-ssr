import ReactDOM, { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import createApp from "@src/createApp";

// клиентская часть приложения
(async function () {
  try {
    const { app } = await createApp();
    const el = document.getElementById("root")!;

    // оборачиваем в роутер
    const clientApp = <BrowserRouter>{app}</BrowserRouter>;

    // если есть ssrData, то это клиентская часть, которую можно наполнять функционалом
    if ("ssrData" in window) {
      hydrateRoot(el, clientApp);
    } else {
      // если нет, то отрисовать просто html
      ReactDOM.createRoot(el).render(clientApp);
    }
  } catch (e) {
    document.body.innerHTML = `<div>Site isn't available now</div>`;
  }
})();

import "bootstrap/dist/css/bootstrap.min.css";
