'use client'

import { GET_NONPERSISHABLE_FOOD, getClothesAccesories } from '@/api'
import { ItemCard, SkeletonItemCard } from '@/components'
import { useQuery } from '@tanstack/react-query'

export const NonperishableFood = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_NONPERSISHABLE_FOOD],
		queryFn: () => getClothesAccesories(),
		retry: false
	})

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{isLoading ? (
						<SkeletonItemCard />
					) : (
						data &&
						data.map(product => <ItemCard key={product.id} product={product} />)
					)}
				</div>
			</div>
		</div>
	)
}
