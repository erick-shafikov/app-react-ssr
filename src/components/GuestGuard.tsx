import { observer } from "mobx-react";
import useStore from "@src/contexts/useStore";
import { ReactNode } from "react";
import Navigate from "@src/router/Navigate";

const GuestGuard = observer(function ({ children }: { children: ReactNode }) {
  const {
    auth: { user },
  } = useStore();

  return (
    <>
      {!user && children}
      {user && <Navigate to="/office" />}
    </>
  );
});

export default GuestGuard;
