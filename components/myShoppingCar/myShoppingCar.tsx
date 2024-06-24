'use client'

import {
	GET_USER_SHOOPING_CAR_DETAIL,
	createInvoice,
	editItemShoppingCar,
	getProductsShoppingCarDetail
} from '@/api'
import { Input } from '@/components'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export const MyShoppingCar = () => {
	const [subTotal, setSubTotal] = useState(0)
	const tax = subTotal * 0.1
	const shipping = subTotal * 0.15
	const { data, refetch } = useQuery({
		queryKey: [GET_USER_SHOOPING_CAR_DETAIL],
		queryFn: () => getProductsShoppingCarDetail(),
		retry: false
	})

	const { register, setValue, handleSubmit, getValues } = useForm<any>({
		mode: 'onChange'
	})

	const handleUpdateQuantity = async (name: string) => {
		if (data) {
			const quantitys = getValues()
			const newQuantity = quantitys[name]
			const itemShoppingCar = data.find(item => item._id === name.split('-')[1])
			if (itemShoppingCar) {
				const body = {
					quantity: Number(newQuantity),
					productId: itemShoppingCar.product._id,
					price: Number(itemShoppingCar.product.price)
				}
				const res = await editItemShoppingCar(body)
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
		}
	}

	const onSubmit = handleSubmit(async () => {
		if (data) {
			const products: { id: string; quatity: number; size: string | null }[] =
				[]

			data.forEach(item => {
				products.push({
					id: item.product._id,
					quatity: Number(item.quantity),
					size: item.size
				})
			})

			const body = {
				total: subTotal + tax + shipping,
				subTotal,
				tax,
				shipping,
				products
			}
			const res = await createInvoice(body)
			if (res.errors) {
				toast.error(res.errors[0].message, {
					position: 'top-center'
				})
			} else {
				toast.success(res.message, {
					position: 'top-center'
				})
			}
		}
	})

	useEffect(() => {
		if (data) {
			let newSubtotal = 0
			data.forEach(product => {
				setValue(`quantity-${product._id}`, product.quantity)
				newSubtotal += Number(product.total)
			})
			setSubTotal(newSubtotal)
		}
	}, [data])

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Carrito de compra
				</h1>
				<form
					className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
					onSubmit={onSubmit}
				>
					<section aria-labelledby="cart-heading" className="lg:col-span-7">
						<ul
							role="list"
							className="divide-y divide-gray-200 border-b border-t border-gray-200"
						>
							{data ? (
								data.map(product => (
									<li key={product._id} className="flex py-3">
										<div className="flex-shrink-0">
											<Image
												alt="image product"
												src={product.product.image}
												width={190}
												height={190}
												className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
											/>
										</div>

										<div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
											<div>
												<div>
													<h3 className="text-sm font-medium text-gray-700">
														{product.product.name}
													</h3>
												</div>

												<div className="flex">
													{product.size ? (
														<p className="font-medium text-gray-900 text-sm border-r border-gray-200 pr-2 mr-2">
															{product.size}
														</p>
													) : null}
													<p className="font-medium text-gray-900 text-sm">
														${product.product.price}
													</p>
												</div>
											</div>
											<div className="flex items-end gap-2">
												<Input
													type="number"
													name={`quantity-${product._id}`}
													placeholder="100"
													register={register}
													rules={{
														required: {
															value: true,
															message: 'Campo requerido'
														}
													}}
													label="Cantidad del producto"
												/>
												<button
													type="button"
													aria-label="update item"
													className="bg-green-700 rounded h-[50px] px-2 mb-[3px]"
													onClick={() =>
														handleUpdateQuantity(`quantity-${product._id}`)
													}
												>
													<CheckIcon className="h-5 w-5" aria-hidden="true" />
												</button>
											</div>
										</div>
									</li>
								))
							) : (
								<h1>No hay productos</h1>
							)}
						</ul>
					</section>

					{/* Order summary */}
					<section
						aria-labelledby="summary-heading"
						className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
					>
						<h2
							id="summary-heading"
							className="text-lg font-medium text-gray-900"
						>
							Resumen del pedido
						</h2>

						<dl className="mt-6 space-y-4">
							<div className="flex items-center justify-between">
								<dt className="text-sm text-gray-600">Subtotal</dt>
								<dd className="text-sm font-medium text-gray-900">
									${subTotal}
								</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="flex items-center text-sm text-gray-600">
									<span>Impuesto Estimado</span>
								</dt>
								<dd className="text-sm font-medium text-gray-900">
									${shipping}
								</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="flex text-sm text-gray-600">
									<span>Tax estimate</span>
								</dt>
								<dd className="text-sm font-medium text-gray-900">${tax}</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="text-base font-medium text-gray-900">
									Total del pedido
								</dt>
								<dd className="text-base font-medium text-gray-900">
									${tax + shipping + subTotal}
								</dd>
							</div>
						</dl>

						<div className="mt-6">
							<button
								type="submit"
								className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
							>
								Comprar
							</button>
						</div>
					</section>
				</form>
			</div>
		</div>
	)
}
