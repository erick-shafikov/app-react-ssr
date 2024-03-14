import RootStore from "@src/store";
import storeContext from "@src/contexts/store.js";
import apiContext from "@src/contexts/api.js";
import createHttpPlugin from "@src/plugins/http.js";
import createApi from "@src/api/index.js";
import cacheContext, { Cache } from "@src/contexts/cache.js";
import App from "@components/App.js";

async function createApp() {
  // http клиент axios
  const http = createHttpPlugin();
  // создаем api
  const api = createApi(http);
  // создаем экземпляр хранилища
  const store = new RootStore(api);
  // создаем cache для данных и
  const cache: Cache = {
    data: {},
    awaiting: {},
  };

  // на клиенте
  if (!import.meta.env.SSR) {
    // на клиентской части с каждым запросом отправляем токен из ls
    http.interceptors.request.use((config) => {
      const token = localStorage.getItem("AUTH_TOKEN");

      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    // interceptors для ошибок авторизации
    http.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 401) {
          document.location = "/auth/login";
        } else {
          return Promise.reject(error);
        }
      }
    );
    // проверка на кастомную ошибку
    http.interceptors.response.use(
      (res) => res,
      (error) => {
        if ("errorAlert" in error.config) {
          console.log("Логика по отображению ошибки");
        }

        return Promise.reject(error);
      }
    );
    store.auth.init();
  }

  // на клиенте если есть ssrData
  if (!import.meta.env.SSR && window.ssrData) {
    // метод по добавлению users из кеша
    store.fromJson(window.ssrData.store);
    cache.data = window.ssrData.cache;
  } else {
    // на клиенте если нет ssrData, то это первый запрос за данными, загружаем пользователей
    await store.users.load();
  }

  const app = (
    <cacheContext.Provider value={cache}>
      <apiContext.Provider value={api}>
        <storeContext.Provider value={store}>
          <App />
        </storeContext.Provider>
      </apiContext.Provider>
    </cacheContext.Provider>
  );
  // прокидываем app - приложение, store - состояние хранилища (mobx), cache - объект глобального кеша
  return { app, store, cache };
}

export default createApp;
