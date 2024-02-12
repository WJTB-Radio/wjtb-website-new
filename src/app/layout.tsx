import type { Metadata } from "next";
import "./globals.scss";
import Players from "./players/players";
import Schedule from "./schedule";
import styles from "./layout.module.scss";
import Navigation from "./navigation";

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
