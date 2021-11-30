import React, { useEffect } from 'react'
import styles from './Drawer.module.scss'
import { taskType } from '../../store/types/tasks'
import { useForm } from 'react-hook-form'
import { Input, Textarea, Select, Button } from '../UI'

type DrawerProps = {
	isOpen: boolean
	closeHandler: () => void
	data: taskType
	onEditTask: (task: taskType) => void
	onRemoveTask: (task: taskType) => void
}

type Inputs = {
	title: string
	description: string
	priority: string
	type: string
}

const Drawer = ({
	isOpen,
	closeHandler,
	data,
	onEditTask,
	onRemoveTask,
}: DrawerProps) => {
	const { register, handleSubmit, getValues, reset, setValue } =
		useForm<Inputs>({
			defaultValues: {
				title: data.title,
				description: data.description,
				priority: data.priority,
				type: data.type,
			},
		})

	useEffect(() => {
		setValue('title', data.title)
		setValue('description', data.description)
		setValue('priority', data.priority)
		setValue('type', data.type)
	}, [data, setValue])

	const onSubmitHandler = (editedData: taskType) => {
		const editedObject = { ...editedData, id: data.id }
		// console.log(editedObject)
		onEditTask(editedObject)
	}

	const onRemoveTaskHandler = () => {
		onRemoveTask(data)
	}
	const classes = isOpen
		? `${styles.drawer} ${styles.active}`
		: `${styles.drawer}`

	return (
		<div className={classes}>
			<button onClick={closeHandler}>X</button>
			<form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
				<input
					{...register('title')}
					defaultValue={getValues().title ? getValues().title : ''}
				/>

				<textarea
					{...register('description')}
					defaultValue={getValues().description ? getValues().description : ''}
					placeholder='description'
					rows={6}
				/>
				<select
					{...register('priority')}
					defaultValue={getValues().priority ? getValues().priority : 'low'}
				>
					<option value='low'>low</option>
					<option value='medium'>medium</option>
					<option value='high'>high</option>
				</select>
				<select
					{...register('type')}
					defaultValue={getValues().type ? getValues().type : 'low'}
				>
					<option value='todo'>todo</option>
					<option value='in progress'>in progress</option>
					<option value='done'>done</option>
				</select>

				<Button text='save' />
				<Button text='remove' onClick={onRemoveTaskHandler} />
			</form>
		</div>
	)
}

export default Drawer
