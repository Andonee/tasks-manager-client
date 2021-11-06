import React, { useEffect } from 'react'
import styles from './App.module.scss'
import { useDispatch } from 'react-redux'
import { AUTH_SUCCESS } from '../../store/types/auth'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import jwt_decode, { JwtPayload } from 'jwt-decode'

interface AppProps extends RouteComponentProps<any> {
	children: React.ReactNode
}

type customJwtPayload = JwtPayload & { exp: number }

const App: React.SFC<AppProps> = ({ children, history }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token')
		const userId = localStorage.getItem('userId')

		if (token && userId) {
			const expiryDate = new Date(
				jwt_decode<customJwtPayload>(token).exp * 1000
			)
			const currentDate = new Date()

			if (currentDate < expiryDate) {
				const authData = {
					token,
					userId,
				}
				dispatch({ type: AUTH_SUCCESS, payload: authData })
				history.push(`/projects/${userId}`)
			} else {
				localStorage.removeItem('token')
				localStorage.removeItem('userId')
			}
		}
	}, [])
	return <div className={styles.app}>{children}</div>
}

export default withRouter(App)
