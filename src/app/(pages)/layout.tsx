import type { Metadata } from "next";
import "./globals.scss";
import Players from "./players/players";
import Schedule from "./schedule";
import styles from "./layout.module.scss";
import Navigation from "./navigation";
import RememberTheme from "./remember_theme";
import Script from "next/script";

export const metadata: Metadata = {
	title: "WJTB Radio",
	description: "NJIT's official college radio station.",
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	let basePath = "/";
	if(process.env.NEXT_PUBLIC_BASE_PATH != null) {
		basePath = process.env.NEXT_PUBLIC_BASE_PATH.endsWith("/")?process.env.NEXT_PUBLIC_BASE_PATH:"/";
	}
	return (
		<html lang="en">
			<body>
				<Script src={basePath+"js/smoothscroll.min.js"} />
				<RememberTheme />
				<div className={styles.players}>
					<Players />
					<Schedule />
				</div>
				<Navigation />
				{children}
			</body>
		</html>
	);
}
