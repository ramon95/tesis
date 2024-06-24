'use client'

import { GET_INVOICES_USERS, getInvoices } from '@/api'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import Image from 'next/image'
import { useEffect } from 'react'

export const Invoices = () => {
	const { data } = useQuery({
		queryKey: [GET_INVOICES_USERS],
		queryFn: () => getInvoices(),
		retry: false
	})

	useEffect(() => {
		console.warn('🚀 ~ Invoices ~ data:', data)
	}, [data])

	return (
		<div className="bg-white">
			<div className="py-4 sm:py-16">
				<div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
					<div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							Historial de pedidos
						</h1>
					</div>
				</div>
				{data &&
					data.map(invoice => (
						<div className="mt-16" key={invoice._id}>
							<h2 className="sr-only">Ordenes recientes</h2>
							<div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
								<div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
									<div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
										<div className="border-b border-gray-200 p-4 sm:flex items-end justify-between">
											<div className="sm:flex items-center gap-3">
												<div>
													<dt className="font-medium text-gray-900">
														Numero de orden
													</dt>
													<dd className="mt-1 text-gray-500 truncate">
														{invoice._id}
													</dd>
												</div>
												<div>
													<dt className="font-medium text-gray-900">
														Fecha de creacion
													</dt>
													<dd className="mt-1 text-gray-500">
														<time dateTime={invoice.createdAt}>
															{moment(invoice.createdAt).format('MMM D, YYYY')}
														</time>
													</dd>
												</div>
											</div>

											<div>
												<dt className="font-medium text-gray-900 sm:text-right">
													Total
												</dt>
												<dd className="mt-1 font-medium text-gray-900 sm:text-right">
													${invoice.total}
												</dd>
											</div>
										</div>

										{/* Products */}
										<h4 className="sr-only">Items</h4>
										<ul role="list" className="divide-y divide-gray-200">
											{invoice.products.map(product => (
												<li key={product._id} className="p-4 sm:p-6">
													<div className="flex items-center sm:items-start">
														<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
															<Image
																alt="preview product"
																src={product.image}
																width={160}
																height={160}
																className="h-full w-full object-cover object-center"
															/>
														</div>
														<div className="ml-6 flex-1 text-sm">
															<div className="font-medium text-gray-900 sm:flex sm:justify-between">
																<h5>
																	{product.name}
																	{product.size !== null &&
																		` | ${product.size}`}
																</h5>
																<p className="mt-2 sm:mt-0">${product.price}</p>
															</div>
															<div className="font-medium text-gray-900 sm:flex sm:justify-between">
																<h5>Cantidad: {product.quatity}</h5>
																<p className="mt-2 sm:mt-0">
																	${Number(product.price) * product.quatity}
																</p>
															</div>

															<p className="hidden text-gray-500 sm:mt-2 sm:block">
																{product.description}
															</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}
