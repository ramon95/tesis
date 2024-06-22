import { API } from '@/api'

export interface ProductsResponse {
	createdAt: string
	updatedAt: string
	name: string
	image: string
	price: string
	description: string
	_id: string
}

export const getProducts = async (
	typeProduct: string
): Promise<ProductsResponse[]> => {
	let response: ProductsResponse[] | undefined
	await API()
		.get(`/api/products?typeProduct=${typeProduct}`)
		.then(res => {
			response = res.data.products as ProductsResponse[]
		})
		.catch((error: { response: { data: ProductsResponse[] | undefined } }) => {
			response = error.response.data
		})
	return response as ProductsResponse[]
}

export const getProductById = async (id: string): Promise<ProductsResponse> => {
	let response: ProductsResponse | undefined
	await API()
		.get(`/api/product?id=${id}`)
		.then(res => {
			response = res.data.product as ProductsResponse
		})
		.catch((error: { response: { data: ProductsResponse | undefined } }) => {
			response = error.response.data
		})
	return response as ProductsResponse
}
