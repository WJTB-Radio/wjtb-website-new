import styles from "./loading.module.scss";

export function Spinner() {
	return <div className={styles.spinner}></div>;
}

export default function Loading() {
	return (
		<div className={styles.loading}>
			Loading...
			<Spinner />
		</div>
	);
}
