import { API } from '@/api'

export interface ProductsShoppingCarResponse {
	createdAt: string
	updatedAt: string
	total: string
	quantity: string
	productId: string
	typeProduct: string
	size: string
	userId: string
	_id: string
}

export interface getProductsShoppingCarDetailResponse {
	createdAt: string
	updatedAt: string
	total: string
	quantity: string
	size: string
	userId: string
	_id: string
	product: {
		_id: string
		name: string
		image: string
		price: string
	}
}

export const getProductsShoppingCar = async (): Promise<
	ProductsShoppingCarResponse[]
> => {
	let response: ProductsShoppingCarResponse[] | undefined
	await API()
		.get(`/api/shoppingCar`)
		.then(res => {
			response = res.data.products as ProductsShoppingCarResponse[]
		})
		.catch(
			(error: {
				response: { data: ProductsShoppingCarResponse[] | undefined }
			}) => {
				response = error.response.data
			}
		)
	return response as ProductsShoppingCarResponse[]
}

export const getProductsShoppingCarDetail = async (): Promise<
	getProductsShoppingCarDetailResponse[]
> => {
	let response: getProductsShoppingCarDetailResponse[] | undefined
	await API()
		.get(`/api/shoppingCarDetail`)
		.then(res => {
			response = res.data.products as getProductsShoppingCarDetailResponse[]
		})
		.catch(
			(error: {
				response: { data: getProductsShoppingCarDetailResponse[] | undefined }
			}) => {
				response = error.response.data
			}
		)
	return response as getProductsShoppingCarDetailResponse[]
}
