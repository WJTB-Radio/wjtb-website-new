"use client";

import useSWR from "swr";
import { jsonFetcher } from "../utils/fetchers";
import StaticGallery, { Photo, endpoint, renderGallery } from "./static";

export default function Gallery() {
	const {data, error}: {data: {photos: Photo[]}, error: boolean | undefined} = useSWR(endpoint, jsonFetcher);
	if(!data || error) {
		return <StaticGallery />
	}
	return renderGallery(data.photos);
}