import { TApiInstance, TApiInstanceKeys } from "@src/api";

import useApi from "../contexts/useApi";
import { useState, useEffect } from "react";
import { TApiRequest } from "./types";
import { GetByDotKey, getByDotKey, runFnWithTuple } from "@utility/objects";

//хук для загрузки данных без ssr (не используется в проекте)

function useApiRequest<T extends TApiInstanceKeys>(
  schema: T,
  ...params: Parameters<GetByDotKey<TApiInstance, T>>
) {
  const api = useApi();
  const fn = getByDotKey(api, schema);
  type Res = Awaited<ReturnType<typeof fn>>;

  const initial: TApiRequest<Res> = {
    done: false,
    success: false,
    data: null,
    error: null,
  };

  const [result, setResult] = useState<TApiRequest<Res>>(initial);

  useEffect(() => {
    runFnWithTuple(fn, params)
      .then((data) =>
        setResult({
          done: true,
          success: true,
          data: data as Res,
          error: null,
        })
      )
      .catch((e: Error) =>
        setResult({
          done: true,
          success: false,
          data: null,
          error: e,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
}

export default useApiRequest;
