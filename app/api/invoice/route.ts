import { connectToDatabase, Error } from '@/utils'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'

export async function GET() {
	const sesion = await getServerSession(options)
	if (sesion) {
		const {
			user: { email }
		} = sesion as { user: { email?: string } }

		const dbg = await connectToDatabase()

		const user = await dbg.collection('users').findOne({ email })

		if (!user) {
			return NextResponse.json(
				{
					error: 'Usuario no encontrado'
				},
				{ status: 400 }
			)
		}

		try {
			const products = await dbg
				.collection('invoice')
				.aggregate([
					{
						$match: {
							userId: user._id
						}
					},
					{
						$unwind: '$products'
					},
					{
						$lookup: {
							from: 'products',
							localField: 'products.id',
							foreignField: '_id',
							as: 'productDetails'
						}
					},
					{
						$unwind: '$productDetails'
					},
					{
						$addFields: {
							'products.name': '$productDetails.name',
							'products.image': '$productDetails.image',
							'products.price': '$productDetails.price',
							'products.description': '$productDetails.description'
						}
					},
					{
						$group: {
							_id: '$_id',
							tax: { $first: '$tax' },
							total: { $first: '$total' },
							userId: { $first: '$userId' },
							subTotal: { $first: '$subTotal' },
							shipping: { $first: '$shipping' },
							createdAt: { $first: '$createdAt' },
							updatedAt: { $first: '$updatedAt' },
							products: { $push: '$products' }
						}
					},
					{
						$project: {
							_id: 1,
							tax: 1,
							total: 1,
							userId: 1,
							subTotal: 1,
							shipping: 1,
							createdAt: 1,
							updatedAt: 1,
							products: 1
						}
					},
					{
						$sort: { createdAt: -1 } // Ordenar por 'createdAt' en orden descendente
					}
				])
				.toArray()

			return NextResponse.json({ products })
		} catch (error) {
			return NextResponse.json(
				{
					error: 'Error al obtener las facturas'
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

		if (errors.length) {
			return NextResponse.json(
				{
					message: 'Error al crear la factura',
					errors
				},
				{ status: 400 }
			)
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
			await db
				.collection('shoppingCar')
				.deleteMany({ userId: new ObjectId(result._id) })

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
