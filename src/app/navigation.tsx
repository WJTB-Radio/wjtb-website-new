"use client";

import Link from "next/link";
import styles from "./navigation.module.scss";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const path = usePathname();
	return (
		<nav className={styles.nav}>
			<Link href={"/"} className={(path == '/') ? styles.selected: undefined}>Home</Link>
			<Link href={"/request"} className={(path == '/request/') ? styles.selected: undefined}>Request Us</Link>
			<Link href={"/join"} className={(path == '/join/') ? styles.selected: undefined}>Become a DJ</Link>
			<Link href={"/variety"} className={(path == '/variety/') ? styles.selected: undefined}>Variety Hour</Link>
			<Link href={"/gallery"} className={(path == '/gallery/') ? styles.selected: undefined}>Gallery</Link>
			<Link href={"/staff"} className={(path == '/staff/') ? styles.selected: undefined}>Staff</Link>
		</nav>
	);
}