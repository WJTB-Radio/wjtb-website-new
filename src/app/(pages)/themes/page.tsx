"use client";

import styles from "./themes.module.scss";
import useCookie from "react-use-cookie";
import { defaultTheme, setTheme, themes } from "./themes";

export default function Themes() {
	const [themeCookie, setThemeCookie] = useCookie("theme", defaultTheme);
	return (
		<div className={styles.container}>
			{(Object.keys(themes) as (keyof typeof themes)[]).map((id) => (
				<div key={id} className={styles.theme} style={themes[id].style}>
					<button
						onClick={setTheme.bind(null, id, setThemeCookie)}
						className={styles.button}
					>
						{themes[id].name}
					</button>
					<p>{themes[id].desc}</p>
				</div>
			))}
		</div>
	);
}
