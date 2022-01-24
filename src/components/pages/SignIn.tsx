import React, { useState } from 'react'
import styles from './SignIn.module.scss'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../UI'
import { useDispatch } from 'react-redux'
import { signin, signup } from '../../store/actions/auth'
import { RouteComponentProps } from 'react-router-dom'

const SignIn: React.SFC<RouteComponentProps> = ({ history }) => {
	const { register, handleSubmit, reset } = useForm()
	const dispatch = useDispatch()
	const [logInMode, setLogInMode] = useState(true)

	const onSubmitHandler = (data: any) => {
		if (logInMode) {
			dispatch(signin(data, user => history.push(`/projects/${user}`)))
		} else {
			dispatch(signup(data, user => history.push(`/projects/${user}`)))
		}
	}

	const onSwitchModeHander = () => {
		setLogInMode(!logInMode)
	}

	return (
		<div className={styles.signIn}>
			<div className={styles.signIn__container}>
				<div className={styles.signIn__container__form}>
					<h3>PROJECTS MANAGER</h3>
					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<fieldset className={styles.signIn__container__form__element}>
							<Input register={{ ...register('email') }} label='email' />
						</fieldset>
						<fieldset className={styles.signIn__container__form__element}>
							<Input
								register={{ ...register('password') }}
								label='password'
								type='password'
								{...register('password')}
							/>
						</fieldset>
						<Button
							text={logInMode ? 'log in' : 'create account'}
							width='100%'
						/>
					</form>
					<Button
						text={logInMode ? 'go to create account form' : 'go to log in form'}
						width='100%'
						onClick={onSwitchModeHander}
					/>
				</div>
			</div>
		</div>
	)
}

export default SignIn
