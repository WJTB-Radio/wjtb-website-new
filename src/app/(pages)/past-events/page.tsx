"use client";

import useSWR from "swr";
import { jsonFetcher } from "../../utils/fetchers";
import StaticEvents, { renderEvents, EventType, endpoint } from "./static";

export default function Event() {
	let events: EventType[] = [];

	// this for loop always runs the same number of times, so we can disable the linter rule
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const {data, error}: {data: {events: EventType[]}, error: boolean | undefined} = useSWR(endpoint, jsonFetcher);
	if(error || !data) {
		return (
			<StaticEvents />
		);
	}
	events = data.events;

	return renderEvents(events);
}