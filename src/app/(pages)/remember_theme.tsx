"use client";

import { useEffect } from "react";
import useCookie from "react-use-cookie";
import { defaultTheme, setTheme, themes } from "./themes/themes";

export default function RememberTheme() {
	let [themeCookie, _setThemeCookie] = useCookie("theme", defaultTheme);
	useEffect(() => {
		setTheme(themeCookie as keyof typeof themes, null);
	}, [themeCookie]);
	return <></>;
}
