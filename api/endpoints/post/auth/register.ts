import { API } from '@/api'

export interface FormViewUser {
	name: string
	lastname: string
	email: string
	password: string
	rol: string
}

interface RegisterResponse {
	message: string
	userId: string
	email: string
	errors?: Array<Error>
}

export const registerUser = async (
	body: FormViewUser
): Promise<RegisterResponse> => {
	let response: RegisterResponse | undefined
	await API()
		.post(`api/auth/registration`, body)
		.then(res => {
			response = res.data as RegisterResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as RegisterResponse
}
