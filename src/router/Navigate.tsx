import { NavigateProps, Navigate as RouterNavigate } from "react-router-dom";
import useStore from "@src/contexts/useStore";

let Navigate: typeof RouterNavigate;

//Компонент Navigate
if (import.meta.env.SSR) {
  Navigate = function Navigate({ to }: NavigateProps) {
    // серверная реализация
    const { page } = useStore();
    page.redirect(typeof to === "object" ? to.pathname ?? "/" : to);
    return null;
  };
} else {
  Navigate = RouterNavigate;
}

export default Navigate;
