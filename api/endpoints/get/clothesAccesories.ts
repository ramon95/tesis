import { API } from '@/api'

interface ClothesAccessoriesResponse {
	createdAt: string
	name: string
	avatar: string
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
		.then(res => {
			response = res.data as ClothesAccessoriesResponse[]
		})
		.catch(error => {
			response = error.response.data
		})
	return response as ClothesAccessoriesResponse[]
}
