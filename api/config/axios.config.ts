// import { setIsExpiredToken } from '@/lib'
// import { isNil } from '@/lib/lang'
import axios, { AxiosInstance } from 'axios'
// import { getSession, signOut } from 'next-auth/react'
import { AxiosConfigutationProps } from './axios.config.type'

export const API = (props?: AxiosConfigutationProps): AxiosInstance => {
	const baseURL = props?.customUrl ?? process.env.NEXTAUTH_URL
	const API_INSTANCE = axios.create({
		baseURL
	})

	API_INSTANCE.interceptors.response.use(
		async response => {
			// const session = await getSession()
			// if (!isNil(session) && !session?.user?.is_active) {
			// 	if (typeof window !== 'undefined') {
			// 		signOut()
			// 	}
			// }
			return response
		},
		async error => {
			// const session = await getSession()
			// const userToken = session?.user?.access_token
			// if (!isNil(session) && !session?.user?.is_active) {
			// 	if (typeof window !== 'undefined') {
			// 		signOut()
			// 	}
			// }

			// // Validate if unauthorized
			// if (error?.response?.status === 401 && userToken) {
			// 	if (typeof window !== 'undefined') {
			// 		setIsExpiredToken(true)
			// 		signOut()
			// 	}
			// }
			return Promise.reject(error)
		}
	)

	API_INSTANCE.interceptors.request.use(
		async config => {
			const configuration = config
			// const session = await getSession()
			// const token = session?.user?.access_token ?? props?.customAuthorization
			if (configuration.headers) {
				if (props?.contentType) {
					configuration.headers['Content-Type'] = props?.contentType
				}
				// if (token && !props?.authorization) {
				// 	configuration.headers.Authorization =
				// 		props?.customAuthorization ?? token
				// }
			}
			configuration.headers['ngrok-skip-browser-warning'] = 1
			return configuration
		},
		error => {
			return Promise.reject(error)
		}
	)

	return API_INSTANCE
}
