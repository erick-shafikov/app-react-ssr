import { test, expect, beforeEach } from "vitest";
import { screen, render, waitFor, act } from "@testing-library/react";
import { TApiInstance } from "../api";
import RootStore from "../store";
import cacheContext from "../contexts/cache";
import apiContext from "../contexts/api";
import storeContext from "../contexts/store";
import App from "../components/App";
import { StaticRouter } from "react-router-dom/server";

type RecPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? RecPartial<T[K]> : T[K];
};

type AuthTestContext = {
  api: TApiInstance;
  store: RootStore;
};

beforeEach<AuthTestContext>(async (context) => {
  const apiPartial: RecPartial<TApiInstance> = {
    auth: {
      async check() {
        return {
          auth: true,
          user: {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
        };
      },
    },
    users: {
      posts: {
        async one(postId: number) {
          return {
            userId: 1,
            id: postId,
            title:
              "MARKER aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          };
        },
      },
    },
  };

  context.api = apiPartial as TApiInstance;
  context.store = new RootStore(context.api);

  render(
    <StaticRouter location={"/posts/1"}>
      <cacheContext.Provider value={{ data: {}, awaiting: {} }}>
        <apiContext.Provider value={context.api}>
          <storeContext.Provider value={context.store}>
            <App />
          </storeContext.Provider>
        </apiContext.Provider>
      </cacheContext.Provider>
    </StaticRouter>
  );

  await waitFor(() => expect(screen.getByText(/MARKER/i)).toBeDefined());
});

test("Without auth", () => {
  expect(screen.getByText(/Login/i)).toBeDefined();
  expect(screen.getByText(/MARKER/i)).toBeDefined();
  expect(screen.queryByText(/Edit post/i)).toBeNull();
});

test<AuthTestContext>("Auth, post owner", async (context) => {
  await act(async () => {
    await context.store.auth.init();
  });

  expect(screen.getByText(/Sincere@april.biz/i)).toBeDefined();
  expect(screen.getByText(/Edit post/i)).toBeDefined();
});

test("Without auth again", () => {
  expect(screen.getByText(/Login/i)).toBeDefined();
  expect(screen.getByText(/MARKER/i)).toBeDefined();
  expect(screen.queryByText(/Edit post/i)).toBeNull();
});
