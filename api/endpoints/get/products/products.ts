import { API } from '@/api'

export interface ProductsResponse {
	createdAt: string
	updatedAt: string
	name: string
	image: string
	price: string
	description: string
	id: string
}

export const getProducts = async (
	typeProduct: string
): Promise<ProductsResponse[]> => {
	let response: ProductsResponse[] | undefined
	await API()
		.get(`/api/products?typeProduct=${typeProduct}`)
		.then((res: { data: ProductsResponse[] }) => {
			response = res.data as ProductsResponse[]
		})
		.catch((error: { response: { data: ProductsResponse[] | undefined } }) => {
			response = error.response.data
		})
	return response as ProductsResponse[]
}

// export const getClothesAccesoriesById = async (
// 	id: string
// ): Promise<ClothesAccessoriesResponse> => {
// 	let response: ClothesAccessoriesResponse | undefined
// 	await API()
// 		.get(`/clothesAccesories/${id}`)
// 		.then((res: { data: ClothesAccessoriesResponse }) => {
// 			response = res.data as ClothesAccessoriesResponse
// 		})
// 		.catch(
// 			(error: {
// 				response: { data: ClothesAccessoriesResponse | undefined }
// 			}) => {
// 				response = error.response.data
// 			}
// 		)
// 	return response as ClothesAccessoriesResponse
// }
