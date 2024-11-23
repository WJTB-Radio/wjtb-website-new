import { Photo } from "@/app/utils/types";
import { Gallery } from "./gallery";
import { galleryEndpoint } from "@/app/utils/endpoints";

export default async function GalleryPage() {
	const data: { photos: Photo[] } = await (
		await fetch(galleryEndpoint)
	).json();
	return <Gallery photos={data.photos} />;
}
