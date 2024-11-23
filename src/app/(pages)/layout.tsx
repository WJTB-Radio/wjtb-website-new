import type { Metadata } from "next";
import "./globals.scss";
import { ReactNode } from "react";
import Layout from "./layout_client";

export const metadata: Metadata = {
	title: "WJTB Radio",
	description: "NJIT's official college radio station.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	let basePath = "/";
	if (process.env.NEXT_PUBLIC_BASE_PATH != null) {
		basePath = process.env.NEXT_PUBLIC_BASE_PATH.endsWith("/")
			? process.env.NEXT_PUBLIC_BASE_PATH
			: process.env.NEXT_PUBLIC_BASE_PATH + "/";
	}
	return (
		<html lang="en">
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
