'use client'

import { SessionProvider } from 'next-auth/react'

export const SessionAuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	return (
		<SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
	)
}
