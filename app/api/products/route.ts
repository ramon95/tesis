import { connectToDatabase } from '@/utils'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const typeProduct = searchParams.get('typeProduct')
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
			.collection('products')
			.find({ typeProduct })
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
