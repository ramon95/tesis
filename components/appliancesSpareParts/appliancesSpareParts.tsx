'use client'

import { GET_APPLIANCES_SPARE_PARTS, getClothesAccesories } from '@/api'
import { ItemCard, SkeletonItemCard } from '@/components'
import { useQuery } from '@tanstack/react-query'

export const AppliancesSpareParts = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_APPLIANCES_SPARE_PARTS],
		queryFn: () => getClothesAccesories(),
		retry: false
	})

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
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
