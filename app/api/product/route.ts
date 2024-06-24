import { connectToDatabase, Error } from '@/utils'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

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

		if (searchParams.get('id')) {
			const _id = new ObjectId(searchParams.get('id') as string)
			if (_id) {
				const product = await dbg.collection('products').findOne({ _id })

				return NextResponse.json({ product })
			}
			return NextResponse.json(
				{
					error: 'Prodcuto no encontrado'
				},
				{ status: 400 }
			)
		}
		return NextResponse.json(
			{
				error: 'ID del producto requerido'
			},
			{ status: 400 }
		)
	}
	return NextResponse.json(
		{
			error: 'Usuario no autenticado'
		},
		{ status: 400 }
	)
}

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
			errors.push({ field: 'description', message: 'Descripcion Requerida' })
		}

		if (!image) {
			errors.push({ field: 'image', message: 'Imagen Requerida' })
		}

		if (!price) {
			errors.push({ field: 'price', message: 'Precio Requerido' })
		}

		if (!typeProduct) {
			errors.push({
				field: 'typeProduct',
				message: 'Tipo de productro Requerido'
			})
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
			const response = await db.collection('products').insertOne(newProduct)
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
