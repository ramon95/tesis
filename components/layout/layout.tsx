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
			{children}
		</div>
	)
}
