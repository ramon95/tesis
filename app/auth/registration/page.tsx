'use client'

import { registerUser } from '@/api'
import { Input, InputPassword } from '@/components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface FormViewUser {
	name: string
	lastname: string
	email: string
	password: string
	rol: string
}

export default function Registration() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormViewUser>({ mode: 'onChange' })

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

	const handleSubmitForm = async (data: FormViewUser) => {
		const res = await registerUser(data)
		if (res.errors) {
			toast.error(res.errors[0].message, {
				position: 'top-center'
			})
		} else {
			toast.success(res.message, {
				position: 'top-center'
			})
			router.push('/auth/singin')
		}
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
