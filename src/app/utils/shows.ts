import useSWR from "swr";
import { fetchStrapi, StrapiDefaults, StrapiShow } from "./strapi";
import { parseStrapiTime } from "./time";

export type Show =
	& {
		[K in keyof StrapiShow]: K extends "start_time" ? number
			: K extends "end_time" ? number
			: StrapiShow[K];
	}
	& StrapiDefaults;

// strapi enums aren't great ......
type StrapiWeekday =
	| "_0_monday"
	| "_1_tuesday"
	| "_2_wednesday"
	| "_3_thursday"
	| "_4_friday";

function parseStrapiWeekday(name: StrapiWeekday) {
	switch (name) {
		case "_0_monday":
			return 0;
		case "_1_tuesday":
			return 1;
		case "_2_wednesday":
			return 2;
		case "_3_thursday":
			return 3;
		case "_4_friday":
			return 4;
	}
}

export async function fetchShows(): Promise<Show[]> {
	return (await fetchStrapi("shows")).data.map((show) => {
		const dayId = parseStrapiWeekday(show.day.day as StrapiWeekday);
		return {
			...show,
			day: { id: dayId, day: show.day.day },
			start_time: parseStrapiTime(show.start_time),
			end_time: parseStrapiTime(show.end_time),
		};
	});
}

export function useShows() {
	return useSWR("shows", () => fetchShows());
}

export function showsToDays(shows: Show[]): Show[][] {
	return [...Array(5).keys()].map((day) =>
		shows.filter((show) => show.day.id == day)
	);
}
