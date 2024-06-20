import { API } from '@/api'

export interface editProfileBody {
	name?: string
	lastname?: string
	email?: string
	oldPassword?: string
	newPassword?: string
	repetPassword?: string
}

interface edirProfileResponse {
	message: string
	userId: string
	email: string
	errors?: Array<Error>
}

export const editProfile = async (
	body: editProfileBody
): Promise<edirProfileResponse> => {
	let response: edirProfileResponse | undefined
	await API()
		.put(`/api/users/updateProfile`, body)
		.then(res => {
			response = res.data as edirProfileResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as edirProfileResponse
}

export const editPassword = async (
	body: editProfileBody
): Promise<edirProfileResponse> => {
	let response: edirProfileResponse | undefined
	await API()
		.put(`/api/users/updatePassword`, body)
		.then(res => {
			response = res.data as edirProfileResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as edirProfileResponse
}
