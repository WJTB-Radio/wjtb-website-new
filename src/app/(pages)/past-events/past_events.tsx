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
import { strapiImageUrl, StrapiResponse, useStrapi } from "@/app/utils/strapi";

export function Events(props: { events: StrapiResponse<"past-events"> }) {
	const { data, error } = useStrapi("past-events");
	const events = (!data || error ? props.events : data).data;
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
								{event.pictures.map((image, index) => (
									<CarouselItem key={index}>
										<img
											className={styles.image}
											src={strapiImageUrl(image.url)}
											alt={image.alternativeText}
										/>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
						<p className={styles.desc}>
							{addLineBreaks(event.description)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
