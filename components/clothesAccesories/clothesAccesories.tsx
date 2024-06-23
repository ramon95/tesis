'use client'

import { GET_PRODUCT, getProducts } from '@/api'
import { ItemCard, SkeletonItemCard } from '@/components'
import { useQuery } from '@tanstack/react-query'

export const ClothesAccesories = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_PRODUCT],
		queryFn: () => getProducts('clothesAccesories'),
		retry: false
	})

	return (
		<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
			{isLoading ? (
				<SkeletonItemCard />
			) : (
				data &&
				data.map(product => (
					<ItemCard
						key={product._id}
						product={product}
						urlDetailProduct="/clothesAccesories"
					/>
				))
			)}
		</div>
	)
}
