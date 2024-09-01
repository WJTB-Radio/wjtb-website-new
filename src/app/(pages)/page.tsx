import { galleryTopEndpoint } from "../utils/endpoints";
import { Photo } from "../utils/types";
import { Home } from "./home";

export default async function HomePage() {
	const data: {photos: Photo[]} = await (await fetch(galleryTopEndpoint)).json();
	return <Home photos={data.photos}/>
}
