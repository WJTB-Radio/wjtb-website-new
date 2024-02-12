"use client";

import useSWR from "swr";
import { jsonFetcher } from "../utils/fetchers";
import StaticStaff, { renderStaff, Staff, endpoint } from "./static";

export default function Staff() {
	let staff: Staff[];
	
	const {data, error}: {data: {staff: Staff[]}, error: boolean | undefined} = useSWR(endpoint, jsonFetcher);
	if(error || !data) {
		return (
			<StaticStaff />
		);
	}
	staff = data.staff;

	return renderStaff(staff);
}