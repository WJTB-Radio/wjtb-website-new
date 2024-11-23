import { pastEventsEndpoint } from "@/app/utils/endpoints";
import { Events } from "./past_events";

export type EventType = {
	name: string;
	desc: string;
	date: string;
	images: string[];
};

export default async function EventPage() {
	let events: EventType[] = [];
	const data: { events: EventType[] } = await (
		await fetch(pastEventsEndpoint)
	).json();
	return <Events events={data.events} />;
}
