import { QueryProvider } from '@/provider'
import type { Metadata } from 'next'
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
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
