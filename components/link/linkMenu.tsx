import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface LinkMenuProps {
	name: string
	href: string
	icon?: boolean
	class2?: boolean
	mobile?: boolean
	children?: React.ReactNode
}

export const LinkMenu: React.FC<LinkMenuProps> = ({
	icon,
	name,
	href,
	mobile,
	class2,
	children
}) => {
	return (
		<Link
			href={href}
			className={clsx(
				mobile && !icon && !class2
					? '-m-2 block p-2 font-medium text-gray-900'
					: 'text-sm font-medium text-white hover:text-gray-100',
				icon && 'p-2 text-gray-400 hover:text-gray-500 lg:hidden',
				class2 &&
					'hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block'
			)}
		>
			{children || name}
		</Link>
	)
}
