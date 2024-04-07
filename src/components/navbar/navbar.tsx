'use client'
import React, { Fragment, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	XMarkIcon
} from '@heroicons/react/24/outline'
import { LinkMenu } from '..'

export const Navbar = () => {
	const [open, setOpen] = useState(false)
	const navigation = [
		{ name: 'Ropa y accesorios', href: '#' },
		{ name: 'Elctrodomesticos y repuestos', href: '#' },
		{ name: 'Perfumeria', href: '#' },
		{ name: 'Alimentos no perecederos', href: '#' }
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
											<a
												href={page.href}
												className="-m-2 block p-2 font-medium text-gray-900"
											>
												{page.name}
											</a>
										</div>
									))}
								</div>

								<div className="space-y-6 border-t border-gray-200 px-4 py-6">
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
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
			<header className="relative">
				<nav aria-label="Top">
					{/* Top navigation */}
					<div className="bg-gray-900">
						<div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
							<div className="flex justify-end w-full space-x-6">
								<LinkMenu name="Entrar" href="/auth/singin" />
								<LinkMenu name="Crear cuenta" href="/auth/registration" />
							</div>
						</div>
					</div>

					{/* Secondary navigation */}
					<div className="bg-white">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="border-b border-gray-200">
								<div className="flex h-16 items-center justify-between">
									{/* Logo (lg+) */}
									<div className="hidden lg:flex lg:flex-1 lg:items-center">
										<a href="#">
											<span className="sr-only">Clikway</span>
											<img
												className="h-8 w-auto"
												src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
												alt=""
											/>
										</a>
									</div>

									<div className="hidden h-full lg:flex">
										{/* Flyout menus */}
										<Popover.Group className="inset-x-0 bottom-0 px-4">
											<div className="flex h-full justify-center space-x-8">
												{navigation.map(page => (
													<a
														key={page.name}
														href={page.href}
														className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
													>
														{page.name}
													</a>
												))}
											</div>
										</Popover.Group>
									</div>

									{/* Mobile menu and search (lg-) */}
									<div className="flex flex-1 items-center lg:hidden">
										<button
											type="button"
											className="-ml-2 rounded-md bg-white p-2 text-gray-400"
											onClick={() => setOpen(true)}
										>
											<span className="sr-only">Open menu</span>
											<Bars3Icon className="h-6 w-6" aria-hidden="true" />
										</button>

										{/* Search */}
										<LinkMenu name="Buscar" href="#" icon>
											<span className="sr-only">Buscar</span>
											<MagnifyingGlassIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</LinkMenu>
									</div>

									{/* Logo (lg-) */}
									<a href="#" className="lg:hidden">
										<span className="sr-only">Your Company</span>
										<img
											src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
											alt=""
											className="h-8 w-auto"
										/>
									</a>

									<div className="flex flex-1 items-center justify-end">
										<LinkMenu name="Buscar" href="#" class2 />
										<div className="flex items-center lg:ml-8">
											{/* Cart */}
											<div className="ml-4 flow-root lg:ml-8">
												<a
													href="#"
													className="group -m-2 flex items-center p-2"
												>
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
												</a>
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
