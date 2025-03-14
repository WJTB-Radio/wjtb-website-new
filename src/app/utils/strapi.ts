import useSWR from "swr";
import { DayOfWeek } from "./time";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export function strapiImageUrl(path: string) {
	return "https://wjtbradio.com/strapi" + path;
}

export interface StrapiImage {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	hash: string;
	ext: string;
	mime: string;
	// relative to https://wjtbradio.com/strapi/
	url: string;
	formats: {
		[format: string]: {
			name: string;
			hash: string;
			ext: string;
			mime: string;
			width: number;
			height: number;
			// relative to https://wjtbradio.com/strapi/
			url: string;
		};
	};
}

export type StrapiTime = `${number}:${number}:${number}.${number}`;

export interface StrapiCollection {
	"past-events": {
		name: string;
		description: string;
		date: string;
		pictures: StrapiImage[];
	};
	shows: StrapiShow;
	staffs: {
		name: string;
		title: string;
		flavor: string;
		order: number;
		image: StrapiImage;
	};
}

export interface StrapiSingle {
	"home-page": { content: BlocksContent };
	"variety-page": { content: BlocksContent };
	"history-page": { content: BlocksContent };
	"join-page": { content: BlocksContent };
	"contact-page": { content: BlocksContent };
}

type StrapiTypeName = keyof StrapiCollection | keyof StrapiSingle;

export interface StrapiShow {
	name: string;
	description: string;
	hosts: string;
	cancelled: boolean;
	start_time: StrapiTime;
	end_time: StrapiTime;
	day: { id: number; day: DayOfWeek };
	poster: StrapiImage;
}

export interface StrapiDefaults {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface StrapiResponse<TypeName extends StrapiTypeName> {
	data: TypeName extends keyof StrapiCollection
		? (StrapiCollection[TypeName] & StrapiDefaults)[]
		: TypeName extends keyof StrapiSingle
			? StrapiSingle[TypeName] & StrapiDefaults
		: never;
}

export function useStrapi<Type extends StrapiTypeName>(type: Type) {
	return useSWR(
		type as string,
		(collection: string) => fetchStrapi(collection as Type),
	);
}

export async function fetchStrapi<Type extends StrapiTypeName>(type: Type) {
	const r = await fetch(
		"https://wjtbradio.com/strapi/api/" +
			type +
			"?populate=*" +
			sortParam(type),
		{
			headers: {
				Authorization:
					"bearer 4d17457d1cb3cd7f4b39317e11d3e05a7b1744d66e9cf08a1d7eed3a522e1ffd9a4f7248f353c8d1db28ff119e59fb767175e6d4f0dad14b729cb185d0002ac618ed5aa3048be45004884197614654323af1ffa5c518b7a9520553712b42f148b2e43b484210b91a5d57121cc33be5d3142420cf7173d5801ddfa1d14b2567cd",
			},
		},
	);
	return await (r.json() as Promise<StrapiResponse<Type>>);
}

function sortParam(collection: StrapiTypeName) {
	switch (collection) {
		case "past-events":
			return "&sort=date:DESC";
		case "staffs":
			return "&sort=order:ASC";
		case "shows":
			return "&sort[0]=day.day&sort[1]=start_time&pagination[pageSize]=100";
		default:
			return "";
	}
}
