import { API } from '@/api'

export interface registerUserBody {
	name: string
	lastName: string
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
	body: registerUserBody
): Promise<RegisterResponse> => {
	let response: RegisterResponse | undefined
	await API()
		.post(`/api/auth/registration`, body)
		.then(res => {
			response = res.data as RegisterResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as RegisterResponse
}
