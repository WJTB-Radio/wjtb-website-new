import { staffEndpoint } from "@/app/utils/endpoints";
import { Staff } from "./staff";

export type StaffType = {
	name: string;
	flavor: string;
	position: string;
	image: string;
};

export default async function StaffPage() {
	const data: { staff: StaffType[] } = await (
		await fetch(staffEndpoint)
	).json();
	let staff = data.staff;
	// curro shouldn't appear in static version of site
	staff = staff.filter((s) => !s.name.includes("Gera"));
	return <Staff staff={staff} />;
}
