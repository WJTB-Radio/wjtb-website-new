"use client";

import { Photo } from "@/app/utils/types";
import styles from "./gallery.module.scss";
import { jsonFetcher } from "@/app/utils/fetchers";
import useSWR from "swr";
import { galleryEndpoint } from "@/app/utils/endpoints";

export function Gallery(props: { photos: Photo[] }) {
	const {
		data,
		error,
	}: { data: { photos: Photo[] }; error: boolean | undefined } = useSWR(
		galleryEndpoint,
		jsonFetcher,
	);
	let photos: Photo[] = !data || error ? props.photos : data.photos;
	return (
		<div className={styles.main_content_minimal}>
			<h1 className={styles.title}>Gallery</h1>
			<div className={styles.gallery}>
				{photos.map((photo, index) => (
					<div className={styles.item} key={index}>
						<img
							className={styles.image}
							src={photo.image}
							alt={
								photo.caption != ""
									? photo.caption
									: "Photo has no caption."
							}
						></img>
						<p className={styles.caption}>{photo.caption}</p>
						<p className={styles.date}>{photo.date_taken}</p>
					</div>
				))}
			</div>
		</div>
	);
}
