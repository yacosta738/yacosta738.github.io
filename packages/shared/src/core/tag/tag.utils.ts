import type { CollectionEntry } from "astro:content";
import { cleanEntityId } from "@/lib/collection.entity";
import type Tag from "./tag.model";

export type TagLike = Tag | CollectionEntry<"tags">;

const normalizeTagId = (id: string): string =>
	cleanEntityId(id).replace(/^tags\//, "");

export const getTagSlug = (tag: TagLike): string => {
	if ("data" in tag) {
		return normalizeTagId(tag.id);
	}

	return normalizeTagId(tag.id);
};
