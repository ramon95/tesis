import { connectToDatabase } from '@/utils'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const typeProduct = searchParams.get('typeProduct')

	const dbg = await connectToDatabase()

	const products = await dbg
		.collection('products')
		.find({ typeProduct })
		.toArray()

	return NextResponse.json({ products })
}
