import React, { useEffect, useReducer } from 'react'
import WithNavbar from '../hoc/WithNavbar'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import axios from 'axios'
import styles from './Project.module.scss'
import { Input, Textarea, TasksList, Drawer, Button } from '../UI'
import { taskType } from '../../store/types/tasks'
import { nanoid } from 'nanoid'
import { getCurrentDate } from '../../utils'
import { refetchData } from '../../store/actions/tasks'

interface ProjectProps extends RouteComponentProps<any> {}

const initialState = {
	title: 'Awesome project',
	description: 'Some interesting desciption',
	newTask: '',
	tasks: [] as taskType[],
	selectedTask: {} as taskType,
}

type actionsType =
	| { type: 'set_title'; payload: string }
	| { type: 'set_description'; payload: string }
	| { type: 'set_selected_task'; payload: taskType }
	| { type: 'set_new_task'; payload: string }
	| { type: 'add_task'; payload: taskType }
	| { type: 'updated_task'; payload: taskType[] }

const tasksReducer = (state: typeof initialState, action: actionsType) => {
	switch (action.type) {
		case 'set_title':
			return {
				...state,
				title: action.payload,
			}
		case 'set_description':
			return {
				...state,
				description: action.payload,
			}
		case 'set_selected_task':
			return {
				...state,
				selectedTask: action.payload,
			}
		case 'set_new_task':
			return {
				...state,
				newTask: action.payload,
			}
		case 'add_task':
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			}

		case 'updated_task':
			return {
				...state,
				tasks: [...action.payload],
			}

		default:
			return state
	}
}

const Project: React.SFC<ProjectProps> = ({ history, match }) => {
	const [state, dispatch] = useReducer(tasksReducer, initialState)
	useEffect(() => {
		const { user, projectId } = match.params

		const fetchData = async () => {
			try {
				const response = await axios(
					`${process.env.REACT_APP_BASE_URL}/projects/${projectId}`
				)

				const data = await response

				const { title, description, tasks } = data.data

				dispatch({
					type: 'set_title',
					payload: title,
				})
				dispatch({
					type: 'set_description',
					payload: description,
				})
				dispatch({
					type: 'updated_task',
					payload: tasks,
				})
				console.log('Data', data)
			} catch (error) {
				console.log('Some error occured')
			}
		}
		fetchData()
	}, [])

	const onTaskClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as Element

		const selectedTask = state.tasks.find(task => task.id === target.id)

		console.log('selectedTask', selectedTask)

		dispatch({
			type: 'set_selected_task',
			payload: selectedTask as taskType,
		})
	}

	const onDrawerCloseHandler = () => {
		dispatch({ type: 'set_selected_task', payload: {} as taskType })
	}

	const onAddTaskHandler = () => {
		const newTask: taskType = {
			id: nanoid(8),
			title: state.newTask,
			description: '',
			created: getCurrentDate(),
			priority: 'low',
			type: 'todo',
		}

		if (!state.newTask.length) return

		console.log(newTask)
		dispatch({ type: 'add_task', payload: newTask })
		dispatch({ type: 'set_new_task', payload: '' })
	}

	const onEditTaskHander = (task: taskType) => {
		console.log(task)
		const idx = state.tasks.findIndex(el => el.id === task.id)

		const tasks = [...state.tasks]

		let taskToUpdate = tasks[idx]

		taskToUpdate = task

		tasks[idx] = taskToUpdate

		dispatch({ type: 'updated_task', payload: tasks })

		dispatch({ type: 'set_selected_task', payload: {} as taskType })
	}

	const onRemoveTaskHandler = (task: taskType) => {
		const tasksList = state.tasks.filter(item => item.id !== task.id)

		dispatch({ type: 'updated_task', payload: tasksList })
	}

	const onInputChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const type = e.target.name
		const value = e.target.value

		if (type === 'title') {
			dispatch({ type: 'set_title', payload: value })
		} else if (type === 'description') {
			dispatch({ type: 'set_description', payload: value })
		} else if (type === 'New task') {
			dispatch({ type: 'set_new_task', payload: value })
		}
	}

	const onSaveProjectHandler = async () => {
		try {
			const { projectId } = match.params

			const dataToSave = {
				title: state.title,
				description: state.description,
				tasks: state.tasks,
				edited: getCurrentDate(),
			}
			const response = await axios.patch(
				`${process.env.REACT_APP_BASE_URL}/projects/${projectId}`,
				dataToSave
			)

			const data = await response

			console.log('Great success', data)
		} catch (error) {
			console.log('some error occured :(', error)
		}
	}
	return (
		<div className={styles.project}>
			<Drawer
				isOpen={state.selectedTask.id ? true : false}
				closeHandler={onDrawerCloseHandler}
				data={state.selectedTask}
				onEditTask={onEditTaskHander}
				onRemoveTask={onRemoveTaskHandler}
			/>
			<div className={styles.project__config}>
				<Input
					name='title'
					placeholder='Project name'
					value={state.title}
					onChange={onInputChange}
				/>
				<Textarea
					rows={3}
					placeholder='Project description'
					name='description'
					value={state.description}
					onChange={onInputChange}
				/>
			</div>
			<div className={styles.project__actions}>
				<div>
					<Input
						name='New task'
						placeholder='New task'
						value={state.newTask}
						onChange={onInputChange}
					/>
					<Button text='add' onClick={onAddTaskHandler} />
				</div>
				<Button text='save' onClick={onSaveProjectHandler} />
			</div>
			<div className={styles.project__cards}>
				<TasksList
					onTaskClickHandler={onTaskClickHandler}
					tasks={state.tasks.filter(task => task.type === 'todo')}
					type='todo'
				/>
				<TasksList
					onTaskClickHandler={onTaskClickHandler}
					tasks={state.tasks.filter(task => task.type === 'in progress')}
					type='in progress'
				/>
				<TasksList
					onTaskClickHandler={onTaskClickHandler}
					tasks={state.tasks.filter(task => task.type === 'done')}
					type='done'
				/>
			</div>
		</div>
	)
}

export default withRouter(WithNavbar(Project))
