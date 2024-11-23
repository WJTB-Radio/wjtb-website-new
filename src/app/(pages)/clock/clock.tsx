import {
	formatTime,
	getNYCDate,
	getNYCWeekday,
	getWeekdayString,
	isLocalTime,
} from "@/app/utils/time";
import { useEffect, useReducer } from "react";
import styles from "./clock.module.scss";

export function Clock() {
	const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
	const date = getNYCDate();
	const weekday = getWeekdayString(getNYCWeekday());
	useEffect(() => {
		const t = setTimeout(() => {
			forceUpdate();
		}, 1000);
		return () => {
			clearTimeout(t);
		};
	});
	return isLocalTime() ? (
		<></>
	) : (
		<p suppressHydrationWarning className={styles.clock}>
			It&apos;s {weekday} at {formatTime(date) + " "}
			in Newark, NJ
		</p>
	);
}
