"use client";

import { useEffect, useRef, useState } from "react";
import { DayOfWeek, formatDay, formatTimes, getNYCTime, getNYCWeekday, getNYCWeekdayString, getWeekdayString } from "./utils/time";
import styles from "./schedule.module.scss";
import useSWR from "swr";
import { jsonFetcher } from "./utils/fetchers";

type Show = {name: string, desc: string, hosts: string, poster: string, start_time: number, end_time: number, is_running: number};
type DaySchedule = {day: DayOfWeek, shows: Array<Show>};

export default function Schedule() {
	let computed: Array<React.JSX.Element> = [];
	const currentDay = getNYCWeekday();
	const time = getNYCTime();
	for(let i = 0; i < 7; i++) {
		let d = (currentDay+i)%5;
		let {data, error}: {data: DaySchedule | undefined, error: boolean | undefined} = useSWR(`https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/${getWeekdayString(d)}.json`, jsonFetcher);
		if(!data || error) {
			continue;
		}
		if(i == 0) {
			data = structuredClone(data);
			data.shows = data.shows.filter((show) => show.end_time > time);
		}
		const dayString = data.day;
		computed.push(
			<tbody>
				<tr className={styles.day}>
					<th>{formatDay(data.day)}</th>
				</tr>
			</tbody>
		);
		computed = computed.concat(data.shows.map(show =>
			<tbody key={show.name+dayString} className={`${styles.show_container} 
					${(show.start_time <= time && show.end_time > time && i == 0 && show.is_running) && styles.playing}
					${!show.is_running && styles.cancelled}`}>
				<tr className={`${styles.show}`}>
					<td className={styles.times}>
						{formatTimes(show.start_time, show.end_time)}
					</td>
					<td>
						{show.name}
					</td>
				</tr>
			</tbody>
		));
	}

	return (
		<div className={styles.container} tabIndex={-1}>
			<table className={styles.table}>
				{computed}
			</table>
		</div>
	);
}