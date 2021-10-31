import React from 'react'
import styles from './SignIn.module.scss'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../UI'

const SignIn = () => {
	const { register, handleSubmit, reset } = useForm()

	const onSubmitHandler = (data: any) => {
		console.log(data)
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
						<Button text='log in' />
					</form>
				</div>
			</div>
		</div>
	)
}

export default SignIn
