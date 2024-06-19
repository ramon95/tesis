'use client'

import { Input } from '@/components'
import { useForm } from 'react-hook-form'

interface FormProfileUser {
	name: string
	lastname: string
	email: string
}

interface FormPasswordUser {
	oldPassword: string
	newPassword: string
	repetPassword: string
}

export const Profile = () => {
	const {
		register: registerProfile,
		handleSubmit: handleSubmitProfile,
		formState: { errors: errorsProfile }
	} = useForm<FormProfileUser>({ mode: 'onChange' })

	const {
		register: registerPassword,
		handleSubmit: handleSubmitPassword,
		formState: { errors: errorsPassword }
	} = useForm<FormPasswordUser>({ mode: 'onChange' })

	const rulesProfile = {
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
		}
	}

	const rulesPassword = {
		oldPassword: {
			required: { value: true, message: 'Campo requerido' }
		}
	}

	const handleSubmitFormProfile = (dataForm: FormProfileUser) => {
		console.warn('🚀 ~ handleSubmitForm ~ dataForm:', dataForm)
	}

	const handleSubmitFormPassword = (dataForm: FormPasswordUser) => {
		console.warn('🚀 ~ handleSubmitForm ~ dataForm:', dataForm)
	}

	return (
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
					name="lastname"
					label="Apellido"
					placeholder="Perez"
					register={registerProfile}
					rules={rulesProfile.lastname}
					error={errorsProfile.lastname}
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
					name="oldPassword"
					label="Contraseña anterior"
					register={registerPassword}
					rules={rulesPassword.oldPassword}
					error={errorsPassword.oldPassword}
				/>

				<Input
					name="newPassword"
					label="Contraseña Nueva"
					register={registerPassword}
					rules={rulesPassword.oldPassword}
					error={errorsPassword.newPassword}
				/>

				<Input
					name="repetPassword"
					register={registerPassword}
					rules={rulesPassword.oldPassword}
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
