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

		const products = await dbg
			.collection('shoppingCar')
			.find({ userId: user._id })
			.toArray()

		return NextResponse.json({ products })
	}
	return NextResponse.json(
		{
			error: 'Usuario no autenticado'
		},
		{ status: 400 }
	)
}

export async function POST(request: Request) {
	const { size, quantity, typeProduct, productId, total } = await request.json()
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

		if (!productId) {
			errors.push({ field: 'productId', message: 'ProductId Requerida' })
		}

		if (!quantity) {
			errors.push({ field: 'quantity', message: 'Cantidad Requerida' })
		}

		if (!total) {
			errors.push({ field: 'total', message: 'Total Requerida' })
		}

		if (!typeProduct) {
			errors.push({
				field: 'typeProduct',
				message: 'Tipo de productro Requerido'
			})
		}

		if (typeProduct === 'clothesAccesories') {
			if (!size) {
				errors.push({ field: 'size', message: 'Talla Requerido' })
			}
		}

		const currentDate = Date.now()
		const newProduct = {
			_id: new ObjectId(),
			total,
			quantity,
			productId: new ObjectId(productId),
			typeProduct,
			size: size ? size.name : null,
			userId: new ObjectId(result._id),
			createdAt: currentDate,
			updatedAt: currentDate
		}

		try {
			const response = await db.collection('shoppingCar').insertOne(newProduct)
			return NextResponse.json({
				message: 'Productro agregado al carrito con éxito',
				shoppingCardId: response.insertedId
			})
		} catch (error) {
			return NextResponse.json(
				{
					message: 'Error al agregar el producto en el carrito',
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
