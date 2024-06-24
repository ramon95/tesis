import { connectToDatabase } from '@/utils'
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
			.aggregate([
				{
					$match: {
						userId: user._id
					}
				},
				{
					$lookup: {
						from: 'products',
						localField: 'productId',
						foreignField: '_id',
						as: 'products'
					}
				},
				{ $unwind: '$products' },
				{
					$project: {
						_id: 1,
						total: 1,
						quantity: 1,
						size: 1,
						userId: 1,
						createdAt: 1,
						updatedAt: 1,
						product: {
							_id: '$products._id',
							name: '$products.name',
							image: '$products.image',
							price: '$products.price'
						}
					}
				}
			])
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

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url)

	if (searchParams.get('productId')) {
		const _id = new ObjectId(searchParams.get('productId') as string)
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
				await dbg.collection('shoppingCar').deleteOne({ _id })

				return NextResponse.json({
					message: 'Producto eliminado con exito'
				})
			} catch (error) {
				return NextResponse.json(
					{
						message: 'Error al elimnar el producto del carrito',
						error
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
	return NextResponse.json(
		{
			error: 'Id del producto requerido'
		},
		{ status: 400 }
	)
}
