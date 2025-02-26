import { Shows } from "./shows";
import { fetchShows, showsToDays } from "@/app/utils/shows";

export default async function ShowsPage() {
	let days = showsToDays(await fetchShows());
	return <Shows days={days} />;
}
