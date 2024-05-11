'use client'

import { GET_CLOTHES_ACCESORIES_BY_ID, getClothesAccesoriesById } from '@/api'
import { DetailItem, Layout } from '@/components'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

// const reviews = { average: 4, totalCount: 1624 }

export default function ClothesAccesoriesDetailPage({
	params
}: {
	params: { slug: string }
}) {
	const { slug } = params
	const [selectedSize, setSelectedSize] = useState('L')

	const { data } = useQuery({
		queryKey: [GET_CLOTHES_ACCESORIES_BY_ID, slug],
		queryFn: () => getClothesAccesoriesById(slug),
		retry: false
	})

	return (
		<Layout>
			<DetailItem
				data={data}
				selectedSize={selectedSize}
				setSelectedSize={setSelectedSize}
			/>
		</Layout>
	)
}
