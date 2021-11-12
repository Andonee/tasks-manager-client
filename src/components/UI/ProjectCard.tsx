import React from 'react'
import styles from './ProjectCard.module.scss'

type ProjectCardProps = {
	name: string
}

const ProjectCard = ({ name }: ProjectCardProps) => {
	return <div className={styles.card}>{name}</div>
}

export default ProjectCard
