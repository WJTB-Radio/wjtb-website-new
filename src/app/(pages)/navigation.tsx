"use client";

import Link from "next/link";
import styles from "./navigation.module.scss";
import { usePathname } from "next/navigation";
import { Content, Root, Trigger } from "@radix-ui/react-collapsible";
import { useCallback, useEffect, useState } from "react";
import { useWidth } from "../utils/use_width";

function NavLink(props: {
	href: string;
	currentPath: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={props.href}
			onClick={props.onClick}
			className={`${styles.nav_link} ${
				props.currentPath == props.href ? styles.selected : undefined
			}`}
		>
			{props.children}
		</Link>
	);
}

const pathNames: { [id: string]: string } = {
	"/": "Home",
	"/request/": "Request Us",
	"/shows/": "Shows",
	"/join/": "Become a DJ",
	"/variety/": "Variety Hours",
	"/past-events/": "Past Events",
	"/gallery/": "Gallery",
	"/staff/": "Staff",
	"/contact/": "Contact Us",
	"/press-kit/": "Press Kit",
	"/themes/": "Themes",
};

function NavLinks(props: { onLinkClicked: () => void; currentPath: string }) {
	return Object.keys(pathNames).map((path) => {
		return (
			<NavLink
				key={path}
				href={path}
				onClick={props.onLinkClicked}
				currentPath={props.currentPath}
			>
				{pathNames[path]}
			</NavLink>
		);
	});
}

export default function Navigation() {
	const currentPath = usePathname();
	const [open, setOpen] = useState(false);
	const width = useWidth().width;

	const onLinkClicked = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<nav className={styles.nav}>
			{width < 1000 ? (
				<Root
					open={open}
					onOpenChange={setOpen}
					className={styles.collabsible_root}
				>
					<Trigger asChild>
						<button className={styles.collabsible_button}>
							{pathNames[currentPath]}
						</button>
					</Trigger>
					<Content
						className={styles.collapsible_content}
						hidden={false}
					>
						<NavLinks
							onLinkClicked={onLinkClicked}
							currentPath={currentPath}
						/>
					</Content>
				</Root>
			) : (
				<NavLinks
					onLinkClicked={onLinkClicked}
					currentPath={currentPath}
				/>
			)}
		</nav>
	);
}
