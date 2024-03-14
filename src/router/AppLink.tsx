import { Link, LinkProps } from "react-router-dom";
import { InferRouteParams, TRouteNames } from "@src/router/types";
import { getRouteByName } from "@src/router/utils";

//тип добавляет ограничение на проп to, он может соответствовать только dotted нотации
type AppLinkProps<T extends TRouteNames> = Omit<LinkProps, "to"> & {
  to: T;
} & AddParamsToProps<InferRouteParams<T>>;

// замена компонента Link
function AppLink<T extends TRouteNames>({
  to,
  params,
  ...other
}: AppLinkProps<T>) {
  const route = getRouteByName(to);
  let url: string = route.path;

  params?.forEach((param) => {
    url = url.replace(/:.+?(\/|$)/, function (find) {
      return param + (find.endsWith("/") ? "/" : "");
    });
  });

  return <Link to={url} {...other} />;
}

export default AppLink;

type AddParamsToProps<T> = T extends [] ? { params?: never } : { params: T };
