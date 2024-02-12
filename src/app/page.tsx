"use client";

import StaticHome, { Photo, galleryEndpoint, renderHome } from "./static_home";
import useSWR from "swr";
import { jsonFetcher } from "./utils/fetchers";

export default function Home() {
	const {data, error}: {data: {photos: Photo[]}, error: boolean | undefined} = useSWR(galleryEndpoint, jsonFetcher);
	if(!data || error) {
		return <StaticHome />
	}
	return renderHome(data.photos);
}