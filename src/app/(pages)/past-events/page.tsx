import { Events } from "./past_events";
import { fetchStrapi } from "@/app/utils/strapi";

export default async function EventPage() {
	return <Events events={await fetchStrapi("past-events")} />;
}
