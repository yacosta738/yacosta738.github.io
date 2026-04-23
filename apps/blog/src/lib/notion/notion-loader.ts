import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Loader, LoaderContext } from "astro/loaders";
import type { Element as ElementNode } from "hast";
import { type FileObject, fileToUrl } from "./notion-file";
import {
	containsS3Url,
	downloadImagesInHtml,
	downloadNotionImage,
	isNotionS3Url,
	resolveImageDir,
} from "./notion-image";
import {
	assertNoRemoteNotionImages,
	FatalNotionValidationError,
} from "./notion-snapshot";

type NotionArticleData = {
	title: string;
	description: string;
	date: string;
	lastModified?: string;
	cover?: string;
	author: string;
	tags: string[];
	category: string;
	draft?: boolean;
	featured?: boolean;
};

type CachedNotionLoaderOptions = NotionLoaderOptions & {
	cacheUrl: URL;
	platformId?: string;
	requiredType?: string;
	requiredStatus?: string;
	defaultAuthorId?: string;
	defaultCategoryId?: string;
	defaultTags?: string[];
};

type NotionLoaderOptions = {
	auth?: string;
	timeoutMs?: number;
	baseUrl?: string;
	notionVersion?: string;
	fetch?: typeof fetch;
	agent?: unknown;
	database_id: string;
	filter_properties?: string[];
	sorts?: unknown[];
	filter?: unknown;
	archived?: boolean;
	rehypePlugins?: ReadonlyArray<RehypePluginConfig>;
};

type NotionEntryData = {
	properties: Record<string, unknown>;
	cover: unknown;
};

type CachedEntry = {
	id: string;
	data: NotionArticleData;
	rendered?: unknown;
	digest?: string | number;
	body?: string;
	sourceId?: string;
};

type MarkdownHeading = {
	depth: number;
	slug: string;
	text: string;
};

type UnistNode = {
	type?: string;
	children?: unknown[];
};

type RenderedContent = {
	html: string;
	metadata?: {
		imagePaths?: string[];
		headings?: MarkdownHeading[];
	};
};

type NotionLoaderCache = {
	version: 1;
	databaseId?: string;
	lastSync: string;
	entries: CachedEntry[];
};

const normalizeUrlValue = (value: unknown): string | undefined => {
	if (typeof value === "string") {
		return value;
	}
	if (value instanceof URL) {
		return value.toString();
	}
	return undefined;
};

type RenderedHtmlObject = { html?: string };
type ImageBlockMatch = { block: string; src: string };

type RehypePlugin = (...args: unknown[]) => unknown;

type NotionModuleBlocks = {
	isFullBlock: (value: unknown) => boolean;
	iteratePaginatedAPI: (
		fn: (args: Record<string, unknown>) => Promise<unknown>,
		args: Record<string, unknown>,
	) => AsyncIterable<unknown>;
};

type NotionModuleLoad = {
	Client: new (
		opts: unknown,
	) => {
		blocks: {
			children: { list: (args: Record<string, unknown>) => Promise<unknown> };
		};
	};
	LogLevel?: {
		ERROR?: string;
	};
	isFullPage: (value: unknown) => boolean;
	iteratePaginatedAPI: (
		fn: (args: Record<string, unknown>) => Promise<unknown>,
		args: Record<string, unknown>,
	) => AsyncIterable<unknown>;
};

type NotionPage = {
	id: string;
	last_edited_time: string;
	properties: Record<string, unknown>;
	cover?: unknown;
};

type HtmlElementNode = {
	tagName?: string;
	properties?: { href?: string };
	children?: Array<HtmlElementNode>;
};

type TextNode = { value?: string };

const applyPlugin = (
	processor: unknown,
	plugin: unknown,
	options?: unknown,
): unknown => {
	const typedProcessor = processor as {
		use: (plugin: RehypePlugin, options?: unknown) => unknown;
	};
	const typedPlugin = plugin as RehypePlugin;
	return options === undefined
		? typedProcessor.use(typedPlugin)
		: typedProcessor.use(typedPlugin, options);
};

type RehypePluginConfig =
	| RehypePlugin
	| string
	| readonly [RehypePlugin, unknown];

const isRehypePluginTupleConfig = (
	config: RehypePluginConfig,
): config is readonly [RehypePlugin, unknown] => Array.isArray(config);

const isNotionEntryData = (value: unknown): value is NotionEntryData => {
	if (!value || typeof value !== "object") {
		return false;
	}

	const record = value as Record<string, unknown>;
	return (
		"cover" in record &&
		"properties" in record &&
		typeof record.properties === "object" &&
		record.properties !== null
	);
};

const ensureElementProperties = (node: ElementNode) => {
	if (!node.properties) {
		node.properties = {};
	}
};

const buildProcessor = (
	rehypePlugins: Promise<ReadonlyArray<RehypePluginConfig>>,
) => {
	let headings: MarkdownHeading[] = [];

	const processorPromise = (async () => {
		const [
			{ default: notionRehype },
			{ default: rehypeSlug },
			{ default: rehypeKatex },
			{ default: rehypeStringify },
			{ toc: rehypeToc },
			{ unified },
			{ visit },
		] = await Promise.all([
			import("notion-rehype-k"),
			import("rehype-slug"),
			import("rehype-katex"),
			import("rehype-stringify"),
			import("@jsdevtools/rehype-toc"),
			import("unified"),
			import("unist-util-visit"),
		]);

		const visitElement = visit as (
			tree: UnistNode,
			test: "element",
			visitor: (node: ElementNode) => void,
		) => void;

		const baseProcessor = unified()
			.use(notionRehype, {})
			.use(rehypeSlug)
			.use(function rehypeKatexWorkaround() {
				return (tree: unknown) => {
					visitElement(tree as UnistNode, "element", ensureElementProperties);
				};
			})
			.use(rehypeKatex)
			.use(rehypeStringify);

		const processorWithToc = baseProcessor.use(rehypeToc, {
			customizeTOC(toc: unknown) {
				headings = extractTocHeadings(toc as HtmlElementNode);
				return false;
			},
		});

		const plugins = await rehypePlugins;
		let processor: unknown = processorWithToc;
		for (const config of plugins) {
			let plugin: unknown;
			let options: unknown;
			if (Array.isArray(config)) {
				[plugin, options] = config;
			} else {
				plugin = config;
			}
			if (typeof plugin === "string") {
				plugin = (await import(/* @vite-ignore */ plugin)).default;
			}
			processor = applyPlugin(processor, plugin, options);
		}

		return processor as { process: (value: unknown) => Promise<unknown> };
	})();

	return async function process(blocks: unknown[]) {
		const processor = await processorPromise;
		const vFile = (await processor.process({ data: blocks } as Record<
			string,
			unknown
		>)) as { toString: () => string };
		return { vFile, headings };
	};
};

const awaitAll = async <T>(iterable: AsyncIterable<T>): Promise<T[]> => {
	const result: T[] = [];
	for await (const item of iterable) {
		result.push(item);
	}
	return result;
};

const listBlocks = async function* (
	client: unknown,
	blockId: string,
	resolveImage: (file: unknown) => string | undefined,
) {
	const { isFullBlock, iteratePaginatedAPI } = (await import(
		"@notionhq/client"
	)) as NotionModuleBlocks;
	const typedClient = client as {
		blocks: {
			children: { list: (args: Record<string, unknown>) => Promise<unknown> };
		};
	};
	const listBlockChildren = typedClient.blocks.children.list.bind(
		typedClient.blocks.children,
	);
	for await (const block of iteratePaginatedAPI(listBlockChildren, {
		block_id: blockId,
	})) {
		if (!isFullBlock(block)) {
			continue;
		}
		const typedBlock = block as {
			id: string;
			type: string;
			has_children?: boolean;
			image?: { type: string; caption?: unknown };
		};

		if (typedBlock.has_children) {
			const children = await awaitAll(
				listBlocks(client, typedBlock.id, resolveImage),
			);
			const typedBlockRecord = typedBlock as unknown as Record<
				string,
				{ children?: unknown[] }
			>;
			const entry = typedBlockRecord[typedBlock.type];
			if (entry && typeof entry === "object") {
				entry.children = children;
			}
		}

		if (typedBlock.type === "image" && typedBlock.image) {
			const url = resolveImage(typedBlock.image);
			const baseBlock = typedBlock as unknown as Record<string, unknown>;
			yield {
				...baseBlock,
				image: {
					type: typedBlock.image.type,
					[typedBlock.image.type]: url ?? "",
					caption: typedBlock.image.caption,
				},
			};
			continue;
		}

		yield typedBlock as unknown;
	}
};

const extractTocHeadings = (toc: HtmlElementNode): MarkdownHeading[] => {
	if (toc.tagName !== "nav") {
		return [];
	}

	const listElementToTree = (
		ol: HtmlElementNode | undefined,
		depth: number,
	): MarkdownHeading[] => {
		if (!ol?.children || ol.children.length === 0) {
			return [];
		}
		return ol.children.flatMap((li) => {
			const [_link, subList] = li.children ?? [];
			const link = _link as HtmlElementNode | undefined;
			const currentHeading: MarkdownHeading = {
				depth,
				text: (link?.children?.[0] as TextNode)?.value ?? "",
				slug: link?.properties?.href?.slice(1) ?? "",
			};

			let headings = [currentHeading];
			if (subList) {
				headings = headings.concat(listElementToTree(subList, depth + 1));
			}
			return headings;
		});
	};

	return listElementToTree(toc.children?.[0], 0);
};

type RenderedNotionEntry = {
	html: string;
	metadata: {
		imagePaths: string[];
		headings: MarkdownHeading[];
	};
};

class NotionPageRenderer {
	readonly #imagePaths: string[] = [];
	readonly #logger: LoaderContext["logger"];

	constructor(
		private readonly client: unknown,
		private readonly page: unknown,
		parentLogger: LoaderContext["logger"],
	) {
		const pageData = this.page as {
			id?: string;
			properties?: Record<string, unknown>;
		};
		const pageTitle =
			(pageData?.properties?.Name as { title?: Array<{ plain_text?: string }> })
				?.title?.[0]?.plain_text ?? "unknown";
		this.#logger = parentLogger.fork(
			`page ${pageData?.id ?? "unknown"} (Name ${pageTitle})`,
		);
	}

	getPageData() {
		const page = this.page as {
			id: string;
			icon?: unknown;
			cover?: unknown;
			archived?: boolean;
			in_trash?: boolean;
			url?: string;
			public_url?: string;
			properties?: Record<string, unknown>;
		};
		return {
			id: page.id,
			data: {
				icon: page.icon,
				cover: page.cover,
				archived: page.archived,
				in_trash: page.in_trash,
				url: page.url,
				public_url: page.public_url,
				properties: page.properties,
			},
		};
	}

	async render(
		process: ReturnType<typeof buildProcessor>,
	): Promise<RenderedNotionEntry | undefined> {
		this.#logger.debug("Rendering");
		try {
			const pageId = (this.page as { id?: string }).id;
			if (!pageId) {
				this.#logger.error("Missing page id");
				return undefined;
			}
			const blocks = await awaitAll(
				listBlocks(this.client, pageId, this.#resolveImage),
			);
			const { vFile, headings } = await process(blocks);
			this.#logger.debug("Rendered");
			return {
				html: vFile.toString(),
				metadata: {
					headings,
					imagePaths: this.#imagePaths,
				},
			};
		} catch (error) {
			this.#logger.error(
				`Failed to render: ${error instanceof Error ? error.message : String(error)}`,
			);
			return undefined;
		}
	}

	readonly #resolveImage = (file: unknown): string | undefined => {
		const url = fileToUrl(file as FileObject | null | undefined);
		if (url) {
			this.#imagePaths.push(url);
		}
		return url;
	};
}

const importNotionModule = async (
	traceMode: string,
): Promise<NotionModuleLoad> => {
	try {
		return (await import("@notionhq/client")) as unknown as NotionModuleLoad;
	} catch (error) {
		if (traceMode) {
			throw new Error(
				`notion-loader: failed to import @notionhq/client: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
		throw error;
	}
};

const processPageUpdate = async (
	typedPage: NotionPage,
	store: LoaderContext["store"],
	parseData: LoaderContext["parseData"],
	notionClient: InstanceType<NotionModuleLoad["Client"]>,
	logger: LoaderContext["logger"],
	processor: ReturnType<typeof buildProcessor> | null,
	traceMode: string,
): Promise<void> => {
	const existingPage = store.get(typedPage.id);
	if (existingPage?.digest === typedPage.last_edited_time) {
		return;
	}
	if (traceMode === "before-parse") {
		throw new Error("notion-loader: reached before-parse stage");
	}
	const renderer = new NotionPageRenderer(notionClient, typedPage, logger);
	const data = await parseData(renderer.getPageData());
	if (traceMode === "after-parse") {
		throw new Error("notion-loader: reached after-parse stage");
	}
	if (!processor) {
		store.set({
			id: typedPage.id,
			digest: typedPage.last_edited_time,
			data,
		});
		if (traceMode === "after-store") {
			throw new Error("notion-loader: reached after-store stage");
		}
		return;
	}
	const rendered = await renderer.render(processor);
	if (!rendered) {
		return;
	}
	store.set({
		id: typedPage.id,
		digest: typedPage.last_edited_time,
		data,
		rendered,
	});
};

const cleanupStalePages = (
	store: LoaderContext["store"],
	existingPageIds: Set<string>,
) => {
	for (const deletedPageId of existingPageIds) {
		store.delete(deletedPageId);
	}
};

const createNotionLoaderNoImages = ({
	database_id,
	filter_properties,
	sorts,
	filter,
	archived,
	rehypePlugins = [],
	...clientOptions
}: NotionLoaderOptions): Loader => {
	const resolvedRehypePlugins: Promise<ReadonlyArray<RehypePluginConfig>> =
		Promise.all(
			rehypePlugins.map(async (config) => {
				let plugin: RehypePlugin | string;
				let options: unknown;
				if (isRehypePluginTupleConfig(config)) {
					[plugin, options] = config;
				} else {
					plugin = config;
				}
				if (typeof plugin === "string") {
					plugin = (await import(/* @vite-ignore */ plugin))
						.default as RehypePlugin;
				}

				return options === undefined ? plugin : ([plugin, options] as const);
			}),
		);
	const shouldRender = process.env.NOTION_LOADER_RENDER !== "0";

	return {
		name: "notion-loader-no-images",
		async load({ store, logger, parseData }) {
			const traceMode = process.env.NOTION_LOADER_TRACE ?? "";
			const notionModule = await importNotionModule(traceMode);
			const { Client, isFullPage, iteratePaginatedAPI } = notionModule;
			let stage = "init";
			try {
				stage = "create-client";
				const notionClient = new Client({
					...clientOptions,
					logLevel: notionModule.LogLevel?.ERROR ?? "error",
				});
				const processor = shouldRender
					? buildProcessor(resolvedRehypePlugins)
					: null;
				logger.info("Loading notion pages");
				const existingPageIds = new Set<string>(store.keys());
				const renderPromises: Promise<void>[] = [];

				if (traceMode === "pre-query") {
					throw new Error("notion-loader: reached pre-query stage");
				}

				stage = "query";
				const auth = (clientOptions as Record<string, unknown>).auth as string;
				const queryDatabase = async (
					args: Record<string, unknown>,
				): Promise<Record<string, unknown>> => {
					const res = await fetch(
						`https://api.notion.com/v1/databases/${database_id}/query`,
						{
							method: "POST",
							headers: {
								Authorization: `Bearer ${auth}`,
								"Notion-Version": "2022-06-28",
								"Content-Type": "application/json",
							},
							body: JSON.stringify(args),
						},
					);
					if (!res.ok) {
						const err = await res.json().catch(() => ({}));
						throw new Error(
							(err as Record<string, string>).message ??
								`Notion API error: ${res.status}`,
						);
					}
					return res.json() as Promise<Record<string, unknown>>;
				};
				const pages = iteratePaginatedAPI(queryDatabase, {
					filter_properties,
					sorts,
					filter,
					archived,
				});
				if (traceMode === "post-query") {
					throw new Error("notion-loader: reached post-query stage");
				}
				stage = "iterate";
				for await (const page of pages) {
					if (traceMode === "iterate") {
						throw new Error("notion-loader: reached iterate stage");
					}
					if (!isFullPage(page)) {
						continue;
					}
					const typedPage = page as NotionPage;
					existingPageIds.delete(typedPage.id);
					renderPromises.push(
						processPageUpdate(
							typedPage,
							store,
							parseData,
							notionClient,
							logger,
							processor,
							traceMode,
						),
					);
				}

				stage = "cleanup";
				cleanupStalePages(store, existingPageIds);

				stage = "await";
				await Promise.all(renderPromises);
			} catch (error) {
				if (traceMode) {
					throw new Error(
						`notion-loader: stage ${stage} failed: ${error instanceof Error ? error.message : String(error)}`,
						{ cause: error },
					);
				}
				throw error;
			}
		},
	};
};

const stripCoverFromRendered = (
	rendered: CachedEntry["rendered"],
	coverUrl?: string,
	imageBlockToRemove?: string,
): CachedEntry["rendered"] => {
	if (!rendered || typeof rendered !== "object") {
		return rendered;
	}
	const renderedObj = rendered as { html?: unknown };
	if (typeof renderedObj.html !== "string") {
		return rendered;
	}
	const html = renderedObj.html;
	if (!coverUrl && !imageBlockToRemove) {
		return rendered;
	}
	if (imageBlockToRemove) {
		const nextHtml = html.replace(imageBlockToRemove, "");
		return nextHtml === renderedObj.html
			? rendered
			: { ...renderedObj, html: nextHtml };
	}

	if (!coverUrl) {
		return rendered;
	}

	// Escape special regex characters in the cover URL so it matches literally
	const escapedUrl = coverUrl
		.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)
		.replaceAll("&", "(?:&|&amp;|&#x26;|&#38;)");
	// Target the specific notion-image div containing the cover URL, not just the first one
	const imageBlock = new RegExp(
		String.raw`<div class="notion-image">[\s\S]*?${escapedUrl}[\s\S]*?<\/div>`,
		"i",
	);
	const nextHtml = html.replace(imageBlock, "");
	return nextHtml === renderedObj.html
		? rendered
		: { ...renderedObj, html: nextHtml };
};

const ensureCacheDir = async (cacheUrl: URL) => {
	const cachePath = fileURLToPath(cacheUrl);
	const cacheDir = path.dirname(cachePath);
	await mkdir(cacheDir, { recursive: true });
};

const readCache = async (cacheUrl: URL): Promise<NotionLoaderCache | null> => {
	try {
		const cachePath = fileURLToPath(cacheUrl);
		const raw = await readFile(cachePath, "utf-8");
		const parsed = JSON.parse(raw) as NotionLoaderCache;
		if (!parsed || !Array.isArray(parsed.entries)) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
};

const writeCache = async (cacheUrl: URL, cache: NotionLoaderCache) => {
	await ensureCacheDir(cacheUrl);
	const cachePath = fileURLToPath(cacheUrl);
	await writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf-8");
};

const importArticleMapper = async (traceMode: string) => {
	try {
		const mod = await import("./notion-article.mapper");
		return mod.mapNotionArticleEntry;
	} catch (error) {
		if (traceMode === "map-import") {
			throw new Error(
				`notion-loader: mapper import failed: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
		throw error;
	}
};

const extractCoverFromContent = (
	entry: { rendered?: unknown; data: unknown },
	hasCover: boolean,
): string | undefined => {
	if (hasCover) {
		return undefined;
	}
	const renderedMetadata = (
		entry.rendered as { metadata?: unknown } | undefined
	)?.metadata as { imagePaths?: unknown } | undefined;
	const imagePaths = Array.isArray(renderedMetadata?.imagePaths)
		? renderedMetadata?.imagePaths
		: [];
	return normalizeUrlValue(imagePaths[0]);
};

const getRenderedHtmlObject = (
	rendered: CachedEntry["rendered"],
): RenderedHtmlObject | undefined => {
	if (!rendered || typeof rendered !== "object") {
		return undefined;
	}

	return rendered as RenderedHtmlObject;
};

const getRenderedHtml = (rendered: CachedEntry["rendered"]): string => {
	const renderedObj = getRenderedHtmlObject(rendered);
	return typeof renderedObj?.html === "string" ? renderedObj.html : "";
};

const decodeHtmlAttribute = (value: string): string =>
	value.replaceAll(/&#x26;|&#38;|&amp;/g, "&");

const NOTION_IMAGE_BLOCK_PATTERN = /<div class="notion-image">[\s\S]*?<\/div>/g;

const extractImageBlocks = (html: string): ImageBlockMatch[] =>
	Array.from(html.matchAll(NOTION_IMAGE_BLOCK_PATTERN), (match) => {
		const block = match[0];
		const src = /<img[^>]+src="([^"]+)"/.exec(block)?.[1];
		return src
			? {
					block,
					src: decodeHtmlAttribute(src),
				}
			: undefined;
	}).filter((match): match is ImageBlockMatch => match !== undefined);

const findFirstUsableImageBlock = (html: string): ImageBlockMatch | undefined =>
	extractImageBlocks(html).find(({ src }) => !isNotionS3Url(src));

const findImageBlockBySrc = (
	html: string,
	targetSrc: string,
): ImageBlockMatch | undefined => {
	const normalizedTargetSrc = decodeHtmlAttribute(targetSrc);
	return extractImageBlocks(html).find(
		({ src }) => decodeHtmlAttribute(src) === normalizedTargetSrc,
	);
};

const resolvePersistedCover = async (
	entry: CachedEntry,
	imageDir: string,
	logger: LoaderContext["logger"],
): Promise<Pick<CachedEntry, "data" | "rendered">> => {
	let { cover } = entry.data;
	let { rendered } = entry;

	if (!cover || !isNotionS3Url(cover)) {
		return { data: { ...entry.data, cover }, rendered };
	}

	try {
		cover = await downloadNotionImage(cover, imageDir, logger);
	} catch (error) {
		logger.debug(
			`Failed to download cover for ${entry.id}: ${error instanceof Error ? error.message : String(error)}`,
		);
	}

	if (cover && isNotionS3Url(cover)) {
		logger.warn(
			`Cover image expired for ${entry.id}, extracting fallback from content`,
		);
		const fallbackImageBlock = findFirstUsableImageBlock(
			getRenderedHtml(rendered),
		);
		if (fallbackImageBlock) {
			cover = fallbackImageBlock.src;
			rendered = stripCoverFromRendered(
				rendered,
				cover,
				fallbackImageBlock.block,
			);
		}
	}

	return { data: { ...entry.data, cover }, rendered };
};

const persistInlineRenderedImages = async (
	entry: CachedEntry,
	imageDir: string,
	logger: LoaderContext["logger"],
): Promise<CachedEntry["rendered"]> => {
	const renderedObj = getRenderedHtmlObject(entry.rendered);
	if (typeof renderedObj?.html !== "string") {
		return entry.rendered;
	}

	try {
		const processedHtml = await downloadImagesInHtml(
			renderedObj.html,
			imageDir,
			logger,
		);
		return processedHtml === renderedObj.html
			? entry.rendered
			: { ...renderedObj, html: processedHtml };
	} catch (error) {
		logger.debug(
			`Failed to process inline images for ${entry.id}: ${error instanceof Error ? error.message : String(error)}`,
		);
		return entry.rendered;
	}
};

const mapEntries = async (
	context: LoaderContext,
	options: Pick<
		CachedNotionLoaderOptions,
		| "platformId"
		| "requiredType"
		| "requiredStatus"
		| "defaultAuthorId"
		| "defaultCategoryId"
		| "defaultTags"
	>,
) => {
	const traceMode = process.env.NOTION_LOADER_TRACE ?? "";
	const mapNotionArticleEntry = await importArticleMapper(traceMode);
	const mappedEntries: CachedEntry[] = [];
	const rawEntries = context.store.entries();
	context.store.clear();

	for (const [sourceId, entry] of rawEntries) {
		if (!isNotionEntryData(entry.data)) {
			context.logger.warn(`Skipping malformed Notion entry: ${sourceId}`);
			continue;
		}

		const mapped = mapNotionArticleEntry(entry.data, sourceId, {
			logger: context.logger,
			platformId: options.platformId,
			requiredType: options.requiredType,
			requiredStatus: options.requiredStatus,
			defaultAuthorId: options.defaultAuthorId,
			defaultCategoryId: options.defaultCategoryId,
			defaultTags: options.defaultTags,
		});
		if (!mapped) {
			continue;
		}

		const coverFromContent = extractCoverFromContent(
			entry,
			!!mapped.data.cover,
		);

		if (traceMode === "map-before-parse") {
			throw new Error("notion-loader: reached map-before-parse stage");
		}
		const parsedData = await context.parseData({
			id: mapped.id,
			data: {
				...mapped.data,
				cover: coverFromContent ?? mapped.data.cover,
			},
		});
		if (traceMode === "map-after-parse") {
			throw new Error("notion-loader: reached map-after-parse stage");
		}
		const coverBlock = coverFromContent
			? findImageBlockBySrc(getRenderedHtml(entry.rendered), coverFromContent)
			: undefined;
		const renderedWithCover = coverFromContent
			? stripCoverFromRendered(
					entry.rendered,
					coverFromContent,
					coverBlock?.block,
				)
			: entry.rendered;

		context.store.set({
			id: mapped.id,
			data: parsedData,
			rendered: renderedWithCover as RenderedContent | undefined,
			body: entry.body,
			digest: entry.digest ?? context.generateDigest(parsedData),
		});

		mappedEntries.push({
			id: mapped.id,
			data: parsedData,
			rendered: renderedWithCover as RenderedContent | undefined,
			body: entry.body,
			digest: entry.digest,
			sourceId,
		});
	}

	return mappedEntries;
};

const processNotionImages = async (
	entries: CachedEntry[],
	imageDir: string,
	context: LoaderContext,
): Promise<CachedEntry[]> => {
	const logger = context.logger;
	const processed: CachedEntry[] = [];

	for (const entry of entries) {
		const withPersistedCover = await resolvePersistedCover(
			entry,
			imageDir,
			logger,
		);
		const rendered = await persistInlineRenderedImages(
			{ ...entry, ...withPersistedCover },
			imageDir,
			logger,
		);

		const updatedEntry: CachedEntry = {
			...entry,
			data: withPersistedCover.data,
			rendered,
		};

		// Update the store with persisted image paths
		context.store.set({
			id: updatedEntry.id,
			data: updatedEntry.data,
			rendered: updatedEntry.rendered as RenderedContent | undefined,
			body: updatedEntry.body,
			digest: updatedEntry.digest ?? context.generateDigest(updatedEntry.data),
		});

		processed.push(updatedEntry);
	}

	assertNoRemoteNotionImages(
		processed.map((entry) => ({
			id: entry.id,
			data: { cover: entry.data.cover },
			body: getRenderedHtml(entry.rendered),
		})),
	);

	return processed;
};

const applyCache = async (
	context: LoaderContext,
	cacheUrl: URL,
): Promise<boolean> => {
	const cache = await readCache(cacheUrl);
	if (!cache) {
		return false;
	}

	context.store.clear();
	const parsedEntries: CachedEntry[] = [];
	for (const entry of cache.entries) {
		const parsedData = await context.parseData({
			id: entry.id,
			data: entry.data,
		});
		context.store.set({
			id: entry.id,
			data: parsedData,
			rendered: entry.rendered as RenderedContent | undefined,
			body: entry.body,
			digest: entry.digest ?? context.generateDigest(parsedData),
		});
		parsedEntries.push({
			id: entry.id,
			data: parsedData,
			rendered: entry.rendered as RenderedContent | undefined,
			body: entry.body,
			digest: entry.digest,
			sourceId: entry.sourceId,
		});
	}

	// Download any S3 images that haven't been persisted yet
	// (e.g. from caches created before image downloading was added).
	const imageDir = resolveImageDir(cacheUrl);
	const persistedEntries = await processNotionImages(
		parsedEntries,
		imageDir,
		context,
	);

	// Update the cache with local paths so subsequent builds don't
	// need to re-download (even if the S3 URLs have expired).
	const hasS3Urls = cache.entries.some((entry) => {
		if (entry.data.cover && isNotionS3Url(entry.data.cover)) {
			return true;
		}
		const html =
			entry.rendered &&
			typeof entry.rendered === "object" &&
			typeof (entry.rendered as { html?: string }).html === "string"
				? (entry.rendered as { html: string }).html
				: "";
		return containsS3Url(html);
	});
	const entriesChanged =
		JSON.stringify(persistedEntries) !== JSON.stringify(cache.entries);
	if (hasS3Urls && entriesChanged) {
		await writeCache(cacheUrl, {
			...cache,
			entries: persistedEntries,
		});
	}

	return true;
};

export const createCachedNotionLoader = (
	options: CachedNotionLoaderOptions,
): Loader => {
	const {
		cacheUrl,
		platformId,
		requiredType,
		requiredStatus,
		defaultAuthorId,
		defaultCategoryId,
		defaultTags,
		...loaderOptions
	} = options;
	const baseLoader = createNotionLoaderNoImages(loaderOptions);

	return {
		name: "notion-articles-loader",
		async load(context) {
			if (!loaderOptions.auth || !loaderOptions.database_id) {
				context.logger.info(
					"Notion credentials missing; falling back to cached entries.",
				);
				const hasCache = await applyCache(context, cacheUrl);
				if (!hasCache) {
					context.logger.warn(
						"No Notion cache found; continuing without Notion entries.",
					);
				}
				return;
			}

			try {
				await baseLoader.load({
					...context,
					parseData: async ({ data }) => data,
				});
				if (process.env.NOTION_LOADER_SKIP_MAP === "1") {
					return;
				}

				const mappedEntries = await mapEntries(context, {
					platformId,
					requiredType,
					requiredStatus,
					defaultAuthorId,
					defaultCategoryId,
					defaultTags,
				});

				// Download Notion S3 images to local public directory
				// so they persist beyond the ~1h S3 signed URL expiry.
				const imageDir = resolveImageDir(cacheUrl);
				const persistedEntries = await processNotionImages(
					mappedEntries,
					imageDir,
					context,
				);

				await writeCache(cacheUrl, {
					version: 1,
					databaseId: loaderOptions.database_id,
					lastSync: new Date().toISOString(),
					entries: persistedEntries,
				});
			} catch (error) {
				if (error instanceof FatalNotionValidationError) {
					throw error;
				}

				const errorMessage =
					error instanceof Error ? error.message : String(error);
				context.logger.info(
					`Notion loader failed; attempting cache fallback. ${errorMessage}`,
				);
				if (/api token is invalid/i.test(errorMessage)) {
					context.logger.info(
						"Notion token rejected. Check NOTION_TOKEN in build env and re-share the database with the integration.",
					);
				}
				if (/could not find database|object not found/i.test(errorMessage)) {
					context.logger.info(
						"Notion database not found or not shared. Verify NOTION_DATABASE_ID and ensure the integration has access.",
					);
				}
				const hasCache = await applyCache(context, cacheUrl);
				if (!hasCache) {
					context.logger.warn(
						"No Notion cache found; continuing without Notion entries.",
					);
				}
			}
		},
	};
};
