import React from 'react'
import styles from './Input.module.scss'

type inputProps = {
	value?: string
	name?: string
	type?: string
	label?: string
	register?: any
}

const Input = ({ value, name, label, type = 'text', register }: inputProps) => {
	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
			<input className={styles.input} name={name} type={type} {...register} />
		</>
	)
}

export default Input
