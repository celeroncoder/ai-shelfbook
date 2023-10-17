/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { serverActions: true },
	images: {
		domains: ["googleusercontent.com"],
	},
};

module.exports = nextConfig;
