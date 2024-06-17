'use client'

import { Input } from '@/components'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

interface FormViewUser {
	name: string
	lastname: string
	email: string
	password: string
	rol: string
}

export default function Registration() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormViewUser>()

	const rules = {
		name: {
			required: { value: true, message: 'Campo requerido' }
		},
		lastname: {
			required: { value: true, message: 'Campo requerido' }
		},
		email: {
			required: { value: true, message: 'Campo requerido' },
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Invalid email address'
			}
		},
		password: {
			required: { value: true, message: 'Campo requerido' },
			minLength: {
				value: 8,
				message: 'La contraseña debe tener al menos 8 caracteres'
			},
			pattern: {
				value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#<>+_{}.])/,
				message:
					'La contraseña debe de incluir una combinacion de letras mayusculas y minusculas, numeros y simbolos'
			}
		}
	}

	const handleSubmitForm = (data: FormViewUser) => {
		console.warn('🚀 ~ handleSubmitForm ~ data:', data)
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Registrar
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
					<Input
						name="name"
						label="Nombre"
						register={register}
						placeholder="Pedro"
						error={errors.name}
						rules={rules.name}
					/>

					<Input
						name="lastname"
						label="Apellido"
						register={register}
						placeholder="Perez"
						error={errors.lastname}
						rules={rules.lastname}
					/>

					<Input
						type="email"
						name="email"
						label="Apellido"
						register={register}
						placeholder="Perez"
						error={errors.email}
						rules={rules.email}
					/>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Nombre
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Correo Electronico
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Contraseña
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Registrar
						</button>
					</div>
				</form>

				<span className="mt-10 text-center text-sm text-gray-500">
					Ya tienes cuenta{' '}
					<Link
						href="/auth/singin"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						inicia sesion
					</Link>
				</span>
			</div>
		</div>
	)
}
