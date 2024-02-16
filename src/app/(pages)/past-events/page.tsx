"use client";

import useSWR from "swr";
import { jsonFetcher } from "../../utils/fetchers";
import StaticEvents, { renderEvents, Event, endpoint } from "./static";

export default function Event() {
	let events: Event[] = [];
	
	const {data, error}: {data: {events: Event[]}, error: boolean | undefined} = useSWR(endpoint, jsonFetcher);
	if(error || !data) {
		return (
			<StaticEvents />
		);
	}
	events = data.events;

	return renderEvents(events);
}