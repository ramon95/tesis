import { connectToDatabase, validPassword } from '@/utils'
import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				const email = credentials?.email || ''
				const password = credentials?.password || ''

				if (!email || !password) {
					throw new Error('Ingrese correo y contraseña')
				}

				const db = await connectToDatabase()
				const result = await db.collection('users').findOne({ email })

				if (!result) {
					throw new Error('Credenciales no válidas')
				}

				const valid = validPassword(password, result?.password)
				cookies().set('rol', result.rol)
				cookies().set('email', result.email)
				cookies().set('name', result.name)

				if (valid && result) {
					return {
						email: result.email,
						name: result.name
					} as unknown as User
				}
				throw new Error('Correo o contraseña no válidos')
			}
		})
	]
}
