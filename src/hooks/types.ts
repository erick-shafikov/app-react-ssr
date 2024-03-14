export type TApiRequestPending = {
	done: false,
	success: false,
	data: null,
	error: null
}

export type TApiRequestSuccess<T> = {
	done: true,
	success: true,
	data: T,
	error: null
}

export type TApiRequestError = {
	done: true,
	success: false,
	data: null,
	error: Error
}

export type TApiRequest<T> = TApiRequestPending | TApiRequestSuccess<T> | TApiRequestError;