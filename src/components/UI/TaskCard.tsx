import React from 'react'
import styles from './TaskCard.module.scss'

type taskCardTypes = {
	task: string
	id: string
	priority: string
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const TaskCard = ({ task, id, priority, onClick }: taskCardTypes) => {
	let cardColor

	if (priority === 'low') {
		cardColor = '#34aeeb'
	} else if (priority === 'medium') {
		cardColor = '#345feb'
	} else {
		cardColor = '#8334eb'
	}
	return (
		<div
			className={styles.taskCard}
			onClick={onClick}
			id={id}
			style={{ background: cardColor }}
		>
			{task}
		</div>
	)
}

export default TaskCard
