import React from 'react'
import styles from './Select.module.scss'

type selectProps = {
	name: string
	values: string[]
	selected: string
}

const Select = ({ name, values, selected }: selectProps) => {
	return (
		<select name={name} className={styles.select}>
			{values.map(value => {
				return value === selected ? (
					<option selected value={value}>
						{value}
					</option>
				) : (
					<option value={value}>{value}</option>
				)
			})}
		</select>
	)
}

export default Select
