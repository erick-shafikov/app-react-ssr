import { createContext } from "react";
import { TApiInstance } from "@src/api";

const apiContext = createContext<TApiInstance | null>(null);

export default apiContext;
