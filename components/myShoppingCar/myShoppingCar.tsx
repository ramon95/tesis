'use client'

import {
	GET_USER_SHOOPING_CAR_DETAIL,
	getProductsShoppingCarDetail
} from '@/api'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect } from 'react'

export const MyShoppingCar = () => {
	const { data } = useQuery({
		queryKey: [GET_USER_SHOOPING_CAR_DETAIL],
		queryFn: () => getProductsShoppingCarDetail(),
		retry: false
	})

	useEffect(() => {
		console.warn('🚀 ~ MyShoppingCar ~ data:', data)
	}, [data])

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Carrito de compra
				</h1>
				<form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
					<section aria-labelledby="cart-heading" className="lg:col-span-7">
						<ul
							role="list"
							className="divide-y divide-gray-200 border-b border-t border-gray-200"
						>
							{data &&
								data.map(product => (
									<li key={product._id} className="flex">
										<div className="flex-shrink-0">
											<Image
												alt="image product"
												src={product.product.image}
												width={300}
												height={300}
											/>
										</div>

										<div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
											<div className="">
												<div>
													<h3 className="text-sm font-medium text-gray-700">
														{product.product.name}
													</h3>
												</div>

												<div className="flex">
													{product.size ? (
														<p className="mr-4 border-r border-gray-200 pl-4 text-gray-500">
															{product.size}
														</p>
													) : null}
													<p className="mt-1 text-sm font-medium text-gray-900">
														${product.product.price}
													</p>
												</div>
											</div>
										</div>
									</li>
								))}
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
							Order summary
						</h2>

						<dl className="mt-6 space-y-4">
							<div className="flex items-center justify-between">
								<dt className="text-sm text-gray-600">Subtotal</dt>
								<dd className="text-sm font-medium text-gray-900">$99.00</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="flex items-center text-sm text-gray-600">
									<span>Shipping estimate</span>
									<a
										href="#"
										className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
									>
										<span className="sr-only">
											Learn more about how shipping is calculated
										</span>
										<QuestionMarkCircleIcon
											className="h-5 w-5"
											aria-hidden="true"
										/>
									</a>
								</dt>
								<dd className="text-sm font-medium text-gray-900">$5.00</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="flex text-sm text-gray-600">
									<span>Tax estimate</span>
									<a
										href="#"
										className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
									>
										<span className="sr-only">
											Learn more about how tax is calculated
										</span>
										<QuestionMarkCircleIcon
											className="h-5 w-5"
											aria-hidden="true"
										/>
									</a>
								</dt>
								<dd className="text-sm font-medium text-gray-900">$8.32</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="text-base font-medium text-gray-900">
									Order total
								</dt>
								<dd className="text-base font-medium text-gray-900">$112.32</dd>
							</div>
						</dl>

						<div className="mt-6">
							<button
								type="submit"
								className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
							>
								Checkout
							</button>
						</div>
					</section>
				</form>
			</div>
		</div>
	)
}
