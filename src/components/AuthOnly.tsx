import { observer } from "mobx-react";
import useStore from "@src/contexts/useStore";
import { ReactNode } from "react";

const AuthOnly = observer(function ({ children }: { children: ReactNode }) {
  const {
    auth: { user, isReady },
  } = useStore();

  return <>{isReady && <>{user && children}</>}</>;
});

export default AuthOnly;
