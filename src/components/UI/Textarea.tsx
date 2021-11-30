import React from 'react'
import styles from './Textarea.module.scss'

type inputProps = {
	value?: string
	name?: string
	label?: string
	register?: any
	placeholder?: string
	rows?: number
	onChange?: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void
}

const Textarea = ({
	value,
	name,
	label,
	register,
	placeholder,
	rows = 4,
	onChange,
}: inputProps) => {
	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
			<textarea
				name={name}
				placeholder={placeholder}
				rows={rows}
				{...register}
				className={styles.textarea}
				value={value}
				onChange={onChange}
			/>
		</>
	)
}

export default Textarea
