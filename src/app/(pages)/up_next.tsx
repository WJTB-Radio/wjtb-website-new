"use client";

import { CSSProperties, ReactNode, useEffect, useReducer } from "react";
import {
	dateFromTime,
	formatDay,
	formatTime,
	formatTimes,
	getNYCTimeSeconds,
	getNYCWeekday,
	getWeekdayString,
	parseWeekday,
} from "../utils/time";
import { Show, showsToDays, useShows } from "../utils/shows";
import styles from "./up_next.module.scss";

export default function UpNext() {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	let playingShow: Show | undefined;
	let nextShow: Show | undefined;
	let nextShowDay: number | undefined;

	const currentDay = getNYCWeekday();
	const time = getNYCTimeSeconds();
	const shows = useShows();
	const days = showsToDays(shows.data ?? []);
	let prevShow: Show | undefined = undefined;
	let computed: ReactNode[] = [];
	for (let i = 0; i < 7; i++) {
		let d = (currentDay + i) % 5;
		if (d < 0) {
			continue; // weekend
		}
		let data = days[d];
		if (i == 0) {
			data = data.filter((show) => show.end_time > time);
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
		const dayString = getWeekdayString(d);
		if (data.length != 0 && i != 0) {
			computed.push(
				<div key={"day" + i} className={styles.day}>
					{formatDay(dayString)}
				</div>
			);
		}
		computed = computed.concat(
			data.map((show) => {
				const playing =
					show.start_time <= time &&
					show.end_time > time &&
					i == 0 &&
					!show.cancelled;
				const upNext =
					show.start_time == playingShow?.end_time &&
					playingShow.day.day == show.day.day;
				const gapBefore =
					prevShow &&
					prevShow.end_time != show.start_time &&
					prevShow.day.day == show.day.day;
				prevShow = show;
				return (
					<div
						key={"" + show.id + i}
						className={`
							${styles.show}
							${playing && styles.playing}
							${show.cancelled && styles.cancelled}
							${gapBefore && styles.gapBefore}
						`}
					>
						<div className={styles.showBoxAbove}>
							<span>
								{playing ? "on now" : upNext ? "up next" : ""}
							</span>
						</div>
						<div className={styles.showBox}>{show.name}</div>
						<div className={styles.showBoxBelow}>
							<span>
								{formatTimes(
									dateFromTime(show.start_time),
									dateFromTime(show.end_time)
								)}
							</span>
						</div>
					</div>
				);
			})
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
	return <div className={styles.container}>{computed}</div>;
}
