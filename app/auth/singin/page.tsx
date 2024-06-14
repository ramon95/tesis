import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export default function Singin() {
	return (
		<div className="h-full">
			<div className="flex min-h-full flex-1">
				<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Ingresar
							</h2>
						</div>

						<div className="mt-10">
							<div>
								<form action="#" method="POST" className="space-y-6">
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Correo electrónico
										</label>
										<div className="mt-2">
											<input
												id="email"
												name="email"
												type="email"
												autoComplete="email"
												required
												className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Contraseña
										</label>
										<div className="mt-2">
											<input
												id="password"
												name="password"
												type="password"
												autoComplete="current-password"
												required
												className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="flex flex-col items-center justify-between">
										<div className="text-sm leading-6">
											<Link
												href="/auth/forgotPassword"
												className="font-semibold text-indigo-600 hover:text-indigo-500"
											>
												¿Olvidaste tu contraseña?
											</Link>
										</div>
										<div className="text-sm leading-6">
											<Link
												href="/auth/registration"
												className="font-semibold text-indigo-600 hover:text-indigo-500"
											>
												¿No tienes cuenta? Registrate
											</Link>
										</div>
									</div>

									<div>
										<button
											type="submit"
											className={clsx(
												'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
											)}
										>
											Ingresar
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="relative hidden w-0 flex-1 lg:block">
					<Image
						className="absolute inset-0 h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt="backgroud"
						width={1908}
						height={1272}
					/>
				</div>
			</div>
		</div>
	)
}
