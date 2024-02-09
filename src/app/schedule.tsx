"use client";

import { useEffect, useRef, useState } from "react";
import { DayOfWeek, formatDay, formatTimes, getNYCTime, getNYCWeekday, getNYCWeekdayString, getWeekdayString } from "./utils/time";
import styles from "./schedule.module.scss";

type Show = {name: string, desc: string, hosts: string, poster: string, start_time: number, end_time: number, is_running: number};
type DaySchedule = {day: DayOfWeek, shows: Array<Show>};

export default function Schedule() {
	const [schedule, setSchedule] = useState<Array<React.JSX.Element>>([]);
	const scheduleData = useRef<Array<DaySchedule | null>>([]);

	useEffect(() => {
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

	function fetchedDay(idx: number, data: DaySchedule) {
		console.log(data);
		data.shows = [
			{
				"name":"Music Time!",
				"desc":"Music Time! is a show where DJ Music Man plays some music!<br>This is a new line!",
				"hosts":"DJ Music Man",
				"poster":"https://website-we-are-hotlinking.com/poster5.jpg",
				"start_time":50400, // in seconds from the start of the day
				"end_time":54000,
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
		for(let i = 0; i < 3; i++) {
			data.shows = data.shows.concat(data.shows);
		}
		if(data.day == getNYCWeekdayString()) {
			const time = getNYCTime();
			data.shows = data.shows.filter((show) => show.end_time > time);
		}
		scheduleData.current[idx] = data;
		console.log(scheduleData.current);
		console.log("computing");
		computeSchedule();
	}

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
				<tr className={styles.day}>
					<th>{formatDay(daySchedule.day)}</th>
				</tr>
			);
			computed = computed.concat(daySchedule.shows.map(show =>
				<tr className={`${(show.start_time <= time && show.end_time < time) && styles.running} ${styles.show}`}>
					<td>
						{formatTimes(show.start_time, show.end_time)}
					</td>
					<td>
						{show.name}
					</td>
				</tr>
			));
		}
		console.log(computed);
		setSchedule(computed);
	}

	function fetchFail() {
		// failed to fetch
		console.log("failed");
	}

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				{schedule}
			</table>
		</div>
	);
}