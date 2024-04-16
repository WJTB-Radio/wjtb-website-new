"use client";

import useSWR from "swr";
import { jsonFetcher } from "../../utils/fetchers";
import StaticEvents, { renderEvents, EventType, endpoint } from "./static";

export default function Event() {
	let events: EventType[] = [];

	const {data, error}: {data: {events: EventType[]}, error: boolean | undefined} = useSWR(endpoint, jsonFetcher);
	if(error || !data) {
		return (
			<StaticEvents />
		);
	}
	events = data.events;

	return renderEvents(events);
}