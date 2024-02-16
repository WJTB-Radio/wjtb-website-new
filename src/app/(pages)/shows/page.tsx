"use client";

import { getWeekdayString } from "@/app/utils/time";
import StaticShows, { Day, Show, renderShows } from "./static";
import { jsonFetcher } from "@/app/utils/fetchers";
import useSWR from "swr";
import { MutableRefObject, useRef } from "react";

export default function Shows() {
	let days: Day[] = [];
	let fetched = true;
	for(let i = 0; i < 5; i++) {
		const dayName = getWeekdayString(i);
		// this for loop always runs the same number of times, so we can disable the linter rule
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const {data, error}: {data: {day: string, shows: Show[]}, error: boolean | undefined} = useSWR(`https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/${dayName}.json`, jsonFetcher);
		if(!data || error || !fetched) {
			fetched = false;
			// we cant early return because we must call useSWR the same number of times each render
			continue;
		}
		const day: Day = {
			day: i,
			dayName: data.day,
			shows: data.shows,
		};
		days.push(day);
	}
	let dayStarts: MutableRefObject<HTMLDivElement | null>[] = [];
	for(let i = 0; i < 5; i++) {
		// this for loop always runs the same number of times, so we can disable the linter rule
		// eslint-disable-next-line react-hooks/rules-of-hooks
		dayStarts.push(useRef<HTMLDivElement>(null));
	}
	if(!fetched) {
		return <StaticShows />;
	}
	return renderShows(days, dayStarts);
}
