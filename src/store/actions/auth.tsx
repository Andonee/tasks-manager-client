import { AUTH_SUCCESS, AUTH_ERROR } from '../types/auth'
import axios, { AxiosError } from 'axios'
import { ThunkAction } from 'redux-thunk'
import { AuthDispatchTypes, authErrorResponse, signInData } from '../types/auth'

import { RootStore } from '../store'
import jwt_decode, { JwtPayload } from 'jwt-decode'

type customJwtPayload = JwtPayload & { sub: string }

export const signup = (
	data: signInData,
	cb: (user: string) => void
): ThunkAction<void, RootStore, unknown, AuthDispatchTypes> => {
	return async dispatch => {
		try {
			const response: { data: { accessToken: string; error: string } } =
				await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, data)
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
