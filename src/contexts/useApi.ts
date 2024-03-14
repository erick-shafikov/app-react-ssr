import { useContext } from "react";
import apiContext from "@src/contexts/api";

function useApi() {
  const api = useContext(apiContext);

  if (api === null) {
    throw new Error(
      "Some moron run system without api provider, please check who is it"
    );
  }

  return api;
}

export default useApi;
