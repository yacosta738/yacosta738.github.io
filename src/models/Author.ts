import type { SocialMedia } from "../store/constants";
import type { CollectionEntry } from "astro:content";

export interface Author {
	id: string;
	name: string;
	image: string;
	rol: string;
	bio: string;
	email: string;
	social: SocialMedia[];
}

export const jsonToAuthor = (json: CollectionEntry<"authors">): Author => {
	return {
		id: json.id,
		name: json.data.name,
		image: json.data.image,
		rol: json.data.rol,
		bio: json.data.bio,
		email: json.data.email,
		social: json.data.social,
	};
};
