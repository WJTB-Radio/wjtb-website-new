"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { DayOfWeek, formatDay, formatTimes, getNYCTime, getNYCWeekday, getNYCWeekdayString, getWeekdayString } from "../utils/time";
import styles from "./schedule.module.scss";
import useSWR from "swr";
import { jsonFetcher } from "../utils/fetchers";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Show = {name: string, desc: string, hosts: string, poster: string, start_time: number, end_time: number, is_running: number};
type DaySchedule = {day: DayOfWeek, shows: Array<Show>};

export default function Schedule() {
	const [, forceUpdate] = useReducer(x => x + 1, 0);
	
	let playingShow: Show | undefined;
	let nextShow: Show | undefined;
	let nextShowDay: number | undefined;

	let computed: Array<React.JSX.Element> = [];
	const currentDay = getNYCWeekday();
	const time = getNYCTime();
	for(let i = 0; i < 7; i++) {
		let d = (currentDay+i)%5;
		// this for loop always runs the same number of times, so we can disable the linter rule
		let {data, error}: {data: DaySchedule | undefined, error: boolean | undefined} =
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useSWR(`https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/${getWeekdayString(d)}.json`, jsonFetcher);
		if(!data || error) {
			continue;
		}
		if(d < 0) {
			continue; // weekend
		}
		if(i == 0) {
			data = structuredClone(data);
			data.shows = data.shows.filter((show) => show.end_time > time);
		}
		const dayString = data.day;
		if(data.shows.length != 0) {
			computed.push(
				<tbody key={i+"day"}>
					<tr className={styles.day}>
						<th>{formatDay(data.day)}</th>
					</tr>
				</tbody>
			);
		}
		if(i == 0 && currentDay >= 0) {
			playingShow = data.shows.find((show) => {
				return show.start_time <= time && show.end_time > time;
			});
		}
		if(!nextShow) {
			nextShow = data.shows.find((show) => {
				return show.start_time >= time || d > currentDay;
			});
			if(nextShow) {
				nextShowDay = d;
			}
		}
		computed = computed.concat(data.shows.map(show =>
			<tbody key={show.name+i} className={`${styles.show_container} 
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

	// update when the playing show should change
	useEffect(() => {
		let updateTime: number | undefined;
		if(playingShow) {
			updateTime = (playingShow.end_time-time)*1000+1000;
		} else if(nextShow && nextShowDay) {
			updateTime = (nextShow.start_time-time+(nextShowDay-currentDay)*(24*60*60))*1000+1000;
		}
		if(updateTime) {
			const timeout = window.setTimeout(() => {
				forceUpdate();
			}, updateTime);
			return () => {
				window.clearTimeout(timeout);
			};
		}
	});

	const path = usePathname();
	let hide_on_mobile = !["/", "/shows/"].includes(path);

	return (
		<div className={`${styles.container} ${hide_on_mobile?styles.hide_on_mobile:undefined}`} tabIndex={-1}>
			{computed.length == 0 ?
				<div className={styles.no_shows}>
					<p>There aren&apos;t any radio shows scheduled right now. Stay tuned for our show schedule.</p>
					<p>If you would like to host a show, you can <Link href="/join">become a member</Link>.</p>
				</div>
				:
				<table className={styles.table}>
					{computed}
				</table>
			}
		</div>
	);
}