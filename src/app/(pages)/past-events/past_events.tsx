"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import styles from "./past_events.module.scss";
import Autoplay from "embla-carousel-autoplay";
import { addLineBreaks } from "@/app/utils/text";
import useSWR from "swr";
import { jsonFetcher } from "@/app/utils/fetchers";
import { EventType } from "./page";
import { pastEventsEndpoint } from "@/app/utils/endpoints";

export function Events(props: { events: EventType[] }) {
	const {
		data,
		error,
	}: { data: { events: EventType[] }; error: boolean | undefined } = useSWR(
		pastEventsEndpoint,
		jsonFetcher,
	);
	let events: EventType[] = !data || error ? props.events : data.events;
	return (
		<div className={styles.main_content_minimal}>
			<h1 className={styles.title}>Past Events</h1>
			<div className={styles.container}>
				{events.map((event) => (
					<div className={styles.event} key={event.name + event.date}>
						<h2 className={styles.name}>{event.name}</h2>
						<p className={styles.date}>{event.date}</p>
						<Carousel
							className={`w-full max-w-xs ${styles.carousel}`}
							opts={{
								align: "start",
								loop: true,
							}}
							plugins={[
								Autoplay({
									delay: 5000,
									stopOnInteraction: true,
								}),
							]}
						>
							<CarouselContent
								className={styles.carousel_content}
							>
								{event.images.map((image, index) => (
									<CarouselItem key={index}>
										<img
											className={styles.image}
											src={image}
											alt=""
										></img>
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
				))}
			</div>
		</div>
	);
}
