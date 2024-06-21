/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon, MessageErrorInputs } from '@/components'
import clsx from 'clsx'
import React, { ChangeEventHandler } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputTextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	className?: string
	rightIcon?: string
	placeholder?: string
	onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
	value?: string
	disabled?: boolean
	iconClassName?: string
	rules?: Record<string, unknown>
	name: string
	error?: FieldError | undefined
	register?: UseFormRegister<any>
	registerType?: boolean
	containerClassname?: string
	onClick?: () => void
	diarySubmit?: boolean
	disableButton?: boolean
}

export const InputTextArea: React.FC<InputTextAreaProps> = ({
	className,
	registerType = false,
	name,
	label,
	placeholder,
	rightIcon,
	disabled,
	onChange,
	value,
	iconClassName,
	rules,
	error,
	register,
	containerClassname,

	...props
}) => {
	const registerInput = register && register(name, rules)

	return (
		<div
			className={clsx(
				'flex flex-col flex-1 pb-1',
				'relative',
				containerClassname
			)}
		>
			{label && <h4 className="font-semibold text-black mb-1">{label}</h4>}

			<textarea
				disabled={disabled}
				className={clsx(
					'w-full p-3 bg-white rounded border border-grey-10 placeholder:text-placeholder text-black outline-none',
					disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : '',
					{ 'pr-10': rightIcon },
					registerType && '!bg-orange-30 !text-orange-40',
					className
				)}
				placeholder={placeholder}
				onChange={e => onChange && onChange(e)}
				value={value}
				{...props}
				{...registerInput}
			/>
			{rightIcon && (
				<Icon
					className={clsx(
						'absolute w-6 h-6 top-[6px] right-2 text-grey-800',
						iconClassName
					)}
					pointer
					src={rightIcon}
				/>
			)}
			{error && error.message && <MessageErrorInputs text={error.message} />}
		</div>
	)
}
