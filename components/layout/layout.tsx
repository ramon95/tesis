'use client'

import React from 'react'
import { Navbar } from '..'

interface LayoutProps {
	children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="bg-white">
			<Navbar />
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
					{children}
				</div>
			</div>
		</div>
	)
}
