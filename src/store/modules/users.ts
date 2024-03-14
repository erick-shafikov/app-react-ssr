import { makeAutoObservable, runInAction } from "mobx";
import RootStore from "..";
import {
  TUserNeighbors as TUserNeighbors,
  TUserPrimary,
} from "../../types/data";

class Users {
  rootStore: RootStore;
  users: TUserPrimary[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  get one() {
    return (id: number) => this.users.find((u) => u.id === id);
  }

  get neighbors() {
    return (id: number): TUserNeighbors => {
      const cur = this.users.findIndex((u) => u.id === id);

      return cur > -1
        ? {
            prev: this.users[cur - 1] ?? null,
            next: this.users[cur + 1] ?? null,
          }
        : { prev: null, next: null };
    };
  }

  async load() {
    const usersFullInfo = (await this.rootStore.api.users.all()) || [];

    const users = usersFullInfo.map(({ id, username, email }) => ({
      id,
      username,
      email,
    }));
    runInAction(() => (this.users = users));
  }
}

export default Users;
