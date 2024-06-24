import { connectToDatabase, Error } from '@/utils'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'

export async function POST(request: Request) {
	const { products, total, subTotal, tax, shipping } = await request.json()
	const errors: Array<Error> = []

	const sesion = await getServerSession(options)
	if (sesion) {
		const {
			user: { email }
		} = sesion as { user: { email?: string } }

		const db = await connectToDatabase()

		const result = await db.collection('users').findOne({ email })

		if (!result) {
			return NextResponse.json(
				{
					error: 'Usuario no encontrado'
				},
				{ status: 400 }
			)
		}

		if (!products) {
			errors.push({ field: 'products', message: 'Products Requerida' })
		}

		if (!subTotal) {
			errors.push({ field: 'subTotal', message: 'subTotal Requerida' })
		}

		if (!total) {
			errors.push({ field: 'total', message: 'Total Requerida' })
		}

		if (!tax) {
			errors.push({
				field: 'tax',
				message: 'tax Requerido'
			})
		}

		if (!shipping) {
			errors.push({ field: 'shipping', message: 'Shipping Requerido' })
		}

		const newProducts = products.map((item: { id: number }) => ({
			...item,
			id: new ObjectId(item.id)
		}))

		const currentDate = Date.now()
		const newProduct = {
			_id: new ObjectId(),
			total,
			subTotal,
			tax,
			shipping,
			products: newProducts,
			userId: new ObjectId(result._id),
			createdAt: currentDate,
			updatedAt: currentDate
		}

		try {
			const response = await db.collection('invoice').insertOne(newProduct)
			return NextResponse.json({
				message: 'Factura creada con éxito',
				invoiceId: response.insertedId
			})
		} catch (error) {
			return NextResponse.json(
				{
					message: 'Error al crear la factura',
					errors
				},
				{ status: 400 }
			)
		}
	}
	return NextResponse.json(
		{
			error: 'Usuario no autenticado'
		},
		{ status: 400 }
	)
}
