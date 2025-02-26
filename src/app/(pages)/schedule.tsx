"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import {
	dateFromTime,
	DayOfWeek,
	formatDay,
	formatTimes,
	getNYCTimeSeconds,
	getNYCWeekday,
	getNYCWeekdayString,
	getWeekdayString,
} from "../utils/time";
import styles from "./schedule.module.scss";
import useSWR from "swr";
import { jsonFetcher } from "../utils/fetchers";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWidth } from "../utils/use_width";
import { Show, showsToDays, useShows } from "../utils/shows";

export default function Schedule() {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	let playingShow: Show | undefined;
	let nextShow: Show | undefined;
	let nextShowDay: number | undefined;

	let computed: Array<React.JSX.Element> = [];
	const currentDay = getNYCWeekday();
	const time = getNYCTimeSeconds();
	const shows = useShows();
	const days = showsToDays(shows.data ?? []);
	for (let i = 0; i < 7; i++) {
		let d = (currentDay + i) % 5;
		if (d < 0) {
			continue; // weekend
		}
		let data = days[d];
		if (i == 0) {
			data = data.filter((show) => show.end_time > time);
		}
		const dayString = getWeekdayString(d);
		if (data.length != 0) {
			computed.push(
				<tbody key={i + "day"}>
					<tr className={styles.day}>
						<th>{formatDay(dayString)}</th>
					</tr>
				</tbody>
			);
		}
		if (i == 0 && currentDay >= 0) {
			playingShow = data.find((show) => {
				return show.start_time <= time && show.end_time > time;
			});
		}
		if (!nextShow) {
			nextShow = data.find((show) => {
				return show.start_time >= time || d > currentDay;
			});
			if (nextShow) {
				nextShowDay = d;
			}
		}
		computed = computed.concat(
			data.map((show) => (
				<tbody
					key={show.name + i}
					className={`${styles.show_container} 
					${
						show.start_time <= time &&
						show.end_time > time &&
						i == 0 &&
						!show.cancelled &&
						styles.playing
					}
					${show.cancelled && styles.cancelled}`}
				>
					<tr className={`${styles.show}`}>
						<td className={styles.times}>
							{formatTimes(
								dateFromTime(show.start_time),
								dateFromTime(show.end_time)
							)}
						</td>
						<td>{show.name}</td>
					</tr>
				</tbody>
			))
		);
	}

	// update when the playing show should change
	useEffect(() => {
		let updateTime: number | undefined;
		if (playingShow) {
			updateTime = (playingShow.end_time - time) * 1000 + 1000;
		} else if (nextShow && nextShowDay) {
			updateTime =
				(nextShow.start_time -
					time +
					(nextShowDay - currentDay) * (24 * 60 * 60)) *
					1000 +
				1000;
		}
		if (updateTime) {
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

	const width = useWidth().width;

	if (computed.length == 0 && width < 1000) {
		return <></>;
	}

	return (
		<div
			className={`${styles.container} ${
				hide_on_mobile ? styles.hide_on_mobile : undefined
			}`}
			tabIndex={-1}
		>
			{computed.length == 0 && shows.data ? (
				<div className={styles.no_shows}>
					<p>
						There aren&apos;t any radio shows scheduled right now.
						Stay tuned for our show schedule.
					</p>
					<p>
						If you would like to host a show, you can{" "}
						<Link href="/join">become a member</Link>.
					</p>
				</div>
			) : (
				<table className={styles.table}>{computed}</table>
			)}
		</div>
	);
}
