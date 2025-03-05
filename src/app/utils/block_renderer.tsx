"use client";

import {
	BlocksRenderer,
	type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Link from "next/link";
import { ReactNode } from "react";

function StrapiBlockLink(props: { url: string; children?: ReactNode }) {
	return <Link href={props.url}>{props.children}</Link>;
}

export default function StrapiBlocks({
	content,
}: {
	readonly content: BlocksContent;
}) {
	if (!content) return null;
	return (
		<BlocksRenderer content={content} blocks={{ link: StrapiBlockLink }} />
	);
}
