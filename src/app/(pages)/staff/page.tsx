"use client";

import useSWR from "swr";
import { jsonFetcher } from "../../utils/fetchers";
import StaticStaff, { renderStaff, StaffType, endpoint } from "./static";

export default function Staff() {
	let staff: StaffType[];
	
	const {data, error}: {data: {staff: StaffType[]}, error: boolean | undefined} = useSWR(endpoint, jsonFetcher);
	if(error || !data) {
		return (
			<StaticStaff />
		);
	}
	staff = data.staff;

	return renderStaff(staff);
}