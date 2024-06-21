import { API } from '@/api'

export interface createNewProductBody {
	name: string
	description: string
	image: string
	price: string
	typeProduct: string
}

interface createNewProductResponse {
	message: string
	productId: string
	name: string
	errors?: Array<Error>
}

export const createNewProduct = async (
	body: createNewProductBody
): Promise<createNewProductResponse> => {
	let response: createNewProductResponse | undefined
	await API()
		.post(`/api/products`, body)
		.then(res => {
			response = res.data as createNewProductResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as createNewProductResponse
}
