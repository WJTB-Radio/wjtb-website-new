import type { Metadata } from "next";
import "./globals.scss";
import Players from "./players/players";

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
				<Players />
				{children}
			</body>
		</html>
	);
}
