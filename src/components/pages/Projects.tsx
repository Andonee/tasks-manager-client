import React, { useEffect } from 'react'
import WithNavbar from '../hoc/WithNavbar'
import { Button, ProjectCard } from '../UI'
import styles from './Projects.module.scss'
import { RootStore } from '../../store/store'
import { useSelector } from 'react-redux'
import { fetchTasks, refetchData } from '../../store/actions/tasks'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { PostProjectsType } from '../../store/types/tasks'

const getProjects = (state: RootStore) => state.tasks.tasks
const getRefetchFlag = (state: RootStore) => state.tasks.refetch
const getUserName = (state: RootStore) => state.auth.user

const Projects = () => {
	const projects = useSelector(getProjects)
	const isRefetch = useSelector(getRefetchFlag)
	const user = useSelector(getUserName)

	const dispatch = useDispatch()

	useEffect(() => {
		console.log(isRefetch)
		if (!isRefetch) return

		dispatch(fetchTasks())
	}, [isRefetch, dispatch])

	const onTaskSelectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as Element
		console.log(target.id)
		console.log(process.env.REACT_APP_BASE_URL)
	}

	const onCreateProjectHandler = async () => {
		const newObject: PostProjectsType = {
			projectID: nanoid(7),
			title: 'New Project',
			description: '',
			edited: '',
			tasks: [],
		}
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/projects`,
				newObject
			)

			const data = await response
			console.log(data)
			dispatch(refetchData())
		} catch (error) {
			console.log('some error occured while creating project', error)
		}
	}

	return (
		<div className={styles.projects}>
			<div>
				<Button
					text='Create a project'
					width='50%'
					onClick={onCreateProjectHandler}
				/>
			</div>
			<div>
				{projects?.map(project => (
					<ProjectCard
						name={project.title}
						url={`/projects/${user}/${project.id}`}
					/>
				))}
			</div>
		</div>
	)
}

export default WithNavbar(Projects)
