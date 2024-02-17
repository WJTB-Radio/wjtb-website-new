/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	basePath: process.env.basePath,
	assetPrefix: process.env.basePath,
};

export default nextConfig;
