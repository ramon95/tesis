import { API } from '@/api'

interface deleteShoppingCarByIdResponse {
	message: string
	shoppingCardId: string
	errors?: Array<Error>
}

export const deleteShoppingCarById = async (
	productId: string
): Promise<deleteShoppingCarByIdResponse> => {
	let response: deleteShoppingCarByIdResponse | undefined
	await API()
		.delete(`/api/shoppingCarDetail?productId=${productId}`)
		.then(res => {
			response = res.data as deleteShoppingCarByIdResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as deleteShoppingCarByIdResponse
}
