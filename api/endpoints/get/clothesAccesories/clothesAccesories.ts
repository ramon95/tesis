import { API } from '@/api'

export interface ClothesAccessoriesResponse {
	createdAt: string
	name: string
	image: string
	price: string
	description: string
	id: string
}

export const getClothesAccesories = async (): Promise<
	ClothesAccessoriesResponse[]
> => {
	let response: ClothesAccessoriesResponse[] | undefined
	await API({
		customUrl: 'https://6612b5e853b0d5d80f6637b8.mockapi.io/api/v1/'
	})
		.get(`/clothesAccesories`)
		.then((res: { data: ClothesAccessoriesResponse[] }) => {
			response = res.data as ClothesAccessoriesResponse[]
		})
		.catch(
			(error: {
				response: { data: ClothesAccessoriesResponse[] | undefined }
			}) => {
				response = error.response.data
			}
		)
	return response as ClothesAccessoriesResponse[]
}

export const getClothesAccesoriesById = async (
	id: string
): Promise<ClothesAccessoriesResponse> => {
	let response: ClothesAccessoriesResponse | undefined
	await API()
		.get(`/clothesAccesories/${id}`)
		.then((res: { data: ClothesAccessoriesResponse }) => {
			response = res.data as ClothesAccessoriesResponse
		})
		.catch(
			(error: {
				response: { data: ClothesAccessoriesResponse | undefined }
			}) => {
				response = error.response.data
			}
		)
	return response as ClothesAccessoriesResponse
}
