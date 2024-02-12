"use client";

import { useEffect, useRef, useState } from "react";
import { DayOfWeek, formatDay, formatTimes, getNYCTime, getNYCWeekday, getNYCWeekdayString, getWeekdayString } from "./utils/time";
import styles from "./schedule.module.scss";
import useSWR from "swr";

type Show = {name: string, desc: string, hosts: string, poster: string, start_time: number, end_time: number, is_running: number};
type DaySchedule = {day: DayOfWeek, shows: Array<Show>};

export default function Schedule() {
	const [schedule, setSchedule] = useState<Array<React.JSX.Element>>([]);
	const scheduleData = useRef<Array<DaySchedule | null>>([]);

	useEffect(() => {
		function fetchedDay(idx: number, data: DaySchedule) {
			data.shows = [
				{
					"name":"Music Time!",
					"desc":"Music Time! is a show where DJ Music Man plays some music!<br>This is a new line!",
					"hosts":"DJ Music Man",
					"poster":"https://website-we-are-hotlinking.com/poster5.jpg",
					"start_time":61200, // in seconds from the start of the day
					"end_time":64800,
					"is_running":1, // 1 means true
				},
				{
					"name":"Talking Time!",
					"desc":"Talking Time! is a show where Jose and Maria talk about their feelings!<br>This is a new line!",
					"hosts":"Jose and Maria",
					"poster":"https://website-we-are-hotlinking.com/poster8.jpg",
					"start_time":54000, // in seconds from the start of the day
					"end_time":57600,
					"is_running":0, // 0 means false
				}
			];
			if(data.day == getNYCWeekdayString()) {
				const time = getNYCTime();
				data.shows = data.shows.filter((show) => show.end_time > time);
			}
			scheduleData.current[idx] = data;
			computeSchedule();
		}

		const currentDay = getNYCWeekday();
		scheduleData.current = [];
		for(let i = 0; i < 5; i++) {
			scheduleData.current.push(null);
			let d = (currentDay+i)%5;
			fetch(`https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/${getWeekdayString(d)}.json`).then((response) => {
				response.json().then(fetchedDay.bind(null, i), fetchFail);
			}, fetchFail);
		}
	}, []);

	function computeSchedule() {
		const time = getNYCTime();
		let computed: Array<React.JSX.Element> = [];
		for(let daySchedule of scheduleData.current) {
			if(daySchedule == null) {
				continue;
			}
			if(daySchedule.shows.length == 0) {
				continue;
			}
			computed.push(
				<tbody>
					<tr className={styles.day}>
						<th>{formatDay(daySchedule.day)}</th>
					</tr>
				</tbody>
			);
			const dayString = daySchedule.day;
			const currentDay = getNYCWeekdayString() == dayString;
			computed = computed.concat(daySchedule.shows.map(show =>
				<tbody key={show.name+dayString} className={`${styles.show_container} 
						${(show.start_time <= time && show.end_time > time && currentDay && show.is_running) && styles.playing}
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
		setSchedule(computed);
	}

	function fetchFail() {
		// failed to fetch
		console.log("failed");
	}

	return (
		<div className={styles.container} tabIndex={-1}>
			<table className={styles.table}>
				{schedule}
			</table>
		</div>
	);
}