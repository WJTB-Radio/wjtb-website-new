import Link from "next/link";
import styles from "./home.module.scss";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export type Photo = {image: string, date_taken: string, caption: string};

export const galleryEndpoint = "https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/gallery_top.json";

export default async function StaticHome() {
	const data: {photos: Photo[]} = await (await fetch(galleryEndpoint)).json();
	return renderHome(data.photos);
}

export function renderHome(photos: Photo[]) {
	return (
		<div className={styles.main_content}>
			<h1>Streaming online since the 1990s!</h1>
			<p>WJTB is NJIT&apos;s official college radio station.</p>
			<Carousel className={`w-full max-w-xs ${styles.carousel}`}
				opts={{
					align: "start",
					loop: true,
				}}
				plugins={[
					Autoplay({
						delay: 5000,
						stopOnInteraction: true,
					}),
				]}>
				<CarouselContent className={styles.carousel_content}>
					{photos.map((photo, index) => (
						<CarouselItem key={index}>
							<div className={styles.item}>
								<img className={styles.image} src={photo.image}></img>
								<p className={styles.caption}>{photo.caption}</p>
								<p className={styles.date}>{photo.date_taken}</p>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<Link href="/gallery" style={{'display':'block','text-align':'center'} as React.CSSProperties}>See more pictures</Link>
			<h1>Get heard</h1>
			<p>
				Want to get involved? Connect with us on <a href="https://wjtb.njit.edu/discord" target="_blank" rel="noreferrer noopener">Discord</a>
				, <a href="https://njit.campuslabs.com/engage/organization/wjtb" target="_blank" rel="noreferrer noopener">Highlander Hub</a>
				, or in person!
			</p>
			<h1>Want a show?</h1>
			<p>
				We would love to have you on! All DJs must be active members of the club, get trained, and follow our rules of broadcast.
			</p>
			<h1>Want to book our team?</h1>
			<p>
				We&apos;re happy to provide sound for your live event if we&apos;re not already booked.
			</p>
			<p>
				Fill out <Link href={"/request"}>this form</Link> to submit your request!
			</p>
			<p>
				We&apos;ll get back to you to confirm once we see your request. Please give us 24-48 hours to process your request. All events are contingent on being approved and accepted - so we&apos;ll be in touch! If you don&apos;t hear back within 2 business days, please email us or yell at us on discord.
			</p>
		</div>
	);
}