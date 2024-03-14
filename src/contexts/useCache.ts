import { useContext } from "react";
import cacheContext from "@src/contexts/cache";

function useCache() {
  const cache = useContext(cacheContext);

  if (cache === null) {
    throw new Error(
      "Some moron run server system without cache provider, please check who is it"
    );
  }

  return cache;
}

export default useCache;
