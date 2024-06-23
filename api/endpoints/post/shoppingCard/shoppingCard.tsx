import { API } from '@/api'

export interface createShoppingCardBody {
	size: string
	quantity: number
	productId: string
	typeProduct: string
	total: number
}

interface createShoppingCardResponse {
	message: string
	shoppingCardId: string
	errors?: Array<Error>
}

export const createShoppingCard = async (
	body: createShoppingCardBody
): Promise<createShoppingCardResponse> => {
	let response: createShoppingCardResponse | undefined
	await API()
		.post(`/api/shoppingCard`, body)
		.then(res => {
			response = res.data as createShoppingCardResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as createShoppingCardResponse
}
