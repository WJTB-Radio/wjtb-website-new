import type { Metadata } from "next";

// we have a seperate root layout for redirects to redirect as fast as possible within next.js
// even with this, the redirect paths still are an order of magnitude larger than our old site
// we are talking 6.5 kB vs 455 bytes though, so not a huge deal.
// i checked and our redirects still work without javascript in the static export.

export const metadata: Metadata = {
	title: "WJTB Radio",
	description: "NJIT's official college radio station.",
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	);
}
