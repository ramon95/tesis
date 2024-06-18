import { QueryProvider, SessionAuthProvider } from '@/provider'
import ToastProvider from '@/provider/providerToast'
import type { Metadata } from 'next'
import 'react-loading-skeleton/dist/skeleton.css'
import './globals.css'

export const metadata: Metadata = {
	title: 'Clikcway',
	description: 'Elaborado por: Ramon Perez'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<QueryProvider>
					<SessionAuthProvider>
						<ToastProvider>{children}</ToastProvider>
					</SessionAuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
