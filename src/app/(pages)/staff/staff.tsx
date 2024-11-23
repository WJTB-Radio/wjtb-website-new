"use client";

import useSWR from "swr";
import { StaffType } from "./page";
import styles from "./staff.module.scss";
import { jsonFetcher } from "@/app/utils/fetchers";
import { staffEndpoint } from "@/app/utils/endpoints";

export function Staff(props: { staff: StaffType[] }) {
	const {
		data,
		error,
	}: { data: { staff: StaffType[] }; error: boolean | undefined } = useSWR(
		staffEndpoint,
		jsonFetcher,
	);
	let staff: StaffType[] = error || !data ? props.staff : data.staff;

	return (
		<div className={styles.main_content_minimal}>
			<h1 className={styles.title}>Staff</h1>
			<div className={styles.container}>
				{staff.map((staff) => (
					<div className={styles.staff} key={staff.name}>
						<div className={styles.image}>
							<img
								src={staff.image}
								alt={`Photo of ${staff.name}`}
							></img>
						</div>
						<h2 className={styles.name}>{staff.name}</h2>
						<h2 className={styles.position}>{staff.position}</h2>
						<p className={styles.flavor}>{staff.flavor}</p>
					</div>
				))}
			</div>
		</div>
	);
}
