import { CSSProperties } from "react";
import { updateItem } from "react-use-cookie";

type Theme = {name: string, desc: string, style: CSSProperties};

export const defaultTheme = "dark";

export const themes: {[id: string]: Theme}  = {
	"dark": {
		name: "Dark",
		desc: "For dimly lit rooms",
		style: {
			"--bg-color": "#0d0d0d",
			"--bg2-color": "#181818",
			"--bg3-color": "#242424",
			"--text-color": "#cfcfcf",
			"--text-shadow-color": "#696969",
			"--text-light-color": "#888888",
			"--accent-color": "#ce2328",
			"--accent-shadow-color": "#721114",
			"--accent2-color": "#eded50",
			"--iframe-bg-color": "#eeeeee",
			"font-family": "system-ui, sans-serif",
			"font-weight": "300",
		} as CSSProperties,
	},
	"paper": {
		name: "Paper",
		desc: "It's strictly business.",
		style: {
			"--bg-color": "#ffffff",
			"--bg2-color": "#f5f5f5",
			"--bg3-color": "#f0f0f0",
			"--text-color": "#111111",
			"--text-highlight-color": "#624848",
			"--text-shadow-color": "#18181878",
			"--text-light-color": "#444444",
			"--accent-color": "#9b7c7c",
			"--accent-shadow-color": "#4d3233",
			"--accent2-color": "#236ece",
			"--iframe-bg-color": "#eeeeee00",
			"font-family": "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
			"font-weight": "300",
		} as CSSProperties,
	},
	"trees": {
		name: "trees and sun",
		desc: "love from the theme",
		style: {
			"--bg-color": "#a2c9ea",
			"--bg2-color": "#8bb6de",
			"--bg3-color": "#beba71",
			"--text-color": "#ffffff",
			"--text-highlight-color": "#e6f3ff",
			"--text-shadow-color": "#ffe5ba",
			"--text-light-color": "#ddd",
			"--accent-color": "#ffe5ba",
			"--accent-shadow-color": "#ffb446",
			"--accent2-color": "#ffbe59",
			"--iframe-bg-color": "#eeeeee00",
			"font-family": "system-ui, sans-serif",
			"font-weight": "300",
		} as CSSProperties,
	},
	"strawberry": {
		name: "Strawberry Ice Cream",
		desc: "strawberry ice cream :D",
		style: {
			"--bg-color": "#ffdbe8",
			"--bg2-color": "#ffcadd",
			"--bg3-color": "#ff9dcf",
			"--text-color": "#000",
			"--text-highlight-color":"#754f5c",
			"--text-shadow-color": "#18181878",
			"--text-light-color": "#444444",
			"--accent-color": "#d32153",
			"--accent-shadow-color": "#721611",
			"--accent2-color": "#d32153",
			"--iframe-bg-color": "#eeeeee00",
			"font-family": "system-ui, sans-serif",
			"font-weight": "300",
		} as CSSProperties,
	},
	"autumn": {
		name: "Autumn",
		desc: "pumpkin spice 🍂 🎃",
		style: {
			"--bg-color": "#8e2610",
			"--bg2-color": "#aa3f0f",
			"--bg3-color": "#d55308",
			"--text-color": "#f0efb9",
			"--text-highlight-color": "#f2f2da",
			"--text-shadow-color": "#493615",
			"--text-light-color": "#efad26",
			"--accent-color": "#86b26b",
			"--accent-shadow-color": "#493615",
			"--accent2-color": "#eded50",
			"--iframe-bg-color": "#efad26",
			"font-family": "'garamond', serif",
			"font-weight": "300",
		} as CSSProperties,
	},
	"spooky": {
		name: "Spooky",
		desc: "OooOoooOooooOooO!",
		style: {
			"--bg-color": "#1c1b21",
			"--bg2-color": "#252433",
			"--bg3-color": "#362c3c",
			"--text-color": "#ea8e19",
			"--text-highlight-color": "#eaa44b",
			"--text-shadow-color": "#696969",
			"--text-light-color": "#888888",
			"--accent-color": "#9731eb",
			"--accent-shadow-color": "#348c28",
			"--accent2-color": "#3bee22",
			"--iframe-bg-color": "#eeeeee",
			"font-family": "'modern antiqua', cursive",
			"font-weight": "300",
		} as CSSProperties,
	},
	"winter": {
		name: "Winter",
		desc: "tastes like snow.",
		style: {
			"--bg-color": "#06162f",
			"--bg2-color": "#0e244d",
			"--bg3-color": "#112c62",
			"--text-color": "#cfceff",
			"--text-highlight-color": "#9f9fe6",
			"--text-shadow-color": "#717171",
			"--text-light-color": "#d993e3",
			"--accent-color": "#f2ecb9",
			"--accent-shadow-color": "#5b5730",
			"--accent2-color": "#ef8af2",
			"--iframe-bg-color": "#eeeeee",
			"font-family": "Didot, 'Bodoni MT', 'Noto Serif Display', 'URW Palladio L', P052, Sylfaen, serif",
			"font-weight": "500",
		} as CSSProperties,
	},
};

const extraStyles: CSSProperties = {
	"transition": "background-color 0.15s ease-out",
};

function cssPropToString(prop: CSSProperties) {
	return Object.keys(prop).map((key) => {
		const val = (prop as {[k: string]: string})[key];
		return `${key}:${val};`;
	}).join("\n");
}

export function setTheme(id: string, setThemeCookie: updateItem | null) {
	if(!Object.hasOwn(themes, id)) {
		return;
	}
	let body;
	if(document) {
		body = document.getElementsByTagName("body").item(0);
	}
	if(body) {
		// typescript doesn't know about this feature?
		(body.style as unknown as string) = cssPropToString(extraStyles)+cssPropToString(themes[id].style);
	}
	if(!setThemeCookie) {
		return;
	}
	setThemeCookie(id, {
		// we need this so the browser doesn't delete the theme cookie when the session ends
		days: 999999999999999,
	});
}