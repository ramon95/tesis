'use client'

import { GET_CLOTHES_ACCESORIES_BY_ID, getProductById } from '@/api'
import { DetailItem, Layout, SkeletonItemCard } from '@/components'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function NonperishableFoodDetailPage({
	params
}: {
	params: { slug: string }
}) {
	const { slug } = params
	const [selectedSize, setSelectedSize] = useState('L')

	const { data, isLoading } = useQuery({
		queryKey: [GET_CLOTHES_ACCESORIES_BY_ID, slug],
		queryFn: () => getProductById(slug),
		retry: false
	})

	return isLoading ? (
		<SkeletonItemCard />
	) : (
		<Layout>
			<DetailItem
				data={data}
				selectedSize={selectedSize}
				setSelectedSize={setSelectedSize}
			/>
		</Layout>
	)
}
