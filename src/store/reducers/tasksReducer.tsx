import {
	FetchDispatchTypes,
	FETCH_FAILURE,
	FETCH_REQUEST,
	FETCH_SUCCESS,
	PostProjectsType,
	GetProjectsType,
} from '../types/tasks'
import { Reducer } from 'redux'

export type tasksStoreType = {
	tasks: GetProjectsType[]
	state: 'idle' | 'loading' | 'fetched' | 'error'
}

const initialState: tasksStoreType = {
	tasks: [],
	state: 'idle',
}

const tasksReducer: Reducer<tasksStoreType, FetchDispatchTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case FETCH_REQUEST:
			return {
				...state,
				state: 'loading',
			}
		case FETCH_SUCCESS:
			return {
				tasks: action.payload,
				state: 'fetched',
			}
		case FETCH_FAILURE:
			return {
				...state,
				state: 'error',
			}
		default:
			return state
	}
}

export default tasksReducer
