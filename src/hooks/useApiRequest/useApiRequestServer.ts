import { TApiInstance, TApiInstanceKeys } from "@src/api";
import { GetByDotKey, getByDotKey, runFnWithTuple } from "@src/utility/objects";
import useApi from "@src/contexts/useApi";
import useCache from "@src/contexts/useCache";
import { TApiRequest } from "@src/hooks/types";

// запрос осуществляемый на сервере
function useApiRequestServer<T extends TApiInstanceKeys>(
  schema: T,
  ...params: Parameters<GetByDotKey<TApiInstance, T>>
) {
  type Res = Awaited<ReturnType<GetByDotKey<TApiInstance, T>>>;

  // получаем контекст
  const api = useApi();
  // получаем кеш
  const cache = useCache();

  //формируем ключ для кеша
  const key = schema + ":" + JSON.stringify(params);
  let result: TApiRequest<Res>;

  // если такой запрос уже есть
  if (key in cache.data) {
    result = {
      done: true,
      success: true,
      data: cache.data[key] as Res,
      error: null,
    };
  } else {
    // проверка на нахождение в неразрешенных промисах
    if (!(key in cache.awaiting)) {
      const fn = getByDotKey(api, schema);
      // добавляем в кеш
      cache.awaiting[key] = runFnWithTuple(fn, params);
    }

    result = {
      done: false,
      success: false,
      data: null,
      error: null,
    };
  }

  return result;
}

export default useApiRequestServer;
