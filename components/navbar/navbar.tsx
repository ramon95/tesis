'use client'

import { GET_USER_PROFILE, getUserProfile } from '@/api'
import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import {
	ArrowLeftStartOnRectangleIcon,
	Bars3Icon,
	ChevronDownIcon,
	Cog6ToothIcon,
	FolderPlusIcon,
	ShoppingBagIcon,
	ShoppingCartIcon,
	XMarkIcon
} from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { LinkMenu } from '..'

export const Navbar = () => {
	const { data, status } = useSession()
	const [open, setOpen] = useState(false)
	const { data: dataUser } = useQuery({
		queryKey: [GET_USER_PROFILE],
		queryFn: () => getUserProfile(),
		retry: false
	})
	const navigation = [
		{ id: 0, name: 'Inicio', href: '/' },
		{ id: 1, name: 'Ropa y accesorios', href: '/clothesAccesories' },
		{
			id: 2,
			name: 'Elctrodomesticos y repuestos',
			href: '/appliancesSpareParts'
		},
		{ id: 3, name: 'Perfumeria', href: '/perfumery' },
		{ id: 4, name: 'Alimentos no perecederos', href: '/nonperishableFood' }
	]
	const userNavigation = [
		{
			id: 0,
			name: 'Perfil',
			href: '/profile',
			icon: <Cog6ToothIcon className="h-6 w-6" />
		},
		{
			id: 1,
			name: 'Mi compras',
			href: '/myShoppings',
			icon: <ShoppingCartIcon className="h-6 w-6" />
		}
	]

	return (
		<div>
			{/* Mobile menu */}
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
								<div className="flex px-4 pb-2 pt-5">
									<button
										type="button"
										className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
										onClick={() => setOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								<div className="space-y-6 border-t border-gray-200 px-4 py-6">
									{navigation.map(page => (
										<div key={page.name} className="flow-root">
											<Link
												href={page.href}
												className="-m-2 block p-2 font-medium text-gray-900"
											>
												{page.name}
											</Link>
										</div>
									))}
								</div>

								<div className="space-y-6 border-t border-gray-200 px-4 py-6">
									{status === 'unauthenticated' ? (
										<>
											<div className="flow-root">
												<LinkMenu
													name="Crear cuenta"
													href="/auth/registration"
													mobile
												/>
											</div>
											<div className="flow-root">
												<LinkMenu name="Entrar" href="/auth/singin" mobile />
											</div>
										</>
									) : (
										<>
											{userNavigation.map(item => (
												<div className="flow-root" key={item.id}>
													<LinkMenu name={item.name} href={item.href} mobile />
												</div>
											))}
											<div className="flow-root">
												<LinkMenu
													mobile
													href="/newProduct"
													name="Agregar productos"
												/>
											</div>
											<div className="flow-root">
												<button
													type="button"
													className="-m-2 block p-2 font-medium text-gray-900"
													onClick={() => signOut()}
												>
													Salir
												</button>
											</div>
										</>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
			<header className="relative">
				<nav aria-label="Top">
					{/* Top navigation */}
					<div className="bg-gray-900 hidden lg:block">
						<div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
							<div className="flex justify-between w-full space-x-6">
								<Popover.Group className="inset-x-0 bottom-0 px-4">
									<div className="flex h-full justify-center space-x-8">
										{navigation.map(page => (
											<Link
												key={page.name}
												href={page.href}
												className="flex items-center text-sm font-medium text-white hover:text-green-300"
											>
												{page.name}
											</Link>
										))}
									</div>
								</Popover.Group>
								<div className="flex item-center justify-center gap-2">
									{status === 'authenticated' ? (
										<Menu>
											<Menu.Button className="relative flex item-center gap-2">
												Bienvenido {data?.user?.name}{' '}
												<ChevronDownIcon
													className="h-6 w-6"
													aria-hidden="true"
												/>
											</Menu.Button>
											<Menu.Items
												className={clsx(
													dataUser?.rol === 'admin'
														? '-bottom-[153px]'
														: '-bottom-[120px]',
													'absolute z-10 bg-gray-700 p-4 rounded'
												)}
											>
												{userNavigation.map(item => (
													<Menu.Item key={item.id}>
														<Link
															className="flex items-center gap-2 data-[focus]:bg-blue-100 mb-2"
															href={item.href}
														>
															{item.icon}
															{item.name}
														</Link>
													</Menu.Item>
												))}
												{dataUser?.rol === 'admin' && (
													<Menu.Item>
														<Link
															className="flex items-center gap-2 data-[focus]:bg-blue-100 mb-2"
															href="/newProduct"
														>
															<FolderPlusIcon className="h-6 w-6" />
															Agregar productos
														</Link>
													</Menu.Item>
												)}
												<Menu.Item>
													<button
														type="button"
														className="flex items-center gap-2 data-[focus]:bg-blue-100"
														onClick={() => signOut()}
													>
														<ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
														Salir
													</button>
												</Menu.Item>
											</Menu.Items>
										</Menu>
									) : (
										<>
											<LinkMenu name="Entrar" href="/auth/singin" />
											<LinkMenu name="Crear cuenta" href="/auth/registration" />
										</>
									)}
									{/* Cart */}
									<div className="ml-4 flow-root lg:ml-8">
										<div className="group -m-2 flex items-center p-2">
											<ShoppingBagIcon
												className="h-6 w-6 flex-shrink-0 text-white group-hover:text-green-300"
												aria-hidden="true"
											/>
											<span className="ml-2 text-sm font-medium text-white group-hover:text-green-300">
												0
											</span>
											<span className="sr-only">items in cart, view bag</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Secondary navigation */}
					<div className="bg-white lg:hidden">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="border-b border-gray-200">
								<div className="flex h-16 items-center justify-between">
									<div>
										<button
											type="button"
											className="-ml-2 rounded-md bg-white p-2 text-gray-400"
											onClick={() => setOpen(true)}
										>
											<span className="sr-only">Open menu</span>
											<Bars3Icon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>

									<div className="flex flex-1 items-center justify-end">
										<div className="flex items-center lg:ml-8">
											{/* Cart */}
											<div className="ml-4 flow-root lg:ml-8">
												<div className="group -m-2 flex items-center p-2">
													<ShoppingBagIcon
														className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
													<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
														0
													</span>
													<span className="sr-only">
														items in cart, view bag
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}
