import { ClothesAccessoriesResponse } from '@/api'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { RadioButtom } from '../inputs'

interface DetailItemProps {
	selectedSize?: string
	data: ClothesAccessoriesResponse | undefined
	setSelectedSize?: Dispatch<SetStateAction<string>>
}

export const DetailItem: React.FC<DetailItemProps> = ({ data }) => {
	const sizes = [
		{ name: 'S' },
		{ name: 'M' },
		{ name: 'L' },
		{ name: 'XL' },
		{ name: '2XL' }
	]
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<{ size: string }>({
		mode: 'onChange'
	})

	const onSubmit = handleSubmit(async dataForm => {
		console.warn('🚀 ~ onSubmit ~ dataForm:', dataForm)
	})

	return (
		<div>
			<div className="lg:max-w-lg lg:self-end">
				<div className="mt-4">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						{data?.name}
					</h1>
				</div>

				<section aria-labelledby="information-heading" className="mt-4">
					<h2 id="information-heading" className="sr-only">
						Product information
					</h2>

					<div className="flex items-center">
						<p className="text-lg text-gray-900 sm:text-xl">{data?.price}</p>
					</div>

					<div className="mt-4 space-y-6">
						<p className="text-base text-gray-500">{data?.description}</p>
					</div>

					<div className="mt-6 flex items-center">
						<CheckIcon
							className="h-5 w-5 flex-shrink-0 text-green-500"
							aria-hidden="true"
						/>
						<p className="ml-2 text-sm text-gray-500">
							In stock and ready to ship
						</p>
					</div>
				</section>
			</div>

			{/* Product image */}
			<div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
				<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
					<Image
						alt="prodcut"
						src={data?.image || ''}
						width={500}
						height={500}
						className="h-full w-full object-cover object-center"
					/>
				</div>
			</div>

			{/* Product form */}
			<div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
				<section aria-labelledby="options-heading">
					<h2 id="options-heading" className="sr-only">
						Product options
					</h2>

					<form onSubmit={onSubmit}>
						<div className="sm:flex sm:justify-between">
							<RadioButtom
								name="size"
								label="Sizes"
								options={sizes}
								control={control}
								error={errors.size}
								rules={{
									required: 'Please select a size'
								}}
							/>
						</div>
						<div className="mt-10">
							<button
								type="submit"
								className={clsx(
									'flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
								)}
							>
								Add to bag
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	)
}
