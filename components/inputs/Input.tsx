/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon, MessageErrorInputs } from '@/components'
import clsx from 'clsx'
import React, { ChangeEventHandler } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	className?: string
	rightIcon?: string
	placeholder?: string
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined
	value?: string
	classNameContainer?: string
	disabled?: boolean
	rules?: Record<string, unknown>
	name: string
	error?: FieldError | undefined
	register?: UseFormRegister<any>
	url?: boolean
}

export const Input: React.FC<InputProps> = ({
	className,
	type,
	name,
	label,
	url = false,
	placeholder,
	rightIcon,
	disabled,
	onChange,
	value,
	classNameContainer,
	rules,
	error,
	register,
	...props
}) => {
	let rulesInput = rules
	if (type === 'email')
		rulesInput = {
			...rules,
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Formato de correo inválido'
			}
		}

	const registerInput = register && register(name, rulesInput)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let regex
		if (type === 'text') {
			regex = /^[a-zA-ZñÑ ]*$/
		} else if (type === 'number') {
			regex = /^[0-9.,]*$/
		} else if (type === 'email') {
			regex = /^[a-zA-Z0-9@.ñÑ ]*$/
		} else if (url) {
			regex = /^[\s\S]*$/
		} else {
			regex = /^[a-zA-Z0-9ñÑ\-# ]*$/
		}

		const inputValue = e.target.value

		if (!regex.test(inputValue)) {
			e.target.value = ''
		} else {
			registerInput?.onChange(e)
			if (onChange) onChange(e)
		}
	}

	return (
		<div
			className={clsx(
				'flex flex-col flex-1 pb-1',
				'relative',
				classNameContainer
			)}
		>
			{label && <h4 className="font-semibold text-black mb-1">{label}</h4>}

			<input
				type={type}
				disabled={disabled}
				className={clsx(
					'w-full p-3 rounded border border-grey-10 placeholder:text-placeholder text-black outline-none',
					disabled ? 'bg-orange-30 text-primary cursor-not-allowed' : '',
					{ 'pr-10': rightIcon },
					className
				)}
				placeholder={placeholder}
				value={value}
				{...registerInput}
				onChange={e => handleInputChange(e)}
				{...props}
			/>
			{rightIcon && (
				<Icon src={rightIcon as string} className="text-gray-11 w-6 h-6" />
			)}
			{error && error.message && <MessageErrorInputs text={error.message} />}
		</div>
	)
}
