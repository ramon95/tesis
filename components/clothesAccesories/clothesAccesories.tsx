'use client'

import { GET_CLOTHES_ACCESORIES, getClothesAccesories } from '@/api'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

export const ClothesAccesories = () => {
	const { data } = useQuery({
		queryKey: [GET_CLOTHES_ACCESORIES],
		queryFn: () => getClothesAccesories(),
		retry: false
	})

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{data &&
						data.map(product => (
							<div key={product.id} className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<Image
										alt="image"
										width={200}
										height={200}
										src={product.image}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<Link href={`/clothesAccesories/${product.id}`}>
												<span aria-hidden="true" className="absolute inset-0" />
												{product.name}
											</Link>
										</h3>
									</div>
									<p className="text-sm font-medium text-gray-900">
										{product.price}
									</p>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}
