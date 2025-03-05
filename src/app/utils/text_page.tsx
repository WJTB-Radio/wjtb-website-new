import { fetchStrapi, StrapiSingle } from "./strapi";
import { ClientTextPage } from "./text_page_client";

export async function TextPage(pageName: keyof StrapiSingle) {
	return async function Page() {
		return (
			<ClientTextPage
				pageName={pageName}
				content={(await fetchStrapi(pageName)).data.content}
			/>
		);
	};
}
