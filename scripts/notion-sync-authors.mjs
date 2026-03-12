import { promises as fs } from "node:fs";
import path from "node:path";
import { Client } from "@notionhq/client";

const rootDir = path.resolve(process.cwd(), "packages/shared/src/data/authors");

const env = process.env;

const databaseId = env.NOTION_AUTHORS_DATABASE_ID ?? env.NOTION_DATABASE_ID;
if (!databaseId) {
	console.error("Missing NOTION_AUTHORS_DATABASE_ID or NOTION_DATABASE_ID.");
	process.exit(1);
}

const notion = new Client({ auth: env.NOTION_TOKEN });

const PROPERTY = {
	name: env.NOTION_AUTHORS_NAME_PROPERTY ?? "Author",
	locale: env.NOTION_AUTHORS_LOCALE_PROPERTY ?? "Locale",
};

const DEFAULT_LOCALES = (env.NOTION_AUTHORS_LOCALES ?? "en")
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

const readText = (property) => {
	if (!property || typeof property !== "object") {
		return "";
	}
	if (property.type === "title") {
		return property.title
			.map((t) => t.plain_text)
			.join("")
			.trim();
	}
	if (property.type === "rich_text") {
		return property.rich_text
			.map((t) => t.plain_text)
			.join("")
			.trim();
	}
	if (property.type === "select") {
		return property.select?.name?.trim() ?? "";
	}
	return "";
};

const readLocales = (property) => {
	if (!property || typeof property !== "object") {
		return DEFAULT_LOCALES;
	}
	if (property.type === "multi_select") {
		const names = property.multi_select
			.map((item) => item.name?.trim())
			.filter(Boolean);
		return names.length > 0 ? names : DEFAULT_LOCALES;
	}
	const text = readText(property);
	if (!text) {
		return DEFAULT_LOCALES;
	}
	return text
		.split(",")
		.map((value) => value.trim())
		.filter(Boolean);
};

const readPeople = (property) => {
	if (!property || typeof property !== "object") {
		return [];
	}
	if (property.type !== "people") {
		return [];
	}
	return Array.isArray(property.people) ? property.people : [];
};

const parseSocials = () => [];

const mergeField = (nextValue, previousValue, fallback = "") => {
	if (typeof nextValue === "string" && nextValue.trim() !== "") {
		return nextValue;
	}
	return previousValue ?? fallback;
};

const mergeSocials = (nextValue, previousValue) => {
	if (Array.isArray(nextValue) && nextValue.length > 0) {
		return nextValue;
	}
	return Array.isArray(previousValue) ? previousValue : [];
};

const loadExisting = async (filePath) => {
	try {
		const content = await fs.readFile(filePath, "utf-8");
		return JSON.parse(content);
	} catch {
		return null;
	}
};

const ensureDir = async (dir) => {
	await fs.mkdir(dir, { recursive: true });
};

const writeAuthor = async (locale, slug, data) => {
	const dir = path.join(rootDir, locale);
	await ensureDir(dir);
	const filePath = path.join(dir, `${slug}.json`);
	const existing = await loadExisting(filePath);
	const merged = {
		name: mergeField(data.name, existing?.name, "Unknown"),
		email: mergeField(data.email, existing?.email, ""),
		avatar: mergeField(data.avatar, existing?.avatar, ""),
		bio: mergeField(data.bio, existing?.bio, ""),
		location: mergeField(data.location, existing?.location, ""),
		socials: mergeSocials(data.socials, existing?.socials),
	};
	await fs.writeFile(filePath, `${JSON.stringify(merged, null, 2)}\n`, "utf-8");
};

const getProperty = (properties, key) => properties?.[key];

const syncAuthors = async () => {
	let cursor;
	let count = 0;
	const seen = new Set();
	while (true) {
		const response = await notion.databases.query({
			database_id: databaseId,
			start_cursor: cursor,
		});

		for (const page of response.results) {
			const properties = page.properties ?? {};
			const people = readPeople(getProperty(properties, PROPERTY.name));
			if (people.length === 0) {
				continue;
			}

			for (const person of people) {
				const name = person?.name?.trim();
				if (!name) {
					continue;
				}
				const slug = slugify(name);
				if (!slug || seen.has(slug)) {
					continue;
				}
				seen.add(slug);
				const locales = readLocales(getProperty(properties, PROPERTY.locale));
				const authorData = {
					name,
					email: "",
					avatar: person?.avatar_url ?? "",
					bio: "",
					location: "",
					socials: parseSocials(),
				};

				for (const locale of locales) {
					await writeAuthor(locale, slug, authorData);
				}
				count += 1;
			}
		}

		if (!response.has_more) {
			break;
		}
		cursor = response.next_cursor ?? undefined;
	}

	console.log(`Synced ${count} author(s).`);
};

syncAuthors().catch((error) => {
	console.error("Failed to sync Notion authors:", error);
	process.exit(1);
});
