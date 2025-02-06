import useSWR from "swr";

export function strapiImageUrl(path: string) {
	return "https://wjtbradio.com/strapi" + path;
}

export interface StrapiImage {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string;
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

export interface StrapiCollection {
	"past-events": {
		name: string;
		description: string;
		date: string;
		pictures: StrapiImage[];
	};
	staffs: {
		name: string;
		title: string;
		flavor: string;
		order: number;
		image: StrapiImage;
	};
}

export interface StrapiResponse<Collection extends keyof StrapiCollection> {
	data: (StrapiCollection[Collection] & {
		id: number;
		documentId: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
	})[];
}

export function useStrapi<Collection extends keyof StrapiCollection>(
	collection: Collection
) {
	return useSWR(collection as string, (collection: string) =>
		fetchStrapi(collection as Collection)
	);
}

export async function fetchStrapi<Collection extends keyof StrapiCollection>(
	collection: Collection
) {
	const r = await fetch(
		"https://wjtbradio.com/strapi/api/" +
			collection +
			"?populate=*" +
			sortParam(collection),
		{
			headers: {
				Authorization:
					"bearer 4d17457d1cb3cd7f4b39317e11d3e05a7b1744d66e9cf08a1d7eed3a522e1ffd9a4f7248f353c8d1db28ff119e59fb767175e6d4f0dad14b729cb185d0002ac618ed5aa3048be45004884197614654323af1ffa5c518b7a9520553712b42f148b2e43b484210b91a5d57121cc33be5d3142420cf7173d5801ddfa1d14b2567cd",
			},
		}
	);
	return await (r.json() as Promise<StrapiResponse<Collection>>);
}

function sortParam(collection: keyof StrapiCollection) {
	switch (collection) {
		case "past-events":
			return "&sort=date:DESC";
		case "staffs":
			return "&sort=order:ASC";
		default:
			return "";
	}
}
