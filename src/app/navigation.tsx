import Link from "next/link";
import styles from "./navigation.module.scss";

export default function Navigation() {
	return (
		<nav className={styles.nav}>
			<Link href={"/"}>Home</Link>
			<Link href={"/request"}>Request Us</Link>
			<Link href={"/join"}>Become a DJ</Link>
			<Link href={"/variety"}>Variety Hour</Link>
			<Link href={"/gallery"}>Gallery</Link>
			<Link href={"/staff"}>Staff</Link>
		</nav>
	);
}