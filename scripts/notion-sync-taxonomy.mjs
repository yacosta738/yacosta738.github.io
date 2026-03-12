import { promises as fs } from "node:fs";
import path from "node:path";
import { Client } from "@notionhq/client";

const rootDir = path.resolve(process.cwd(), "packages/shared/src/data");
const tagsDir = path.join(rootDir, "tags");
const categoriesDir = path.join(rootDir, "categories");

const env = process.env;

const databaseId = env.NOTION_TAXONOMY_DATABASE_ID ?? env.NOTION_DATABASE_ID;
if (!databaseId) {
	console.error("Missing NOTION_TAXONOMY_DATABASE_ID or NOTION_DATABASE_ID.");
	process.exit(1);
}

const notion = new Client({ auth: env.NOTION_TOKEN });

const PROPERTY = {
	tags: env.NOTION_TAXONOMY_TAGS_PROPERTY ?? "Tags",
	category: env.NOTION_TAXONOMY_CATEGORIES_PROPERTY ?? "Category",
};

const LOCALES = (env.NOTION_TAXONOMY_LOCALES ?? "en,es")
	.split(",")
	.map((value) => value.trim())
	.filter(Boolean);

const slugify = (value) =>
	value
		.normalize("NFKD")
		.replace(/[^\w\s-]/g, "")
		.trim()
		.toLowerCase()
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");

const ensureDir = async (dir) => {
	await fs.mkdir(dir, { recursive: true });
};

const writeFrontmatterFile = async (dir, slug, frontmatter) => {
	await ensureDir(dir);
	const filePath = path.join(dir, `${slug}.md`);
	try {
		await fs.access(filePath);
		return false;
	} catch {
		const content = `---\n${frontmatter}\n---\n\n`;
		await fs.writeFile(filePath, content, "utf-8");
		return true;
	}
};

const readSelect = (property) => {
	if (!property || typeof property !== "object") {
		return undefined;
	}
	if (property.type === "select") {
		return property.select?.name?.trim();
	}
	return undefined;
};

const readMultiSelect = (property) => {
	if (!property || typeof property !== "object") {
		return [];
	}
	if (property.type === "multi_select") {
		return property.multi_select
			.map((item) => item.name?.trim())
			.filter(Boolean);
	}
	return [];
};

const getProperty = (properties, key) => properties?.[key];

const syncTaxonomy = async () => {
	let cursor;
	const tags = new Set();
	const categories = new Set();

	while (true) {
		const response = await notion.databases.query({
			database_id: databaseId,
			start_cursor: cursor,
		});

		for (const page of response.results) {
			const properties = page.properties ?? {};
			const tagValues = readMultiSelect(getProperty(properties, PROPERTY.tags));
			for (const tag of tagValues) {
				tags.add(tag);
			}

			const categoryValue = readSelect(
				getProperty(properties, PROPERTY.category),
			);
			if (categoryValue) {
				categories.add(categoryValue);
			}
		}

		if (!response.has_more) {
			break;
		}
		cursor = response.next_cursor ?? undefined;
	}

	let createdTags = 0;
	let createdCategories = 0;

	for (const tag of tags) {
		const slug = slugify(tag);
		if (!slug) {
			continue;
		}
		for (const locale of LOCALES) {
			const didCreate = await writeFrontmatterFile(
				path.join(tagsDir, locale),
				slug,
				`title: ${tag}`,
			);
			if (didCreate) {
				createdTags += 1;
			}
		}
	}

	for (const category of categories) {
		const slug = slugify(category);
		if (!slug) {
			continue;
		}
		for (const locale of LOCALES) {
			const didCreate = await writeFrontmatterFile(
				path.join(categoriesDir, locale),
				slug,
				`title: ${category}`,
			);
			if (didCreate) {
				createdCategories += 1;
			}
		}
	}

	console.log(
		`Synced taxonomy. New tags: ${createdTags}, new categories: ${createdCategories}.`,
	);
};

syncTaxonomy().catch((error) => {
	console.error("Failed to sync Notion taxonomy:", error);
	process.exit(1);
});
