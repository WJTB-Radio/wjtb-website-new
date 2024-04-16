import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import styles from "./past_events.module.scss";
import Autoplay from "embla-carousel-autoplay";
import { addLineBreaks } from "@/app/utils/text";

export type EventType = {name: string, desc: string, date: string, images: string[]};

export const endpoint = "https://raw.githubusercontent.com/WJTB-Radio/ShowData/master/past_events.json";

export default async function StaticEvent() {
	const data: {events: EventType[]} = await (await fetch(endpoint)).json();
	let events = data.events;
	return renderEvents(events);
}

export function renderEvents(events: EventType[]) {
	return (
		<div className={styles.main_content_minimal}>
			<h1 className={styles.title}>Past Events</h1>
			<div className={styles.container}>
				{events.map((event) =>
					<div className={styles.event} key={event.name+event.date}>
						<h2 className={styles.name}>
							{event.name}
						</h2>
						<p className={styles.date}>
							{event.date}
						</p>
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
								{event.images.map((image, index) => (
									<CarouselItem key={index}>
										<img className={styles.image} src={image} alt=""></img>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
						<p className={styles.desc}>
							{addLineBreaks(event.desc)}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}