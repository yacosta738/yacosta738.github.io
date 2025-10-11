import type { CollectionEntry } from "astro:content";
import type Author from "../author/author.model";
import type Category from "../category/category.model";
import type Tag from "../tag/tag.model";

export default interface ExternalArticle {
	id: string;
	title: string;
	description: string;
	author: Author;
	cover?: ImageMetadata;
	tags: Tag[];
	draft: boolean;
	date: Date;
	lastModified?: Date;
	category: Category;
	isExternal: boolean;
	link: string;
	entry?: CollectionEntry<"externalArticles">;
}
