/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import { Icon, MessageErrorInputs } from 'components'
import React, { ChangeEventHandler } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputSelectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string
	className?: string
	name: string
	rightIcon?: string
	placeholder?: string
	onChange?: ChangeEventHandler<HTMLSelectElement> | undefined
	onChangeOption?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	options: { label: string; key: string | number }[]
	value?: string
	disabled?: boolean
	iconClassName?: string
	rules?: Record<string, unknown>
	error?: FieldError | undefined
	register?: UseFormRegister<any>
	isMulti?: boolean
}

export const InputSelect: React.FC<InputSelectProps> = ({
	className,
	label,
	name,
	placeholder,
	rightIcon,
	options,
	disabled,
	onChange,
	onChangeOption,
	value,
	iconClassName,
	rules,
	error,
	register,
	isMulti = false,
	...props
}) => {
	const registerInput = register && register(name, rules)

	return (
		<div className={clsx('flex flex-col flex-1 pb-1', 'relative')}>
			{label && <h4 className="font-semibold text-black mb-1">{label}</h4>}
			<select
				multiple={isMulti}
				disabled={disabled}
				{...registerInput}
				id={name}
				className={clsx(
					'w-full p-3 bg-white rounded border border-grey-10 placeholder:text-placeholder text-black outline-none',
					disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : '',
					{ 'pr-10': rightIcon },
					className
				)}
				onChange={e => {
					return onChange
						? onChange(e as React.ChangeEvent<HTMLSelectElement>)
						: onChangeOption && onChangeOption(e)
				}}
				value={value}
				{...props}
			>
				<option value="">{placeholder ?? 'Selecciona una opción'}</option>
				{options?.map((item, index) => (
					<option value={item.key} key={index}>
						{item.label}
					</option>
				))}
			</select>

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
