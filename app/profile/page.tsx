'use client'

import { Layout, Profile } from '@/components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
	const router = useRouter()
	const { status } = useSession()

	if (status === 'unauthenticated') {
		router.push('/auth/singin')
	}
	return (
		<Layout>
			<Profile />
		</Layout>
	)
}
