import { ProductsResponse } from '@/api'
import { RadioButtom } from '@/components'
import clsx from 'clsx'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface DetailItemProps {
	selectedSize?: string
	data: ProductsResponse | undefined
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

	useEffect(() => {
		console.warn('🚀 ~ data:', data)
	}, [data])

	return (
		<div>
			<div className="sm:flex justify-center sm:mt-5 gap-5">
				<div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
					<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
						<Image
							alt="prodcut"
							src={data?.image || ''}
							width={300}
							height={300}
							className="h-full w-full object-cover object-center"
						/>
					</div>
				</div>
				<div className="">
					<div className="mt-4 flex item-center gap-2">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							{data?.name}
						</h1>

						<p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							${data?.price}
						</p>
					</div>

					<section aria-labelledby="information-heading" className="mt-4">
						<h2 id="information-heading" className="text-gray-900">
							Descripcion
						</h2>

						<div className="mt-4 space-y-6">
							<p className="text-base text-gray-500">{data?.description}</p>
						</div>
					</section>
					<div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
						<form onSubmit={onSubmit}>
							<div className="sm:flex sm:justify-between">
								<RadioButtom
									name="size"
									label="Tallas"
									options={sizes}
									control={control}
									error={errors.size}
									rules={{
										required: 'Selecciona una talla'
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
									Añadir al carrito
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
