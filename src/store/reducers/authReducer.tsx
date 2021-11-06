import { AUTH_ERROR, AUTH_SUCCESS, AuthDispatchTypes } from '../types/auth'

export type authStoreType = {
	auth: string
	user: string
	error: string
}

const initialState: authStoreType = {
	auth: '',
	user: '',
	error: '',
}

const authReducer = (state = initialState, action: AuthDispatchTypes) => {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {
				...state,
				auth: action.payload.token,
				user: action.payload.userId,
			}
		case AUTH_ERROR:
			return {
				...state,
				error: action.payload,
			}
		default:
			return state
	}
}

export default authReducer
