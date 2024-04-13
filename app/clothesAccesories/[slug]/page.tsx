'use client'

import { GET_CLOTHES_ACCESORIES_BY_ID, getClothesAccesoriesById } from '@/api'
import { Layout, StartrReview } from '@/components'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const reviews = { average: 4, totalCount: 1624 }

export default function ClothesAccesoriesDetailPage({
	params
}: {
	params: { slug: string }
}) {
	const { slug } = params
	const [selectedSize, setSelectedSize] = useState('L')
	const [sizes, setSizes] = useState([
		{ name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
		{ name: '20L', description: 'Enough room for a serious amount of snacks.' }
	])

	const { data, isLoading } = useQuery({
		queryKey: [GET_CLOTHES_ACCESORIES_BY_ID, slug],
		queryFn: () => getClothesAccesoriesById(slug),
		retry: false
	})
	useEffect(() => {
		console.warn('🚀 ~ data:', data)
	}, [data])

	return (
		<Layout>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
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

							<div className="ml-4 border-l border-gray-300 pl-4">
								<h2 className="sr-only">Reviews</h2>
								<div className="flex items-center">
									<div>
										<StartrReview average={reviews.average} />
										<p className="sr-only">{reviews.average} out of 5 stars</p>
									</div>
									<p className="ml-2 text-sm text-gray-500">
										{reviews.totalCount} reviews
									</p>
								</div>
							</div>
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

						<form>
							<div className="sm:flex sm:justify-between">
								{/* Size selector */}
								<RadioGroup value={selectedSize} onChange={setSelectedSize}>
									<RadioGroup.Label className="block text-sm font-medium text-gray-700">
										Size
									</RadioGroup.Label>
									<div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
										{sizes.map((size, key) => (
											<RadioGroup.Option
												as="div"
												key={key}
												value={size}
												className={({ active }) =>
													clsx(
														active ? 'ring-2 ring-indigo-500' : '',
														'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
													)
												}
											>
												{/* {({ active, checked }) => (
													<>
														<RadioGroup.Label
															as="p"
															className="text-base font-medium text-gray-900"
														>
															{size.name}
														</RadioGroup.Label>
														<RadioGroup.Description
															as="p"
															className="mt-1 text-sm text-gray-500"
														>
															{size.description}
														</RadioGroup.Description>
														<div
															className={clsx(
																active ? 'border' : 'border-2',
																checked
																	? 'border-indigo-500'
																	: 'border-transparent',
																'pointer-events-none absolute -inset-px rounded-lg'
															)}
															aria-hidden="true"
														/>
													</>
												)} */}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>
							<div className="mt-4">
								<Link
									href="/"
									className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
								>
									<span>What size should I buy?</span>
									<QuestionMarkCircleIcon
										className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
										aria-hidden="true"
									/>
								</Link>
							</div>
							<div className="mt-10">
								<button
									type="submit"
									className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
								>
									Add to bag
								</button>
							</div>
						</form>
					</section>
				</div>
			</div>
		</Layout>
	)
}
