import { API } from '@/api'

interface ClothesAccessoriesResponse {
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
	await API()
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
): Promise<ClothesAccessoriesResponse[]> => {
	let response: ClothesAccessoriesResponse[] | undefined
	await API()
		.get(`/clothesAccesories/${id}`)
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
