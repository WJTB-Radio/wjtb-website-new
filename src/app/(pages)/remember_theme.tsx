"use client";

import { useEffect } from "react";
import useCookie from "react-use-cookie";
import { defaultTheme, setTheme } from "./themes/themes";

export default function RememberTheme() {
	let [themeCookie, _setThemeCookie] = useCookie("theme", defaultTheme);
	useEffect(() => {
		setTheme(themeCookie, null);
	}, [themeCookie]);
	return <></>;
}