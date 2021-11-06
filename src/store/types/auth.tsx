export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

export type authSuccessResponse = {
	token: string
	userId: string
}

export type authErrorResponse = {
	error: {
		response: {
			data: string
		}
	}
}

export type AuthSuccess = {
	type: typeof AUTH_SUCCESS
	payload: authSuccessResponse
}

export type AuthError = {
	type: typeof AUTH_ERROR
	payload: authErrorResponse
}

export type actionType = {
	type: String
	payload: authSuccessResponse | authErrorResponse
}

export type signInData = {
	email: string
	password: string
}

export type AuthDispatchTypes = AuthSuccess | AuthError
