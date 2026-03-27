import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Matches Notion S3 file URLs (covers, inline images). */
const S3_HOST_PREFIX = "https://prod-files-secure.s3.";

/** Matches S3 URLs in HTML attributes (handles &#x26; and &amp; encoded ampersands). */
export const S3_URL_IN_HTML = /https:\/\/prod-files-secure\.s3\.[^"'\s)]+/g;

const PUBLIC_SUBDIR = "images/notion";

export const isNotionS3Url = (url: string): boolean =>
	url.startsWith(S3_HOST_PREFIX);

/**
 * Decode HTML entities that appear in URLs within rendered HTML.
 * Notion S3 URLs contain query parameters joined by `&` which rehype encodes.
 */
const decodeHtmlEntities = (str: string): string =>
	str
		.replaceAll("&amp;", "&")
		.replaceAll("&#x26;", "&")
		.replaceAll("&#38;", "&");

/**
 * Derive a stable local filename from a Notion S3 URL.
 *
 * URL structure:
 * https://prod-files-secure.s3.{region}.amazonaws.com/{parentId}/{objId}/{filename}?query
 *
 * Local path: {saveDir}/{parentId}/{objId}.{ext}
 * Public path: /{PUBLIC_SUBDIR}/{parentId}/{objId}.{ext}
 */
const deriveImagePaths = (
	url: string,
	saveDir: string,
): { localPath: string; publicPath: string } | null => {
	try {
		const parsed = new URL(decodeHtmlEntities(url));
		const segments = parsed.pathname.split("/").filter(Boolean);
		if (segments.length < 3) {
			return null;
		}
		const parentId = segments[segments.length - 3];
		const objId = segments[segments.length - 2];
		const fileName = segments[segments.length - 1];
		const ext = path.extname(fileName) || ".png";

		const localDir = path.join(saveDir, parentId);
		const localPath = path.join(localDir, `${objId}${ext}`);
		const publicPath = `/${PUBLIC_SUBDIR}/${parentId}/${objId}${ext}`;

		return { localPath, publicPath };
	} catch {
		return null;
	}
};

/**
 * Download a single Notion S3 image to the local public directory.
 * Returns the public URL path (e.g. `/images/notion/{parentId}/{objId}.png`).
 * Falls back to the original URL on failure.
 */
export const downloadNotionImage = async (
	url: string,
	saveDir: string,
	logger?: { debug: (message: string) => void },
): Promise<string> => {
	if (!isNotionS3Url(url)) {
		return url;
	}

	const cleanUrl = decodeHtmlEntities(url);
	const paths = deriveImagePaths(cleanUrl, saveDir);
	if (!paths) {
		logger?.debug(`notion-image: unable to parse S3 URL: ${cleanUrl}`);
		return url;
	}

	// Use cached file if it already exists
	if (existsSync(paths.localPath)) {
		logger?.debug(`notion-image: cached ${paths.publicPath}`);
		return paths.publicPath;
	}

	try {
		await mkdir(path.dirname(paths.localPath), { recursive: true });
		const response = await fetch(cleanUrl);
		if (!response.ok) {
			logger?.debug(
				`notion-image: download failed (${response.status}): ${cleanUrl}`,
			);
			return url;
		}
		const contentType = response.headers.get("content-type") ?? "";
		if (!contentType.startsWith("image/")) {
			logger?.debug(
				`notion-image: unexpected content-type "${contentType}" for ${cleanUrl}`,
			);
			return url;
		}
		const buffer = new Uint8Array(await response.arrayBuffer());
		await writeFile(paths.localPath, buffer);
		logger?.debug(`notion-image: downloaded ${paths.publicPath}`);
		return paths.publicPath;
	} catch (error) {
		logger?.debug(
			`notion-image: download error: ${error instanceof Error ? error.message : String(error)}`,
		);
		return url;
	}
};

/**
 * Scan rendered HTML for Notion S3 URLs, download each image,
 * and replace the URLs with local public paths.
 */
export const downloadImagesInHtml = async (
	html: string,
	saveDir: string,
	logger?: { debug: (message: string) => void },
): Promise<string> => {
	const matches = [...new Set(html.match(S3_URL_IN_HTML) ?? [])];
	if (matches.length === 0) {
		return html;
	}

	let result = html;
	for (const htmlEncodedUrl of matches) {
		// Decode HTML entities (&#x26; → &) to get the real URL for downloading.
		// Compare against the decoded `realUrl` because `downloadNotionImage`
		// returns its input URL unchanged on failure. Replace against the
		// original `htmlEncodedUrl` because that's what appears in the HTML.
		const realUrl = decodeHtmlEntities(htmlEncodedUrl);
		const localPath = await downloadNotionImage(realUrl, saveDir, logger);
		if (localPath !== realUrl) {
			result = result.replaceAll(htmlEncodedUrl, localPath);
		}
	}

	return result;
};

/**
 * Resolve the public images directory from a cache URL reference.
 * Given cache at `apps/blog/.cache/notion-loader.json`,
 * returns `apps/blog/public/images/notion`.
 */
export const resolveImageDir = (cacheUrl: URL): string => {
	const cacheDir = path.dirname(fileURLToPath(cacheUrl));
	return path.join(cacheDir, "..", "public", PUBLIC_SUBDIR);
};
