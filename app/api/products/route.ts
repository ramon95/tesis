import { connectToDatabase, Error } from '@/utils'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'

export async function POST(request: Request) {
	const { name, description, image, price, typeProduct } = await request.json()
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

		if (result.rol !== 'admin') {
			return NextResponse.json(
				{
					error: 'Usuario no autorizado'
				},
				{ status: 400 }
			)
		}

		if (!name) {
			errors.push({ field: 'name', message: 'Nombre Requerido' })
		}

		if (!description) {
			errors.push({ field: 'lastName', message: 'Apellido Requerido' })
		}

		if (!image) {
			errors.push({ field: 'email', message: 'Email Requerido' })
		}

		if (!price) {
			errors.push({ field: 'password', message: 'Contraseña Requerida' })
		}

		if (!typeProduct) {
			errors.push({ field: 'password', message: 'Contraseña Requerida' })
		}

		const currentDate = Date.now()
		const newProduct = {
			_id: new ObjectId(),
			name,
			description,
			image,
			price,
			typeProduct,
			createdAt: currentDate,
			updatedAt: currentDate
		}

		try {
			const response = await db.collection('product').insertOne(newProduct)
			return NextResponse.json({
				message: 'Productro creado con éxito',
				productId: response.insertedId,
				name: newProduct.name
			})
		} catch (error) {
			return NextResponse.json(
				{
					message: 'Error al crear el producto',
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
