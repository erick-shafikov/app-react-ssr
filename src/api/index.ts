import { FlattenObjectKeys } from "@utility/objects";
import createAuthApi from "@api/auth";
import createUsersApi from "@api/users";
import { AxiosInstance } from "axios";

//инициализация api, если отдавать не в виде функции, то каждый получит одну инстанцию
function createApi(http: AxiosInstance) {
  return {
    users: createUsersApi(http),
    auth: createAuthApi(http),
  };
}

export default createApi;

// получения типа возвращаемых сущностей
export type TApiInstance = ReturnType<typeof createApi>;
// получения ключей
export type TApiInstanceKeys = FlattenObjectKeys<TApiInstance, true>;
