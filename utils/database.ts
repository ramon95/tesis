import { Db, MongoClient } from 'mongodb'

let cachedDb: Db | null = null

export const connectToDatabase = async () => {
	if (cachedDb) {
		return cachedDb
	}

	const uri = process.env.MONGODB_URI
	const dbName = process.env.MONGODB_DB

	if (!uri) {
		throw new Error(
			'Please define the MONGODB_URI environment variable inside .env.local'
		)
	}

	if (!dbName) {
		throw new Error(
			'Please define the MONGODB_DB environment variable inside .env.local'
		)
	}

	const opts = {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	}

	const client = new MongoClient(uri, opts)
	await client.connect()

	const db = client.db(dbName)

	cachedDb = db
	return db
}
