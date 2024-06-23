import { API } from '@/api'

export interface ProductsShoppingCardResponse {
	createdAt: string
	updatedAt: string
	total: string
	quantity: string
	productId: string
	typeProduct: string
	zise: string
	userId: string
	_id: string
}

export const getProductsShoppingCard = async (): Promise<
	ProductsShoppingCardResponse[]
> => {
	let response: ProductsShoppingCardResponse[] | undefined
	await API()
		.get(`/api/shoppingCard`)
		.then(res => {
			response = res.data.products as ProductsShoppingCardResponse[]
		})
		.catch(
			(error: {
				response: { data: ProductsShoppingCardResponse[] | undefined }
			}) => {
				response = error.response.data
			}
		)
	return response as ProductsShoppingCardResponse[]
}
