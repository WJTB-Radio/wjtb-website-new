import styles from "./staff.module.scss";

export type StaffType = {name: string, flavor: string, position: string, image: string};

export const endpoint = "https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/staff.json";

export default async function StaticStaff() {
	const data: {staff: StaffType[]} = await (await fetch(endpoint)).json();
	let staff = data.staff;
	// curro shouldn't appear in static version of site
	staff = staff.filter((s) => !s.name.includes('Gera'));
	return renderStaff(staff);
}

export function renderStaff(staff: StaffType[]) {
	return (
		<div>
			<h1 className={styles.title}>Staff</h1>
			<div className={styles.container}>
				{staff.map((staff) => 
					<div className={styles.staff} key={staff.name}>
						<div className={styles.image}>
							<img src={staff.image} alt={`Photo of ${staff.name}`}></img>
						</div>
						<h2 className={styles.name}>
							{staff.name}
						</h2>
						<h2 className={styles.position}>
							{staff.position}
						</h2>
						<p className={styles.flavor}>
							{staff.flavor}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}