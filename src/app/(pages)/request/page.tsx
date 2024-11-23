import styles from "./request.module.scss";

export default function Request() {
	return (
		<div className={styles.main_content}>
			<iframe
				className={styles.iframe}
				src="https://docs.google.com/forms/d/e/1FAIpQLSfnJ8D4w8mjq953Q-ifIwtloCi63UmZXfnIKPcXV6F9QXTIbg/viewform?embedded=true"
			/>
		</div>
	);
}
