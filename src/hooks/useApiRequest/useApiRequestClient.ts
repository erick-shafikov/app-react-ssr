import { TApiInstance, TApiInstanceKeys } from "@src/api";
import {
  GetByDotKey,
  getByDotKey,
  runFnWithTuple,
} from "../../utility/objects";
import useApi from "../../contexts/useApi";
import { useState, useEffect } from "react";
import { TApiRequest } from "../types";
import useCache from "../../contexts/useCache";

// запрос за данными осуществляемый на клиенте
function useApiRequestClient<T extends TApiInstanceKeys>(
  schema: T,
  ...params: Parameters<GetByDotKey<TApiInstance, T>>
) {
  // получаем из контекста useApi
  const api = useApi();
  const fn = getByDotKey(api, schema);
  // получаем из контекста кеш
  const cache = useCache();

  type Res = Awaited<ReturnType<typeof fn>>;

  // если данные есть то они лежат по ключу строка запроса + дополнительные параметры запроса
  const key = schema + ":" + JSON.stringify(params);

  // есть ли в кеше данные по такому запросу
  const initial: TApiRequest<Res> =
    key in cache.data
      ? {
          done: true,
          success: true,
          data: cache.data[key] as Res,
          error: null,
        }
      : { done: false, success: false, data: null, error: null };

  // устанавливаем их
  const [result, setResult] = useState<TApiRequest<Res>>(initial);

  useEffect(() => {
    if (!result.done) {
      // получаем нужное api c помощью dotted-схемы, добавляем в результат
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
    } else {
      //delete cache.data[key];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
}

export default useApiRequestClient;
