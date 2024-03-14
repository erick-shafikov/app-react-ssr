import { JSONStore } from "./store"

declare global {
	interface Window { 
		ssrData: {
			store: JSONStore,
			cache: Record<string,unknown>
		}
	}
}

declare module 'axios'{
	interface AxiosRequestConfig{
		errorAlert?: {
			text: string
		}
	}
}