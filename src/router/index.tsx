import Error404 from "@components/errors/errors";
import UsersPage from "@pages/users/UsersPage";
import UserPage from "@pages/users/UserPage";
import UserTodosPage from "@pages/users/todos/UserTodosPage";
import { RouteRecords, recordToNative } from "./utils";
import LoginPage from "@pages/auth/LoginPage";
import AuthGuard from "@components/AuthGuard";
import OfficePage from "@pages/office/OfficePage";
import GuestGuard from "@components/GuestGuard";
import UserPostsPage from "@pages/users/posts/UserPostsPage";
import PostPage from "@pages/posts/PostPage";
import PostViewPage from "@pages/posts/PostViewPage";
import PostEditPage from "@pages/posts/PostEditPage";

// компонент роутера
const routes = {
  home: {
    path: "/",
    Component: UsersPage,
  },
  user: {
    path: "/user/:id",
    Component: UserPage,
    children: {
      todos: {
        path: "/user/:id/todos",
        Component: UserTodosPage,
      },
      posts: {
        path: "/user/:id/posts",
        Component: UserPostsPage,
      },
    },
  },
  post: {
    path: "/posts/:id",
    Component: PostPage,
    children: {
      view: {
        path: "/posts/:id",
        Component: PostViewPage,
      },
      edit: {
        path: "/posts/:id/edit",
        element: (
          <AuthGuard>
            <PostEditPage />
          </AuthGuard>
        ),
      },
    },
  },
  login: {
    path: "/auth/login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  office: {
    path: "/office",
    element: (
      <AuthGuard>
        <OfficePage />
      </AuthGuard>
    ),
  },
  e404: {
    path: "*",
    element: <Error404 />,
  },
} as const satisfies RouteRecords;

export type TRoutes = typeof routes;

export const routesNative = Object.values(routes).map(recordToNative);

export default routes;
