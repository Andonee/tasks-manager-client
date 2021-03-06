import React from 'react'
import styles from './Input.module.scss'

type inputProps = {
	value?: string
	name?: string
	type?: string
	label?: string
	register?: any
	placeholder?: string
	onChange?: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void
}

const Input = ({
	value,
	name,
	label,
	type = 'text',
	register,
	placeholder,
	onChange,
}: inputProps) => {
	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				className={styles.input}
				name={name}
				type={type}
				ref={register}
				placeholder={placeholder}
				{...register}
				value={value}
				onChange={onChange}
			/>
		</>
	)
}

export default Input
