import { RouteObject } from "react-router-dom";
import { GetRouteByName, TRouteNames, TRoutes } from "./types";
import routes from ".";

// ----------------------------------------------------------------------
// рекурсивный тип, который позволяет сформировать объект {path: string; children: {path...}}
export type RouteRecord = Omit<RouteObject, "children" | "path"> & {
  path: string;
  children?: RouteRecords;
};

export type RouteRecords = Record<string, RouteRecord>;

// ----------------------------------------------------------------------
// функция позволяющая всех детей упаковать в массив
export function recordToNative(route: RouteRecord): RouteObject {
  const { children, ...copy } = route;
  const res: RouteObject = copy;

  if (children) {
    res.children = Object.values(children).map(recordToNative);
  }

  return res;
}

// получение строки запроса через точку
export function getRouteByName<T extends TRouteNames>(
  schema: T
): GetRouteByName<TRoutes, T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return schema.split(".").reduce(
    (t: any, k: string) => {
      if (t.children[k] === undefined) {
        throw new Error("route dotted key is wrong");
      }

      return t.children[k];
    },
    { children: routes }
  );
}
