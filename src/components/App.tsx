import { useRoutes } from "react-router-dom";
import { routesNative } from "@src/router";
import AppLink from "@src/router/AppLink";
import { observer } from "mobx-react";
import useStore from "@src/contexts/useStore";
import useCache from "@src/contexts/useCache";
import { useEffect } from "react";

const App = observer(function () {
  const cache = useCache();

  // инициализация кеша
  useEffect(() => {
    if (!import.meta.env.SSR) {
      cache.data = {};
    }
  }, [cache]);

  // хук useRoutes возвращает приложение обернутое в Outlet
  const view = useRoutes(routesNative);

  // проверка на авторизацию
  const {
    auth: { user },
  } = useStore();

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col">
          <h1>Hello React!</h1>
        </div>
        <div className="col">
          {!user && <AppLink to="login">Login</AppLink>}
          {user && <strong>{user.email}</strong>}
        </div>
      </div>
      <hr />
      {view}
    </div>
  );
});

export default App;
