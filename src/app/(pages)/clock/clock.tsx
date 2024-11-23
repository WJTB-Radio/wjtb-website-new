"use client";

import {
	formatTime,
	getNYCDate,
	getNYCWeekday,
	getWeekdayString,
	isLocalTime,
} from "@/app/utils/time";
import { useEffect, useMemo, useReducer } from "react";
import styles from "./clock.module.scss";

export default function Clock() {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	useEffect(() => {
		const t = window.setTimeout(() => {
			forceUpdate();
		}, 1000);
		return () => {
			window.clearTimeout(t);
		};
	});
	const date = isLocalTime() ? undefined : getNYCDate();
	const weekday = getWeekdayString(getNYCWeekday());
	return useMemo(
		() => (
			<div className={styles.clock}>
				{date != undefined
					? `It's ${weekday} at ${formatTime(date)} in Newark, NJ`
					: ""}
			</div>
		),
		[date, weekday]
	);
}
