import React from 'react'
import styles from './Button.module.scss'

type buttonProps = {
	text: string
	width?: string
	onClick?: () => void
}

const Button = ({ text, width = 'fit-content', onClick }: buttonProps) => {
	return (
		<button
			style={{ width: width }}
			className={styles.button}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

export default Button
