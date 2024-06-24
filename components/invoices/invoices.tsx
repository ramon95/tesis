'use client'

export const Invoices = () => {
	const shoppings = [
		{ id: 0, date: '01/01/2024', status: 'Enviado' },
		{ id: 1, date: '01/02/2024', status: 'Enviado' },
		{ id: 2, date: '01/03/2024', status: 'Enviado' },
		{ id: 3, date: '01/04/2024', status: 'Enviado' },
		{ id: 4, date: '01/05/2024', status: 'Enviado' },
		{ id: 4, date: '01/06/2024', status: 'Pendiente' }
	]
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">
						Tus compras
					</h1>
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										Fecha
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Estado
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{shoppings.map(shopping => (
									<tr key={shopping.id}>
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
											{shopping.date}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{shopping.status}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
