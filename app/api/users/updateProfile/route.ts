import { connectToDatabase } from '@/utils'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { options } from '../../auth/[...nextauth]/options'

export async function GET() {
	const sesion = await getServerSession(options)
	if (sesion) {
		const {
			user: { email }
		} = sesion as { user: { email?: string } }

		const dbg = await connectToDatabase()

		const user = await dbg.collection('users').findOne({ email })

		if (user) {
			delete user.password
			return NextResponse.json(user)
		}
		return NextResponse.json(
			{
				error: 'Usuario no encontrado'
			},
			{ status: 400 }
		)
	}
}

export async function PUT(request: Request) {
	const {
		email: newEmail,
		name: newName,
		lastName: newLastName
	} = await request.json()

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

		result.email = newEmail || result.email
		result.name = newName || result.name
		result.lastName = newLastName || result.lastName
		result.updatedAt = Date.now()

		const updateProfile = await db
			.collection('users')
			.updateOne({ email }, { $set: result })

		if (updateProfile.modifiedCount === 1) {
			return NextResponse.json({
				message: 'Usuario actualizado correctamente'
			})
		}
		return NextResponse.json(
			{
				error: 'No se pudo actualizar el usuario'
			},
			{
				status: 400
			}
		)
	}
	return NextResponse.json(
		{
			error: 'Usuario no autenticado'
		},
		{ status: 400 }
	)
}
