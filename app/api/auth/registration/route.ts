import { Error, connectToDatabase, generateHash } from '@/utils'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const { name, lastname, email, password } = await request.json()
	const errors: Array<Error> = []

	if (!name) {
		errors.push({ field: 'name', message: 'Nombre Requerido' })
	}

	if (!lastname) {
		errors.push({ field: 'lastname', message: 'Apellido Requerido' })
	}

	if (!email) {
		errors.push({ field: 'email', message: 'Email Requerido' })
	}

	if (!password) {
		errors.push({ field: 'password', message: 'Contraseña Requerida' })
	}

	const db = await connectToDatabase()

	const result = await db.collection('users').findOne({ email })

	if (result?._id) {
		errors.push({ field: 'email', message: 'Email Existente' })
	}

	if (errors.length) {
		return NextResponse.json(
			{
				errors
			},
			{ status: 400 }
		)
	}

	const currentDate = Date.now()
	const newUser = {
		_id: new ObjectId(),
		name,
		lastname,
		email: email.toLowerCase(),
		password: generateHash(password),
		rol: 'user',
		createdAt: currentDate
	}

	try {
		const response = await db.collection('users').insertOne(newUser)
		return NextResponse.json({
			message: 'Usuario creado con éxito',
			userId: response.insertedId,
			email: newUser.email
		})
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Error al crear el usuario',
				errors
			},
			{ status: 400 }
		)
	}
}
