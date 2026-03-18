import type { FileObject } from "./types.js";

/**
 * Extract a plain string from a list of rich text items.
 *
 * @see https://developers.notion.com/reference/rich-text
 *
 * @example
 * richTextToPlainText(page.properties.Name.title)
 */
export function richTextToPlainText(
	data: ReadonlyArray<{ plain_text: string }>,
): string {
	return data.map((text) => text.plain_text).join("");
}

/**
 * Extract the URL from a file property.
 *
 * @see https://developers.notion.com/reference/file-object
 */
export function fileToUrl(file: FileObject): string;
export function fileToUrl(file: FileObject | null): string | undefined;
export function fileToUrl(file: FileObject | null): string | undefined {
	switch (file?.type) {
		case "external":
			return file.external.url;
		case "file":
			return file.file.url;
		default:
			return undefined;
	}
}

/**
 * Replace date strings with date objects.
 *
 * @see https://developers.notion.com/reference/page-property-values#date
 */
export function dateToDateObjects(
	dateResponse: {
		start: string;
		end: string | null;
		time_zone: string | null;
	} | null,
) {
	if (dateResponse === null) {
		return null;
	}

	return {
		start: new Date(dateResponse.start),
		end: dateResponse.end ? new Date(dateResponse.end) : null,
		time_zone: dateResponse.time_zone,
	};
}
