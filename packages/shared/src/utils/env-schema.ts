import { envField } from "astro/config";

export default {
	DOMAIN: envField.string({
		context: "client",
		access: "public",
		optional: true,
	}),
	AHREFS_KEY: envField.string({
		context: "client",
		access: "public",
		default: "",
	}),
	API_URL: envField.string({
		context: "client",
		access: "public",
		default: "http://localhost:8787",
	}),
	HCAPTCHA_SITE_KEY: envField.string({
		context: "client",
		access: "public",
		optional: true,
	}),
	NOTION_TOKEN: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_DATABASE_ID: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_PLATFORM_ID: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_DEFAULT_AUTHOR_ID: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_DEFAULT_CATEGORY_ID: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_DEFAULT_TAG_IDS: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_AUTHORS_DATABASE_ID: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_AUTHORS_NAME_PROPERTY: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_AUTHORS_LOCALE_PROPERTY: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_AUTHORS_LOCALES: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_TAXONOMY_DATABASE_ID: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_TAXONOMY_TAGS_PROPERTY: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_TAXONOMY_CATEGORIES_PROPERTY: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
	NOTION_TAXONOMY_LOCALES: envField.string({
		context: "server",
		access: "secret",
		optional: true,
	}),
};
