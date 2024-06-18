'use client'

import { Layout } from '@/components'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Home() {
	const { data, status, update } = useSession()

	useEffect(() => {
		console.warn('🚀 ~ Home ~ data:', data)
		console.warn('🚀 ~ Home ~ status:', status)
		console.warn('🚀 ~ Home ~ update:', update)
	}, [data, status, update])

	return <Layout>Home</Layout>
}
