import { API } from '@/api'

export interface editItemShoppingCarBody {
	quantity: number
	productId: string
	price: number
}

interface editItemShoppingCarResponse {
	message: string
	userId: string
	email: string
	errors?: Array<Error>
}

export const editItemShoppingCar = async (
	body: editItemShoppingCarBody
): Promise<editItemShoppingCarResponse> => {
	let response: editItemShoppingCarResponse | undefined
	await API()
		.put(`/api/shoppingCar`, body)
		.then(res => {
			response = res.data as editItemShoppingCarResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as editItemShoppingCarResponse
}
