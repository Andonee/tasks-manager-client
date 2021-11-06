import { AUTH_SUCCESS, AUTH_ERROR } from '../types/auth'
import axios, { AxiosError } from 'axios'
import { ThunkAction } from 'redux-thunk'
import {
	AuthDispatchTypes,
	authSuccessResponse,
	AuthSuccess,
	AuthError,
	authErrorResponse,
	actionType,
	signInData,
} from '../types/auth'
import { authStoreType } from '../reducers/authReducer'
import { Dispatch } from 'redux'
import { RootStore } from '../store'
import { AnyAction } from 'redux'
import jwt_decode, { JwtPayload } from 'jwt-decode'

type signUp = {
	formProps: { email: string; password: string }
	cb?: () => void
}

type props = {
	data: string
}

type customJwtPayload = JwtPayload & { sub: string }

type authResponseType = () => ThunkAction<
	void,
	RootStore,
	unknown,
	AuthDispatchTypes
>

export const signup = (
	data: signInData,
	cb: (user: string) => void
): ThunkAction<void, RootStore, unknown, AuthDispatchTypes> => {
	return async dispatch => {
		try {
			const response: { data: { accessToken: string; error: string } } =
				await axios.post('http://localhost:5000/login', data)
			const token = response.data.accessToken
			const userId = jwt_decode<customJwtPayload>(token).sub
			const authData = {
				token,
				userId,
			}

			if (!response.data.error) {
				localStorage.setItem('token', token)
				localStorage.setItem('userId', userId)
			}

			dispatch({ type: AUTH_SUCCESS, payload: authData })
			cb(userId)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const userError = error as AxiosError<authErrorResponse>
				if (userError && userError.response) {
					dispatch({ type: AUTH_ERROR, payload: error.response!.data })
				}
			}
		}
	}
}
