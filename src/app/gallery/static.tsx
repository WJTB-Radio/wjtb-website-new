import styles from "./gallery.module.scss";

export type Photo = {image: string, date_taken: string, caption: string};

export const endpoint = "https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/gallery.json";

export default async function StaticGallery() {
	const data: {photos: Photo[]} = await (await fetch(endpoint)).json();
	return renderGallery(data.photos);
}

export function renderGallery(photos: Photo[]) {
	return (
		<div>
			<h1 className={styles.title}>Gallery</h1>
			<div className={styles.gallery}>
				{photos.map((photo, index) => (
					<div className={styles.item} key={index}>
						<img className={styles.image} src={photo.image}></img>
						<p className={styles.caption}>{photo.caption}</p>
						<p className={styles.date}>{photo.date_taken}</p>
					</div>
				))}
			</div>
		</div>
	);
}