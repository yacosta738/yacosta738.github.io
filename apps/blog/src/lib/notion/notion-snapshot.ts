import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const REMOTE_NOTION_IMAGE_PATTERNS = [
	/prod-files-secure\.s3\.[a-z0-9-]+\.amazonaws\.com/i,
	/secure\.notion-static\.com/i,
] as const;

const LOCAL_NOTION_IMAGE_PATTERN = /\/images\/notion\/[^"'\s)]+/g;

export interface SnapshotEntryData {
	cover?: string;
	[key: string]: unknown;
}

export interface SnapshotEntry {
	id: string;
	data: SnapshotEntryData;
	rendered?: unknown;
	body?: string;
	digest?: string | number;
	sourceId?: string;
}

export interface NotionSnapshot {
	version: 1;
	databaseId?: string;
	lastSync: string;
	entries: SnapshotEntry[];
}

export class FatalNotionValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "FatalNotionValidationError";
	}
}

const containsRemoteNotionImageUrl = (value: string): boolean =>
	REMOTE_NOTION_IMAGE_PATTERNS.some((pattern) => pattern.test(value));

const getRenderedHtml = (entry: SnapshotEntry): string => {
	if (entry.rendered && typeof entry.rendered === "object") {
		const html = (entry.rendered as { html?: unknown }).html;
		if (typeof html === "string") {
			return html;
		}
	}

	return entry.body ?? "";
};

export const readSnapshot = (filePath: string): NotionSnapshot => {
	if (!existsSync(filePath)) {
		throw new Error(`Notion snapshot not found at ${filePath}`);
	}

	const parsed = JSON.parse(readFileSync(filePath, "utf8")) as unknown;

	if (!parsed || typeof parsed !== "object") {
		throw new Error(`Invalid Notion snapshot at ${filePath}: expected object`);
	}

	const snapshotRecord = parsed as Record<string, unknown>;
	if (snapshotRecord.version !== 1) {
		throw new Error(
			`Invalid Notion snapshot at ${filePath}: expected version 1`,
		);
	}

	if (!Array.isArray(snapshotRecord.entries)) {
		throw new Error(
			`Invalid Notion snapshot at ${filePath}: expected entries array`,
		);
	}

	return parsed as unknown as NotionSnapshot;
};

export const writeSnapshot = (
	filePath: string,
	snapshot: NotionSnapshot,
): void => {
	mkdirSync(path.dirname(filePath), { recursive: true });
	writeFileSync(filePath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
};

export const collectLocalNotionAssetPaths = (
	entries: SnapshotEntry[],
): string[] => {
	const assetPaths = new Set<string>();

	for (const entry of entries) {
		if (entry.data.cover?.startsWith("/images/notion/")) {
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

export const assertNoRemoteNotionImages = (entries: SnapshotEntry[]): void => {
	for (const entry of entries) {
		if (entry.data.cover && containsRemoteNotionImageUrl(entry.data.cover)) {
			throw new FatalNotionValidationError(
				`Remote Notion image URL detected in cover for article ${entry.id}`,
			);
		}

		if (containsRemoteNotionImageUrl(getRenderedHtml(entry))) {
			throw new FatalNotionValidationError(
				`Remote Notion image URL detected in rendered content for article ${entry.id}`,
			);
		}
	}
};
