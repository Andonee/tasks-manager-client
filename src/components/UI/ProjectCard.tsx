import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ProjectCard.module.scss'

// TODO - change taskID type

type ProjectCardProps = {
	name: string
	url: string
}

const ProjectCard = ({ name, url }: ProjectCardProps) => {
	return (
		<NavLink className={styles.card} to={url}>
			{name}
		</NavLink>
	)
}

export default ProjectCard
