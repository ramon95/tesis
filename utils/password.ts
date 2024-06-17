import { hashSync } from 'bcrypt'

export const generateHash = (password: string): string => {
	return hashSync(password, 10)
}

// export const validPassword = (
// 	password: string,
// 	userPassword: string
// ): boolean => {
// 	return compareSync(password, userPassword)
// }
