"use client";

import styles from "./themes.module.scss";
import { setTheme, themes } from "./themes";
import { useLocalStorage } from "usehooks-ts";

export default function Themes() {
	const [, setThemeCookie] = useLocalStorage("theme", "dark", {
		initializeWithValue: false,
	});
	return (
		<div className={styles.container}>
			{(Object.keys(themes) as (keyof typeof themes)[]).map((id) => (
				<div key={id} className={styles.theme} style={themes[id].style}>
					<button
						onClick={() => {
							setTheme(id);
							setThemeCookie(id);
						}}
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
