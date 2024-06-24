import { API } from '@/api'

export interface createInvoiceBody {
	total: number
	subTotal: number
	tax: number
	shipping: number
	products: {
		id: string
		quatity: number
		size: string | null
	}[]
}

interface createInvoiceBodyResponse {
	message: string
	productId: string
	name: string
	errors?: Array<Error>
}

export const createInvoice = async (
	body: createInvoiceBody
): Promise<createInvoiceBodyResponse> => {
	let response: createInvoiceBodyResponse | undefined
	await API()
		.post(`/api/invoice`, body)
		.then(res => {
			response = res.data as createInvoiceBodyResponse
		})
		.catch(error => {
			response = error.response.data
		})
	return response as createInvoiceBodyResponse
}
