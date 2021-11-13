import React from 'react'
import styles from './ProjectCard.module.scss'

// TODO - change taskID type

type ProjectCardProps = {
	name: string
	taskID: number | any
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ProjectCard = ({ name, taskID, onClick }: ProjectCardProps) => {
	return (
		<button className={styles.card} id={taskID} onClick={onClick}>
			{name}
		</button>
	)
}

export default ProjectCard
