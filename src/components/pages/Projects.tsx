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
const getToken = (state: RootStore) => state.auth.auth

const Projects = () => {
	const projects = useSelector(getProjects)
	const isRefetch = useSelector(getRefetchFlag)
	const user = useSelector(getUserName)
	const token = useSelector(getToken)

	const dispatch = useDispatch()

	useEffect(() => {
		console.log(isRefetch)
		// if (!isRefetch) return
		if (!token) return
		dispatch(fetchTasks(user, token))
	}, [isRefetch, dispatch, token])

	const onCreateProjectHandler = async () => {
		const newObject: PostProjectsType = {
			projectID: nanoid(7),
			title: 'New Project',
			description: '',
			edited: '',
			tasks: [],
			belongsTo: user,
		}
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/projects`,
				newObject,
				{
					headers: {
						authorization: token,
					},
				}
			)

			const data = await response
			console.log(data)
			dispatch(refetchData())
		} catch (error) {
			console.log('some error occured while creating project', error)
		}
	}

	const onRemoveProjectHandler = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		try {
			e.preventDefault()
			e.stopPropagation()
			const target = e.target as Element

			const id = target.id

			const response = await axios.delete(
				`${process.env.REACT_APP_BASE_URL}/projects/${user}/${id}`,
				{
					headers: {
						authorization: token,
					},
				}
			)

			const data = await response
			dispatch(refetchData())

			console.log('Great success!', data)
		} catch (error) {
			console.log('Somme terrible error occured')
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
						url={`/projects/${user}/${project.projectID}`}
						id={project.projectID}
						onRemove={onRemoveProjectHandler}
						key={project.projectID}
					/>
				))}
			</div>
		</div>
	)
}

export default WithNavbar(Projects)
