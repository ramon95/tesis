'use client'

// import { useIsMobileDevice } from '@/hooks'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProviderProps {
	readonly children: React.ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
	// const { isMobileDevice } = useIsMobileDevice()
	const contextClass = {
		success: '!bg-green-500',
		error: '!bg-red-500',
		info: 'bg-gray-600',
		warning: 'bg-orange-400',
		default: 'bg-blue-600',
		dark: 'bg-white-600 font-gray-300'
	}

	return (
		<>
			{children}
			<ToastContainer
				toastClassName={context =>
					`${
						contextClass[context?.type ?? 'default']
					} relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer`
				}
				bodyClassName="text-sm text-center fon"
				position="top-center"
				autoClose={3000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				transition={Slide}
				icon={false}
			/>
		</>
	)
}
