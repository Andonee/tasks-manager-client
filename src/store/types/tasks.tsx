export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

export interface PostProjectsType {
	projectID: string
	title: string
	description: string
	edited: string
	tasks: { task: string; status: string; time?: string }[]
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

export type fetchActionType = {
	type: string
	payload: fetchRequest | fetchSuccess | fetchFailure
}

export type FetchDispatchTypes = fetchRequest | fetchSuccess | fetchFailure
