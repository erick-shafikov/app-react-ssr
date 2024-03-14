import { Outlet } from "react-router-dom";
import { TUser } from "@src/types/data";

export interface UserOutletProps {
  context: TUser;
}

function UserOutlet({ context }: UserOutletProps) {
  return <Outlet context={context} />;
}

export default UserOutlet;
