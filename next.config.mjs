/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	basePath: process.env.NEXT_PUBLIC_BASE_PATH,
	assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
	transpilePackages: [
		"@radix-ui/react-collapsible",
		"@radix-ui/react-slot",
		"class-variance-authority",
		"clsx",
		"core-js",
		"embla-carousel-autoplay",
		"embla-carousel-react",
		"hls.js",
		"lucide-react",
		"next",
		"node-sass",
		"react",
		"react-dom",
		"react-use-cookie",
		"sass",
		"swr",
		"tailwind-merge",
		"tailwindcss-animate",
	],
};

export default nextConfig;
