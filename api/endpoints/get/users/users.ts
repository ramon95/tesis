import { API } from '@/api'

export interface UserProfileResponse {
	createdAt: string
	name: string
	lastName: string
	email: string
	id: string
	rol: string
}

export const getUserProfile = async (): Promise<UserProfileResponse> => {
	let response: UserProfileResponse | undefined
	await API()
		.get(`/api/users/updateProfile`)
		.then((res: { data: UserProfileResponse }) => {
			response = res.data as UserProfileResponse
		})
		.catch((error: { response: { data: UserProfileResponse | undefined } }) => {
			response = error.response.data
		})
	return response as UserProfileResponse
}
