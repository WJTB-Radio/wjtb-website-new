"use client";

import StrapiBlocks from "./block_renderer";
import { StrapiSingle, useStrapi } from "./strapi";
import styles from "../(pages)/global.module.scss";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export function ClientTextPage(props: {
	content: BlocksContent;
	pageName: keyof StrapiSingle;
}) {
	const content =
		useStrapi(props.pageName).data?.data.content ?? props.content;
	return (
		<div className={styles.main_content}>
			<StrapiBlocks content={content} />
		</div>
	);
}
