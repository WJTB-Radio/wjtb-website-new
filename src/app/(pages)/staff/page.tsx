import { Staff } from "./staff";
import { fetchStrapi } from "@/app/utils/strapi";

export default async function StaffPage() {
	const data = await fetchStrapi("staffs");
	let staff = data.data;
	// curro shouldn't appear in static version of site
	staff = staff.filter((s) => !s.name.includes("Gera"));
	return <Staff staff={staff} />;
}
