import {
	FETCH_FAILURE,
	FETCH_SUCCESS,
	FETCH_REQUEST,
	FetchDispatchTypes,
	fetchErrorResponse,
	PostProjectsType,
	GetProjectsType,
	REFETCH_DATA,
} from '../types/tasks'
import axios, { AxiosError } from 'axios'
import { ThunkAction } from 'redux-thunk'
import { RootStore } from '../store'

export const fetchTasks = (): ThunkAction<
	void,
	RootStore,
	unknown,
	FetchDispatchTypes
> => {
	return async dispatch => {
		try {
			dispatch({ type: FETCH_REQUEST })

			const response: { data: GetProjectsType[] } = await axios.get(
				'http://localhost:5000/projects'
			)

			const data = await response.data

			dispatch({ type: FETCH_SUCCESS, payload: data })
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const fetchError = error as AxiosError<fetchErrorResponse>
				if (fetchError && fetchError.response) {
					dispatch({ type: FETCH_FAILURE, payload: error.response!.data })
				}
			}
		}
	}
}

export const refetchData = () => {
	return {
		type: REFETCH_DATA,
	}
}
