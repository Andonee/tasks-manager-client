import React from 'react'
import WithNavbar from '../hoc/WithNavbar'
import { Button, ProjectCard } from '../UI'
import styles from './Projects.module.scss'

const Projects = () => {
	return (
		<div className={styles.projects}>
			<div>
				<Button text='Create a project' width='50%' />
			</div>
			<div>
				<ProjectCard name='Some Project' />
				<ProjectCard name='Some Project' />
				<ProjectCard name='Some Project' />
				<ProjectCard name='Some Project' />
			</div>
		</div>
	)
}

export default WithNavbar(Projects)
