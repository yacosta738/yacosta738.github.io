import type { CollectionEntry } from "astro:content";
import { cleanEntityId } from "@/lib/collection.entity";
import type Category from "./category.model";

export type CategoryLike = Category | CollectionEntry<"categories">;

const normalizeCategoryId = (id: string): string => cleanEntityId(id);

export const getCategorySlug = (category: CategoryLike): string => {
	if ("slug" in category) {
		const slug = category.slug?.trim();
		if (slug) {
			return slug;
		}
	}

	return normalizeCategoryId(category.id);
};
