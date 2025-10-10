import type { CollectionEntry } from "astro:content";
import type Author from "../author/author.model";
import type Category from "../category/category.model";
import type Tag from "../tag/tag.model";

export default interface Article {
	id: string;
	title: string;
	description: string;
	author: Author;
	cover?: ImageMetadata;
	tags: Tag[];
	draft: boolean;
	body: string;
	date: Date;
	lastModified?: Date;
	category: Category;
	featured: boolean;
	entry?: CollectionEntry<"articles">;
}
