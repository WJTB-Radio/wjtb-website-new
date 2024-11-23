"use client";

import "./globals.scss";
import { ReactNode, useMemo } from "react";
import { useWidth } from "../utils/use_width";
import Script from "next/script";
import RememberTheme from "./remember_theme";
import Players from "./players/players";
import Schedule from "./schedule";
import Navigation from "./navigation";
import styles from "./layout.module.scss";
import { Clock } from "./clock/clock";

export default function Layout({
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
	let width = useWidth().width;
	return (
		<>
			<Script src={basePath + "js/smoothscroll.min.js"} />
			<RememberTheme />
			<div className={styles.players}>
				{useMemo(
					() => (
						<Players />
					),
					[]
				)}
				{width < 1000 ? <Clock /> : undefined}
				{width < 1000 ? <Navigation /> : undefined}
				<Schedule />
			</div>
			{width >= 1000 ? <Navigation /> : undefined}
			{width >= 1000 ? <Clock /> : undefined}
			{children}
		</>
	);
}
