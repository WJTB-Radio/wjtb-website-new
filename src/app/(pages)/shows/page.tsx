import { getWeekdayString } from "@/app/utils/time";
import { Shows } from "./shows";

export type Show = {
	name: string;
	desc: string;
	hosts: string;
	poster: string;
	start_time: number;
	end_time: number;
	day: number;
	is_running: number;
};
export type Day = { day: number; dayName: string; shows: Show[] };

export default async function ShowsPage() {
	let days: Day[] = [];
	for (let i = 0; i < 5; i++) {
		const dayName = getWeekdayString(i);
		const data: { day: string; shows: Show[] } = await (
			await fetch(
				`https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/${dayName}.json`,
			)
		).json();
		const day: Day = {
			day: i,
			dayName: data.day,
			shows: data.shows,
		};
		days.push(day);
	}
	return <Shows days={days} />;
}
