import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const appRoot = resolve(process.cwd());
const snapshotPath = resolve(appRoot, ".cache", "notion-loader.json");

const REMOTE_NOTION_IMAGE_PATTERNS = [
	/prod-files-secure\.s3\.[a-z0-9-]+\.amazonaws\.com/i,
	/secure\.notion-static\.com/i,
];

const LOCAL_NOTION_IMAGE_PATTERN = /\/images\/notion\/[^"'\s)]+/g;

const getRenderedHtml = (entry) => {
	if (entry.rendered && typeof entry.rendered === "object") {
		const html = entry.rendered.html;
		if (typeof html === "string") {
			return html;
		}
	}

	return entry.body ?? "";
};

const readSnapshot = (filePath) => {
	const parsed = JSON.parse(readFileSync(filePath, "utf8"));

	if (!parsed || typeof parsed !== "object") {
		throw new Error(`Invalid Notion snapshot at ${filePath}: expected object`);
	}

	if (parsed.version !== 1) {
		throw new Error(
			`Invalid Notion snapshot at ${filePath}: expected version 1`,
		);
	}

	if (!Array.isArray(parsed.entries)) {
		throw new Error(
			`Invalid Notion snapshot at ${filePath}: expected entries array`,
		);
	}

	return parsed;
};

const assertNoRemoteNotionImages = (entries) => {
	for (const entry of entries) {
		if (
			typeof entry?.data?.cover === "string" &&
			REMOTE_NOTION_IMAGE_PATTERNS.some((pattern) =>
				pattern.test(entry.data.cover),
			)
		) {
			throw new Error(
				`Remote Notion image URL detected in cover for article ${entry.id}`,
			);
		}

		const html = getRenderedHtml(entry);
		if (REMOTE_NOTION_IMAGE_PATTERNS.some((pattern) => pattern.test(html))) {
			throw new Error(
				`Remote Notion image URL detected in rendered content for article ${entry.id}`,
			);
		}
	}
};

const collectLocalNotionAssetPaths = (entries) => {
	const assetPaths = new Set();

	for (const entry of entries) {
		if (
			typeof entry?.data?.cover === "string" &&
			entry.data.cover.startsWith("/images/notion/")
		) {
			assetPaths.add(entry.data.cover);
		}

		for (const match of getRenderedHtml(entry).matchAll(
			LOCAL_NOTION_IMAGE_PATTERN,
		)) {
			assetPaths.add(match[0]);
		}
	}

	return [...assetPaths];
};

const run = async () => {
	const snapshot = readSnapshot(snapshotPath);
	assertNoRemoteNotionImages(snapshot.entries);

	for (const assetPath of collectLocalNotionAssetPaths(snapshot.entries)) {
		const absolutePath = resolve(appRoot, "public", `.${assetPath}`);
		if (!existsSync(absolutePath)) {
			throw new Error(`Missing local Notion asset: ${assetPath}`);
		}
	}

	console.log(
		`[notion:validate] validated ${snapshot.entries.length} entries from ${snapshotPath}`,
	);
};

run().catch((error) => {
	console.error("[notion:validate] failed", error);
	process.exitCode = 1;
});
