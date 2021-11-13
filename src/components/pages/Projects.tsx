import React, { useState, useEffect, ReactEventHandler } from 'react'
import WithNavbar from '../hoc/WithNavbar'
import { Button, ProjectCard } from '../UI'
import styles from './Projects.module.scss'
import { RootStore } from '../../store/store'
import { useSelector } from 'react-redux'

const getProjects = (state: RootStore) => state.tasks.tasks

const Projects = () => {
	const projects = useSelector(getProjects)

	console.log('projects', projects)

	const onTaskSelectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as Element
		console.log(target.id)
	}

	return (
		<div className={styles.projects}>
			<div>
				<Button text='Create a project' width='50%' />
			</div>
			<div>
				{projects?.map(project => (
					<ProjectCard
						name={project.title}
						taskID={project.id}
						onClick={onTaskSelectHandler}
					/>
				))}
			</div>
		</div>
	)
}

export default WithNavbar(Projects)
