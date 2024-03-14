import { AxiosInstance } from "axios";
import { TCheckResponse, TLoginResponse } from "types/data";

// модуль авторизации
function createAuthApi(http: AxiosInstance) {
  return {
    async login(username: string, password: string) {
      return (
        await http.post<TLoginResponse>(`auth/login`, {
          username,
          password,
        })
      ).data;
    },
    async check() {
      return (await http.get<TCheckResponse>(`auth/me`)).data;
    },
  };
}

export default createAuthApi;
