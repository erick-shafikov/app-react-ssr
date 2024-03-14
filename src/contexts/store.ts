import { createContext } from "react";
import RootStore from "@src/store";

const storeContext = createContext<RootStore | null>(null);

export default storeContext;
