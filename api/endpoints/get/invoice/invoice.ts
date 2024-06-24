import { API } from '@/api'

export interface getInvoicesResponse {
	_id: string
	tax: number
	total: number
	subTotal: number
	shipping: number
	createdAt: string
	updatedAt: string
	products: {
		_id: string
		quatity: number
		size: string
		name: string
		image: string
		price: string
		description: string
	}[]
}

export const getInvoices = async (): Promise<getInvoicesResponse[]> => {
	let response: getInvoicesResponse[] | undefined
	await API()
		.get(`/api/invoice`)
		.then(res => {
			response = res.data.products as getInvoicesResponse[]
		})
		.catch(
			(error: { response: { data: getInvoicesResponse[] | undefined } }) => {
				response = error.response.data
			}
		)
	return response as getInvoicesResponse[]
}
