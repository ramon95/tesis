'use client'

import { GET_PERFUMERY, getProducts } from '@/api'
import { ItemCard, SkeletonItemCard } from '@/components'
import { useQuery } from '@tanstack/react-query'

export const Perfumery = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_PERFUMERY],
		queryFn: () => getProducts('perfumery'),
		retry: false
	})

	return (
		<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
			{isLoading ? (
				<SkeletonItemCard />
			) : data !== undefined ? (
				data.map(product => (
					<ItemCard
						key={product._id}
						product={product}
						urlDetailProduct="/perfumery"
					/>
				))
			) : (
				<h1 className="text-black">No hay productos</h1>
			)}
		</div>
	)
}
