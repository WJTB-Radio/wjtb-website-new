"use client";

import styles from "./staff.module.scss";
import { strapiImageUrl, StrapiResponse, useStrapi } from "@/app/utils/strapi";

export function Staff(props: { staff: StrapiResponse<"staffs">["data"] }) {
	const { data, error } = useStrapi("staffs");
	const staff = error || !data ? props.staff : data.data;
	return (
		<div className={styles.main_content_minimal}>
			<h1 className={styles.title}>Staff</h1>
			<div className={styles.container}>
				{staff.map((staff) => (
					<div className={styles.staff} key={staff.name}>
						<div className={styles.image}>
							<img
								src={strapiImageUrl(staff.image.url)}
								alt={`Photo of ${staff.name}`}
							></img>
						</div>
						<h2 className={styles.name}>{staff.name}</h2>
						<h2 className={styles.position}>{staff.title}</h2>
						<p className={styles.flavor}>{staff.flavor}</p>
					</div>
				))}
			</div>
		</div>
	);
}
