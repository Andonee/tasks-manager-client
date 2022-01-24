import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ProjectCard.module.scss'

// TODO - change taskID type

type ProjectCardProps = {
	name: string
	url: string
	id: string
	onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ProjectCard = ({ name, url, id, onRemove }: ProjectCardProps) => {
	return (
		<NavLink className={styles.card} to={url}>
			<div>
				{name}{' '}
				<button onClick={onRemove} id={id}>
					Remove
				</button>
			</div>
		</NavLink>
	)
}

export default ProjectCard
