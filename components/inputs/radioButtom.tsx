import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { Control, Controller, FieldError } from 'react-hook-form'
import { MessageErrorInputs } from '../messageErrorInput'

interface RadioButtomProps {
	name: string
	label?: string
	options: { name: string }[]
	control?: Control<any, any>
	error?: FieldError | undefined
	rules?: Record<string, unknown>
}

export const RadioButtom: React.FC<RadioButtomProps> = ({
	name,
	error,
	label,
	rules,
	options,
	control
}) => {
	return (
		<div>
			<Controller
				name={name}
				control={control}
				rules={{
					...rules
				}}
				render={({ field }) => (
					<RadioGroup value={field.value} onChange={field.onChange}>
						<RadioGroup.Label className="block text-sm font-medium text-gray-700">
							{label}
						</RadioGroup.Label>
						<div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-5">
							{options.map((option, key) => (
								<RadioGroup.Option
									as="div"
									key={key}
									value={option}
									className={({ active }) =>
										clsx(
											active ? 'ring-2 ring-indigo-500' : '',
											'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
										)
									}
								>
									{({ active, checked }) => (
										<>
											<RadioGroup.Label
												as="p"
												className="text-base font-medium text-gray-900"
											>
												{option.name}
											</RadioGroup.Label>
											<div
												className={clsx(
													active ? 'border' : 'border-2',
													checked ? 'border-indigo-500' : 'border-transparent',
													'pointer-events-none absolute -inset-px rounded-lg'
												)}
												aria-hidden="true"
											/>
										</>
									)}
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>
				)}
			/>
			{error && error.message && <MessageErrorInputs text={error.message} />}
		</div>
	)
}
