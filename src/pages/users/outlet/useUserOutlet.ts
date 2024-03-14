import { useOutletContext } from "react-router-dom";
import { UserOutletProps } from "@src/pages/users/outlet/UserOutlet";

export default function useUserOutletContext() {
  return useOutletContext<UserOutletProps["context"]>();
}
