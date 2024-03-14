import routes from ".";
import { RouteRecord, RouteRecords } from "@src/router/utils";

export type TRoutes = typeof routes;

// получения всех возможных ключей из объект routes
export type TRouteNames = GenerateRoutesNames<TRoutes>;

// тип для получения названия пути через точку
export type GenerateRoutesNames<
  // T - запись вида {path: string, children: {....}}
  T extends RouteRecords,
  // K - ключ от объекта T
  K = keyof T
> = K extends string // если ключ это строка
  ? T[K] extends { children: RouteRecords } // проверить нет ли children
    ? `${K}.${GenerateRoutesNames<T[K]["children"]>}` | `${K}` // запустить рекурсию, поставив ключ в конец строки
    : `${K}` // нет children, вернуть ключ
  : never; // если k не строка, то ничего не возвращать

export type GetRouteByName<
  O extends RouteRecords,
  N extends string
> = N extends `${infer R1}.${infer R2}`
  ? O[R1] extends { children: RouteRecords }
    ? GetRouteByName<O[R1]["children"], R2>
    : never
  : N extends keyof O
  ? O[N]
  : never;

export type InferRouteParams<
  N extends TRouteNames,
  R = GetRouteByName<TRoutes, N>
> = R extends RouteRecord ? SplitRoutePathToParams<R["path"]> : never;

export type ValidRouteParam = string | number;

type SplitRoutePathToParams<P extends string> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  P extends `${infer _R1}:${infer R2}`
    ? [ValidRouteParam, ...SplitRoutePathToParams<R2>]
    : [];
