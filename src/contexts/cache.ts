import { createContext } from "react";

export interface Cache{
	data: Record<string,unknown>,
	awaiting: Record<string,Promise<unknown>>
}

const cacheContext = createContext<Cache | null>({
	data: {},
	awaiting: {}
});

export default cacheContext;