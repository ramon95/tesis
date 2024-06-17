/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon, MessageErrorInputs } from '@/components'
import { Icons } from '@/media'
import clsx from 'clsx'
import Image from 'next/image'
import React, { ChangeEventHandler, useState } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputPasswordProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	placeholder?: string
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	value?: string
	label?: string
	rules?: Record<string, unknown>
	name: string
	error?: FieldError | undefined
	register?: UseFormRegister<any>
}

export const InputPassword: React.FC<InputPasswordProps> = ({
	className,
	placeholder,
	onChange,
	value,
	label,
	rules,
	name,
	error,
	register,
	...props
}) => {
	const [password, setPassword] = useState(true)
	const registerInput = register && register(name, rules)
	return (
		<div className="relative">
			{label && <h4 className="font-semibold text-grey-600 mb-1">{label}</h4>}
			<input
				className={clsx(
					'w-full p-3 bg-white rounded border border-grey-10 placeholder:text-placeholder text-grey-800 outline-none',
					className
				)}
				placeholder={placeholder}
				type={password ? 'password' : 'text'}
				onChange={e => onChange && onChange(e)}
				value={value}
				{...props}
				{...registerInput}
			/>
			<button
				aria-label="button"
				type="button"
				onClick={() => setPassword(!password)}
			>
				<Icon
					className="text-gray-11 w-6 h-6"
					src={Icons.visibilityOff}
					// src="/assets/icons/visibilityOn.svg"
				/>
				<Image src="/next.svg" alt="visibilityOff" width={24} height={24} />
				{error && error.message && <MessageErrorInputs text={error.message} />}
			</button>
		</div>
	)
}
