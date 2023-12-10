import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		lang: z.string(),
		cover: z.string(),
		// Reference a single author from the `authors` collection by `id`
		// author: reference('authors'),
		author: z.string().default('Anonymous'),
		tags: z.array(z.string()),
		categories: z.array(z.string()),
		draft: z.boolean()
	})
})

const authors = defineCollection({
	type: 'data',
	schema: z.object({
		id: z.string(),
		name: z.string(),
		image: z.string(),
		rol: z.string(),
		bio: z.string(),
		email: z.string(),
		lang: z.string(),
		social: z.array(
			z.object({
				name: z.string(),
				url: z.string(),
				icon: z.string()
			})
		)
	})
})

export const collections = {
	blog: blogCollection,
	authors
}
