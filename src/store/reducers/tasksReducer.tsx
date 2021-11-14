import {
	FetchDispatchTypes,
	FETCH_FAILURE,
	FETCH_REQUEST,
	FETCH_SUCCESS,
	GetProjectsType,
	REFETCH_DATA,
} from '../types/tasks'
import { Reducer } from 'redux'

export type tasksStoreType = {
	tasks: GetProjectsType[]
	state: 'idle' | 'loading' | 'fetched' | 'error'
	refetch: boolean
}

const initialState: tasksStoreType = {
	tasks: [],
	state: 'idle',
	refetch: true,
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
				...state,
				tasks: action.payload,
				state: 'fetched',
				refetch: false,
			}
		case FETCH_FAILURE:
			return {
				...state,
				state: 'error',
				refetch: false,
			}
		case REFETCH_DATA:
			return {
				...state,
				refetch: true,
			}
		default:
			return state
	}
}

export default tasksReducer
