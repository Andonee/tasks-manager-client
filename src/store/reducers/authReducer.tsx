import { AUTH_ERROR, AUTH_SUCCESS, AuthDispatchTypes } from '../types/auth'
import { Reducer } from 'redux'

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

const authReducer: Reducer<authStoreType, AuthDispatchTypes> = (
	state = initialState,
	action
) => {
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
				error: 'Some error occured',
			}
		default:
			return state
	}
}

export default authReducer
