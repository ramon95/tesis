'use client'

import { Input, InputPassword, Loading } from '@/components'
import clsx from 'clsx'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormSingInUser {
	email: string
	password: string
}

export default function Singin() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<FormSingInUser>({ mode: 'onChange' })

	const rules = {
		email: {
			required: { value: true, message: 'Campo requerido' },
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Invalid email address'
			}
		},
		password: {
			required: { value: true, message: 'Campo requerido' }
		}
	}

	const handleSubmitForm = async (data: FormSingInUser) => {
		setLoading(true)
		const response = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password
		})
		console.warn('🚀 ~ handleSubmitForm ~ response:', response)
		if (response?.error) {
			setError('email', { message: response.error })
			setLoading(false)
		} else {
			router.push('/')
		}
	}

	return loading ? (
		<Loading />
	) : (
		<div className="h-full">
			<div className="flex min-h-full flex-1">
				<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Ingresar
							</h2>
						</div>

						<div className="mt-10">
							<div>
								<form
									className="space-y-6"
									onSubmit={handleSubmit(handleSubmitForm)}
								>
									<Input
										type="email"
										name="email"
										label="Correo"
										register={register}
										rules={rules.email}
										error={errors.email}
										placeholder="correo@mail.com"
									/>

									<InputPassword
										name="password"
										label="Contraseña"
										register={register}
										rules={rules.password}
										error={errors.password}
									/>

									<div className="flex flex-col items-center justify-between">
										{/* <div className="text-sm leading-6">
											<Link
												href="/auth/forgotPassword"
												className="font-semibold text-indigo-600 hover:text-indigo-500"
											>
												¿Olvidaste tu contraseña?
											</Link>
										</div> */}
										<div className="text-sm leading-6">
											<Link
												href="/auth/registration"
												className="font-semibold text-indigo-600 hover:text-indigo-500"
											>
												¿No tienes cuenta? Registrate
											</Link>
										</div>
									</div>

									<div>
										<button
											type="submit"
											className={clsx(
												'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
											)}
										>
											Ingresar
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="relative hidden w-0 flex-1 lg:block">
					<Image
						className="absolute inset-0 h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt="backgroud"
						width={1908}
						height={1272}
					/>
				</div>
			</div>
		</div>
	)
}
