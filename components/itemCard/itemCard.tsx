'use client'

import { ProductsResponse } from '@/api'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

interface ItemCardProps {
	product: ProductsResponse
}

export const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
	useEffect(() => {
		console.warn('🚀 ~ product:', product)
	}, [product])

	return (
		<div className="group relative">
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
						<Link href={`/clothesAccesories/${product._id}`}>
							<span aria-hidden="true" className="absolute inset-0" />
							{product.name}
						</Link>
					</h3>
				</div>
				<p className="text-sm font-medium text-gray-900">${product.price}</p>
			</div>
		</div>
	)
}
