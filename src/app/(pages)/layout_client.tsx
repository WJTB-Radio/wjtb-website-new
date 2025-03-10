"use client";

import "./globals.scss";
import { ReactNode, useMemo, useRef } from "react";
import { useWidth } from "../utils/use_width";
import Script from "next/script";
import RememberTheme from "./remember_theme";
import Players from "./players/players";
import Schedule from "./schedule";
import Navigation from "./navigation";
import styles from "./layout.module.scss";
import dynamic from "next/dynamic";
import { Chat } from "./chat";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

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
	const panels = useRef<HTMLElement>(null);
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
				<TabGroup
					className={styles.tabGroup}
					onChange={(idx) => {
						if (!panels.current) return;
						if (idx == 1) {
							panels.current.scrollTop = 0;
						}
					}}
				>
					<TabList className={styles.tabList}>
						<Tab className={styles.tab}>chat</Tab>
						<Tab className={styles.tab}>up next</Tab>
					</TabList>
					<TabPanels className={styles.tabPanels} ref={panels}>
						<TabPanel>
							<Chat />
						</TabPanel>
						<TabPanel>
							<Schedule />
						</TabPanel>
					</TabPanels>
				</TabGroup>
				{width < 1000 ? <Clock /> : undefined}
				{width < 1000 ? <Navigation /> : undefined}
			</div>
			{width >= 1000 ? <Navigation /> : undefined}
			{width >= 1000 ? <Clock /> : undefined}
			{children}
		</>
	);
}
