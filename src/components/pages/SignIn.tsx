import React from 'react'
import styles from './SignIn.module.scss'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../UI'
import { useDispatch } from 'react-redux'
import { signup } from '../../store/actions/auth'
import { RouteComponentProps } from 'react-router-dom'

const SignIn: React.SFC<RouteComponentProps> = ({ history }) => {
	const { register, handleSubmit, reset } = useForm()
	const dispatch = useDispatch()

	const onSubmitHandler = (data: any) => {
		dispatch(signup(data, user => history.push(`/projects/${user}`)))
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
						<Button text='log in' width='100%' />
					</form>
					<Button text='create account' width='100%' />
				</div>
			</div>
		</div>
	)
}

export default SignIn
