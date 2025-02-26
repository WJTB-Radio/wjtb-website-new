"use client";

import {
	dateFromTime,
	formatTime,
	formatTimes,
	getWeekdayString,
} from "@/app/utils/time";
import styles from "./shows.module.scss";
import { MutableRefObject, useRef } from "react";
import Link from "next/link";
import { Show, showsToDays, useShows } from "@/app/utils/shows";
import { strapiImageUrl } from "@/app/utils/strapi";

export function Shows(props: { days: Show[][] }) {
	const top = useRef<HTMLDivElement>(null);

	let dayStarts: MutableRefObject<HTMLDivElement | null>[] = [];
	for (let i = 0; i < 5; i++) {
		// this for loop always runs the same number of times, so we can disable the linter rule
		// eslint-disable-next-line react-hooks/rules-of-hooks
		dayStarts.push(useRef<HTMLDivElement>(null));
	}

	const shows = useShows();
	const days = shows.data == undefined ? props.days : showsToDays(shows.data);

	let min_time = 60 * 60 * 24;
	let max_time = 0;
	let show_count = 0;
	days.forEach((day) => {
		day.forEach((show) => {
			if (show.start_time < min_time) {
				min_time = show.start_time;
			}
			if (show.end_time > max_time) {
				max_time = show.end_time;
			}
			show_count++;
		});
	});

	function getTimeFraction(time: number) {
		return (time - min_time) / (max_time - min_time);
	}

	const marker_times: number[] = [];
	for (let i = min_time; i <= max_time; i += 60 * 60) {
		marker_times.push(i);
	}

	function scrollToDay(d: number) {
		if (d >= dayStarts.length) {
			return;
		}
		const dayStart = dayStarts[d];
		if (dayStart.current == null) {
			return;
		}
		(window as any).smoothScroll({
			toElement: dayStart.current,
			duration: 300,
			easing: (window as any).smoothScroll.easing.easeOutBack,
		});
	}

	function scrollToTop() {
		if (top == null || top.current == null) {
			return;
		}
		(window as any).smoothScroll({
			toElement: top.current,
			duration: 300,
			easing: (window as any).smoothScroll.easing.easeOutBack,
		});
	}

	if (show_count <= 0) {
		return (
			<div className={styles.main_content}>
				<h1>There aren&apos;t any shows scheduled right now.</h1>
				<p>
					If you would like to host a show, you can{" "}
					<Link href="/join">become a member</Link>.
				</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.calendar}>
				<div className={styles.days}>
					{days.map((_day, idx) => (
						<div key={idx} className={styles.day}>
							<h1 className={styles.title}>
								{getWeekdayString(idx)}
							</h1>
						</div>
					))}
				</div>
				<div className={styles.day_buttons} ref={top}>
					{Array.apply(null, Array(5)).map((_, i) => (
						<button
							className={styles.styled_button}
							onClick={scrollToDay.bind(null, i)}
							key={i + "daybutton"}
						>
							{getWeekdayString(i)}
						</button>
					))}
				</div>
				<button className={styles.scroll_to_top} onClick={scrollToTop}>
					Scroll to top
				</button>
				<div className={styles.shows_container}>
					<div className={styles.time_markers} aria-hidden="true">
						{marker_times.map((time) => (
							<div
								className={styles.time_marker}
								key={"time-marker" + time}
								style={
									{
										"--time": `${
											100 * getTimeFraction(time)
										}%`,
									} as React.CSSProperties
								}
							>
								{formatTime(dateFromTime(time))}
							</div>
						))}
					</div>
					<div className={styles.shows}>
						{days.map((day, day_idx) => (
							<div className={styles.day_shows} key={day_idx}>
								{day.map((show, i) => (
									<div
										key={i}
										style={
											{
												"--start-time": `${
													100 *
													getTimeFraction(
														show.start_time
													)
												}%`,
												"--end-time": `${
													100 *
													getTimeFraction(
														show.end_time
													)
												}%`,
											} as React.CSSProperties
										}
										className={styles.show}
										ref={
											i == 0
												? dayStarts[day_idx]
												: undefined
										}
									>
										<h2 aria-hidden="true">{show.name}</h2>
										<div className={styles.hover_card}>
											<h2>{show.name}</h2>
											<img
												src={strapiImageUrl(
													show.poster.url
												)}
												alt={
													show.poster
														.alternativeText ??
													"Poster for " + show.name
												}
											/>
											<p className={styles.hosts}>
												Hosted by {show.hosts}
											</p>
											<p className={styles.times}>
												{formatTimes(
													dateFromTime(
														show.start_time
													),
													dateFromTime(show.end_time)
												) +
													" every " +
													getWeekdayString(day_idx)}
											</p>
											<p className={styles.desc}>
												{show.description}
											</p>
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
