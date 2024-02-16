"use client";

import Link from "next/link";
import styles from "./navigation.module.scss";
import { usePathname, useRouter } from "next/navigation";

function NavLink(props: {href: string, currentPath: string, children: React.ReactNode}) {
	return (
		<Link href={props.href} className={(props.currentPath == props.href) ? styles.selected: undefined}>
			{props.children}
		</Link>
	);
}

export default function Navigation() {
	const path = usePathname();
	return (
		<nav className={styles.nav}>
			<NavLink href={"/"} currentPath={path}>Home</NavLink>
			<NavLink href={"/request/"} currentPath={path}>Request Us</NavLink>
			<NavLink href={"/shows/"} currentPath={path}>Shows</NavLink>
			<NavLink href={"/join/"} currentPath={path}>Become a DJ</NavLink>
			<NavLink href={"/variety/"} currentPath={path}>Variety Hours</NavLink>
			<NavLink href={"/past-events/"} currentPath={path}>Past Events</NavLink>
			<NavLink href={"/gallery/"} currentPath={path}>Gallery</NavLink>
			<NavLink href={"/staff/"} currentPath={path}>Staff</NavLink>
		</nav>
	);
}