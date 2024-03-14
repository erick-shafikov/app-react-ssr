import { TApiInstance } from "../api";
import Auth from "./modules/auth";

import Page from "./modules/page";
import Users from "./modules/users";

class RootStore {
  api: TApiInstance;
  users: Users;
  page: Page;
  auth: Auth;

  constructor(api: TApiInstance) {
    this.api = api;

    this.users = new Users(this);
    this.page = new Page(this);
    this.auth = new Auth(this);
  }

  toJson(): JSONStore {
    return {
      users: {
        users: this.users.users,
      },
    };
  }

  fromJson(data: JSONStore) {
    this.users.users = data.users.users;
  }
}

export interface JSONStore {
  users: {
    users: Users["users"];
  };
}

export default RootStore;
