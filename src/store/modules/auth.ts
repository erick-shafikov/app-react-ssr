import { makeAutoObservable, runInAction } from "mobx";
import RootStore from "..";
import { TUser } from "../../types/data";

class Auth {
  rootStore: RootStore;
  readyPromise: ReturnType<RootStore["api"]["auth"]["check"]>;
  isReady: boolean;
  user: TUser | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this.readyPromise = new Promise(() => {}); // trash promise

    this.isReady = false;
  }

  async init() {
    this.readyPromise = this.rootStore.api.auth.check();
    const response = await this.readyPromise;

    runInAction(() => {
      this.isReady = true;
      this.user = response.username ? response : null;
    });
  }
}

export default Auth;
