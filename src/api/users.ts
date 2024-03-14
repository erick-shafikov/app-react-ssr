import { AxiosInstance } from "axios";
import type { TPost, TTodo, TUser } from "types/data";

function createUsersApi(http: AxiosInstance) {
  return {
    async all() {
      const { users = [] } = (await http.get<{ users: TUser[] }>("users")).data;

      return users;
    },
    async one(id: number) {
      return (
        await http.get<TUser>(`users/${id}`, {
          errorAlert: {
            text: "can't load the user",
          },
        })
      ).data;
    },
    todos: {
      async all(userId: number) {
        const { todos = [] } = (
          await http.get<{ todos: TTodo[] }>(`todos/user/${userId}`)
        ).data;

        return todos;
      },
    },
    posts: {
      async all(userId: number) {
        const { posts } = (
          await http.get<{ posts: TPost[] }>(`posts/user/${userId}`)
        ).data;

        return posts;
      },
      async one(postId: number) {
        return (await http.get<TPost>(`posts/${postId}`)).data;
      },
      async update(postId: number, title: string, body: string) {
        return (await http.put<TPost>(`posts/${postId}`, { title, body })).data;
      },
    },
  };
}

export default createUsersApi;
