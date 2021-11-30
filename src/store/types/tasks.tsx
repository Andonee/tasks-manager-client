export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const REFETCH_DATA = 'REFETCH_DATA'

export interface PostProjectsType {
	projectID: string
	title: string
	description: string
	edited: string
	tasks: taskType[]
}

export type taskType = {
	id: string
	title: string
	description: string
	created: string
	priority: 'low' | 'medium' | 'high'
	type: 'todo' | 'in progress' | 'done'
}

export interface GetProjectsType extends PostProjectsType {
	id: number
}

export type fetchErrorResponse = {
	error: {
		response: {
			data: string
		}
	}
}

export type fetchRequest = {
	type: typeof FETCH_REQUEST
}

export type fetchSuccess = {
	type: typeof FETCH_SUCCESS
	payload: GetProjectsType[]
}

export type fetchFailure = {
	type: typeof FETCH_FAILURE
	payload: fetchErrorResponse
}

export type refetchData = {
	type: typeof REFETCH_DATA
}

export type fetchActionType = {
	type: string
	payload: fetchRequest | fetchSuccess | fetchFailure
}

export type FetchDispatchTypes =
	| fetchRequest
	| fetchSuccess
	| fetchFailure
	| refetchData
