import { redirect } from "next/navigation";

// i think theres a qr code somewhere that points here? not 100% sure if its still in use tho.
export default async function SoundRequest() {
	redirect("https://wjtb.njit.edu/request");
}