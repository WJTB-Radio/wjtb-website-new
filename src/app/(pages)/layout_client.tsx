"use client";

import "./globals.scss";
import { ReactNode, useMemo } from "react";
import { useWidth } from "../utils/use_width";
import Script from "next/script";
import RememberTheme from "./remember_theme";
import Players from "./players/players";
import UpNext from "./up_next";
import Navigation from "./navigation";
import styles from "./layout.module.scss";
import dynamic from "next/dynamic";
import { Chat } from "./chat";

const Clock = dynamic(() => import("./clock/clock"), { ssr: false });

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
				<Chat />
				{width < 1000 ? <Clock /> : undefined}
			</div>
			{width >= 1000 ? <Clock /> : undefined}
			<UpNext />
			<Navigation />
			{children}
		</>
	);
}
