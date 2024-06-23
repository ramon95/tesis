import {
	GET_USER_SHOOPING_CAR,
	ProductsResponse,
	createShoppingCard,
	createShoppingCardBody,
	getProductsShoppingCard
} from '@/api'
import { Input, RadioButtom } from '@/components'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface DetailItemProps {
	selectedSize?: string
	data: ProductsResponse | undefined
	setSelectedSize?: Dispatch<SetStateAction<string>>
}

export const DetailItem: React.FC<DetailItemProps> = ({ data }) => {
	const pathname = usePathname()
	const sizes = [
		{ name: 'S' },
		{ name: 'M' },
		{ name: 'L' },
		{ name: 'XL' },
		{ name: '2XL' }
	]
	const {
		control,
		register,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm<{ size: string; quantity: string }>({
		mode: 'onChange'
	})

	const { refetch } = useQuery({
		queryKey: [GET_USER_SHOOPING_CAR],
		queryFn: () => getProductsShoppingCard(),
		retry: false
	})

	const onSubmit = handleSubmit(async dataForm => {
		const typeProduct = pathname.split('/')[1] as string
		let body
		if (typeProduct === 'clothesAccesories') {
			body = {
				size: dataForm.size,
				quantity: Number(dataForm.quantity),
				productId: data?._id as string,
				typeProduct: pathname.split('/')[1] as string,
				total: Number(dataForm.quantity) * Number(data?.price as string)
			} as createShoppingCardBody
		} else {
			body = {
				quantity: Number(dataForm.quantity),
				productId: data?._id as string,
				typeProduct: pathname.split('/')[1] as string,
				total: Number(dataForm.quantity) * Number(data?.price as string)
			} as createShoppingCardBody
		}
		const res = await createShoppingCard(body)
		if (res.errors) {
			toast.error(res.errors[0].message, {
				position: 'top-center'
			})
		} else {
			toast.success(res.message, {
				position: 'top-center'
			})
			setValue('size', '')
			setValue('quantity', '')
			refetch()
		}
	})

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
							{pathname.includes('clothes') && (
								<div className="sm:flex sm:justify-between mb-2">
									<RadioButtom
										name="size"
										label="Tallas"
										options={sizes}
										control={control}
										error={errors.size}
										rules={{
											required: {
												value: pathname.includes('clothes'),
												message: 'Campo requerido'
											}
										}}
									/>
								</div>
							)}
							<Input
								type="number"
								name="quantity"
								placeholder="100"
								register={register}
								error={errors.quantity}
								rules={{
									required: {
										value: true,
										message: 'Campo requerido'
									}
								}}
								label="Cantidad del producto"
							/>
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
