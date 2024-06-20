import { connectToDatabase, generateHash, validPassword } from '@/utils'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { options } from '../../auth/[...nextauth]/options'

export async function PUT(request: Request) {
	const { oldPassword, newPassword } = await request.json()

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

		const valid = validPassword(oldPassword, result?.password)

		if (valid && result) {
			result.password = generateHash(newPassword)
			const updateProfile = await db
				.collection('users')
				.updateOne({ email }, { $set: result })

			if (updateProfile.modifiedCount === 1) {
				return NextResponse.json({
					message: 'Contraseña actualizada correctamente'
				})
			}

			return NextResponse.json(
				{
					error: 'No se pudo actualizar la contraseña'
				},
				{
					status: 400
				}
			)
		}
		return NextResponse.json(
			{
				error: 'No se pudo actualizar la contraseña'
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
