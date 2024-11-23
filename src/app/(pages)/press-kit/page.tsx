import { CSSProperties } from "react";
import styles from "./press_kit.module.scss";
import { themes } from "../themes/themes";

export default function PressKit() {
	let basePath = "/";
	if (process.env.NEXT_PUBLIC_BASE_PATH != null) {
		basePath = process.env.NEXT_PUBLIC_BASE_PATH.endsWith("/")
			? process.env.NEXT_PUBLIC_BASE_PATH
			: process.env.NEXT_PUBLIC_BASE_PATH + "/";
	}
	return (
		<div className={styles.main_content}>
			<p>
				Please do not modify any of these logos. They should also not be
				used to represent you or your projects, products, or company.
			</p>
			<div className={styles.logos}>
				<Logo
					svgLink={`${basePath}img/wjtb.svg`}
					pngLink={`${basePath}img/wjtb.png`}
					name="Logo (Dark)"
					theme="dark"
				/>
				<Logo
					svgLink={`${basePath}img/wjtb_light.svg`}
					pngLink={`${basePath}img/wjtb_light.png`}
					name="Logo (Light)"
					theme="paper"
				/>
				<Logo
					svgLink={`${basePath}img/wjtb_red.svg`}
					pngLink={`${basePath}img/wjtb_red.png`}
					name="Logo (NJIT Red)"
					theme="dark"
				/>
				<Logo
					svgLink={`${basePath}img/wjtb_radio.svg`}
					pngLink={`${basePath}img/wjtb_radio.png`}
					name="Radio Logo (Dark)"
					theme="dark"
				/>
				<Logo
					svgLink={`${basePath}img/wjtb_radio_light.svg`}
					pngLink={`${basePath}img/wjtb_radio_light.png`}
					name="Radio Logo (Light)"
					theme="paper"
				/>
				<Logo
					svgLink={`${basePath}img/wjtb_radio_red.svg`}
					pngLink={`${basePath}img/wjtb_radio_red.png`}
					name="Radio Logo (NJIT Red)"
					theme="dark"
				/>
				<Logo
					svgLink={`${basePath}img/wjtb_qr.svg`}
					pngLink={`${basePath}img/wjtb_qr.png`}
					name="QR Code"
					theme="dark"
				/>
			</div>
		</div>
	);
}

function Logo(props: {
	svgLink: string;
	pngLink: string;
	name: string;
	theme: keyof typeof themes;
}) {
	return (
		<div
			className={styles.logo_container}
			style={themes[props.theme].style}
		>
			<h2>{props.name}</h2>
			<img src={props.svgLink} alt="" />
			<a href={props.svgLink} download>
				Download SVG
			</a>
			<a href={props.pngLink} download>
				Download PNG
			</a>
		</div>
	);
}
