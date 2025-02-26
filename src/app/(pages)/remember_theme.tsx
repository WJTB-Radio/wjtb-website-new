"use client";

import { useEffect } from "react";
import { defaultTheme, setTheme, themes } from "./themes/themes";
import { useLocalStorage } from "usehooks-ts";

export default function RememberTheme() {
	let [themeCookie] = useLocalStorage("theme", defaultTheme, {
		initializeWithValue: false,
	});
	useEffect(() => {
		setTheme(themeCookie as keyof typeof themes);
	}, [themeCookie]);
	return <></>;
}
