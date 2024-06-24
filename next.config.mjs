/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'cdn.shopify.com',
			'loremflickr.com',
			'tailwindui.com',
			'images.unsplash.com',
			'i.pinimg.com'
		]
	}
}

export default nextConfig
