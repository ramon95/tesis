import { connectToDatabase } from '@/utils'
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
		console.warn('🚀 ~ GET ~ products:', products)

		return NextResponse.json({ products })
	}
	return NextResponse.json(
		{
			error: 'Usuario no autenticado'
		},
		{ status: 400 }
	)
}
