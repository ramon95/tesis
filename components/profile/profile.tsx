'use client'

import {
	GET_USER_PROFILE,
	editPassword,
	editProfile,
	getUserProfile
} from '@/api'
import { Input, SkeletonItemCard } from '@/components'
import { regexPassword } from '@/utilsFront'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface FormProfileUser {
	name: string
	lastName: string
	email: string
}

interface FormPasswordUser {
	oldPassword: string
	newPassword: string
	repetPassword: string
}

export const Profile = () => {
	const { data, isLoading, refetch } = useQuery({
		queryKey: [GET_USER_PROFILE],
		queryFn: () => getUserProfile(),
		retry: false
	})

	const {
		register: registerProfile,
		setValue: setValueProfile,
		handleSubmit: handleSubmitProfile,
		formState: { errors: errorsProfile }
	} = useForm<FormProfileUser>({ mode: 'onChange' })

	const {
		watch: watchPassword,
		setValue: setValuePassword,
		register: registerPassword,
		handleSubmit: handleSubmitPassword,
		formState: { errors: errorsPassword }
	} = useForm<FormPasswordUser>({ mode: 'onChange' })

	const rulesProfile = {
		name: {
			required: { value: true, message: 'Campo requerido' }
		},
		lastName: {
			required: { value: true, message: 'Campo requerido' }
		},
		email: {
			required: { value: true, message: 'Campo requerido' },
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Invalid email address'
			}
		}
	}

	const rulesPassword = {
		oldPassword: {
			required: { value: true, message: 'Campo requerido' }
		},
		newPassword: {
			required: { value: true, message: 'Campo requerido' },
			pattern: {
				value: regexPassword,
				message:
					'La contraseña debe de incluir una combinacion de letras mayusculas y minusculas, numeros y simbolos'
			}
		},
		repetPassword: {
			required: { value: true, message: 'Campo requerido' },
			validate: (value: string) =>
				value === watchPassword('newPassword') || 'Las contraseñas no coinciden'
		}
	}

	const handleSubmitFormProfile = async (dataForm: FormProfileUser) => {
		const res = await editProfile(dataForm)
		if (res.errors) {
			toast.error(res.errors[0].message, {
				position: 'top-center'
			})
		} else {
			toast.success(res.message, {
				position: 'top-center'
			})
			refetch()
		}
	}

	const handleSubmitFormPassword = async (dataForm: FormPasswordUser) => {
		const res = await editPassword(dataForm)
		if (res.errors) {
			toast.error(res.errors[0].message, {
				position: 'top-center'
			})
		} else {
			toast.success(res.message, {
				position: 'top-center'
			})
			setValuePassword('oldPassword', '')
			setValuePassword('newPassword', '')
			setValuePassword('repetPassword', '')
		}
	}

	useEffect(() => {
		setValueProfile('name', data?.name as string)
		setValueProfile('lastName', data?.lastName as string)
		setValueProfile('email', data?.email as string)
	}, [data])

	return isLoading ? (
		<SkeletonItemCard />
	) : (
		<div>
			<h2 className="text-base font-semibold leading-7 text-gray-900 mb-2 border-b border-gray-300">
				Mi perfil
			</h2>

			<h2 className="text-base font-semibold leading-7 text-gray-900 pb-2">
				Informacion Personal
			</h2>

			<form onSubmit={handleSubmitProfile(handleSubmitFormProfile)}>
				<Input
					name="name"
					label="Nombre"
					placeholder="Pedro"
					rules={rulesProfile.name}
					error={errorsProfile.name}
					register={registerProfile}
				/>

				<Input
					name="lastName"
					label="Apellido"
					placeholder="Perez"
					register={registerProfile}
					rules={rulesProfile.lastName}
					error={errorsProfile.lastName}
				/>

				<Input
					type="email"
					name="email"
					label="Correo"
					register={registerProfile}
					rules={rulesProfile.email}
					error={errorsProfile.email}
					placeholder="correo@mail.com"
				/>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Actualizar
					</button>
				</div>
			</form>

			<h2 className="text-base font-semibold leading-7 text-gray-900 pb-2">
				Cambio de contraseña
			</h2>

			<form onSubmit={handleSubmitPassword(handleSubmitFormPassword)}>
				<Input
					url
					name="oldPassword"
					label="Contraseña anterior"
					register={registerPassword}
					rules={rulesPassword.oldPassword}
					error={errorsPassword.oldPassword}
				/>

				<Input
					url
					name="newPassword"
					label="Contraseña Nueva"
					register={registerPassword}
					rules={rulesPassword.newPassword}
					error={errorsPassword.newPassword}
				/>

				<Input
					url
					name="repetPassword"
					register={registerPassword}
					rules={rulesPassword.repetPassword}
					label="Repite la contraseña nueva"
					error={errorsPassword.repetPassword}
				/>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Actualizar
					</button>
				</div>
			</form>
		</div>
	)
}
