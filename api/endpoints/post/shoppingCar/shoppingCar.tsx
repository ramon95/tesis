import { API } from '@/api'

export interface createShoppingCarBody {
	size?: string
	quantity: number
	productId: string
	typeProduct: string
	total: number
}

interface createShoppingCarResponse {
	message: string
	shoppingCardId: string
	errors?: Array<Error>
}

export const createShoppingCar = async (
	body: createShoppingCarBody
): Promise<createShoppingCarResponse> => {
	let response: createShoppingCarResponse | undefined
	await API()
		.post(`/api/shoppingCar`, body)
		.then(res => {
			response = res.data as createShoppingCarResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as createShoppingCarResponse
}
