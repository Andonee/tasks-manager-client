import React from 'react'
import styles from './TasksList.module.scss'
import { TaskCard } from '.'
import { taskType } from '../../store/types/tasks'

type tasksListProps = {
	onTaskClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void
	tasks: taskType[]
	type: string
}

const TasksList = ({ onTaskClickHandler, tasks, type }: tasksListProps) => {
	const toRender = tasks.map((task: taskType) => {
		return (
			<TaskCard
				key={task.id}
				id={task.id}
				onClick={onTaskClickHandler}
				task={task.title}
				priority={task.priority}
			/>
		)
	})
	return (
		<div className={styles.tasksList}>
			<h3>{type}</h3>
			<div className={styles.tasksList__Box}>{toRender}</div>
		</div>
	)
}

export default TasksList
