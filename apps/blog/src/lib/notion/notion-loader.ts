import type { RenderedContent } from "astro:content";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
	HtmlElementNode,
	ListNode,
	TextNode,
} from "@jsdevtools/rehype-toc";
import { toc as rehypeToc } from "@jsdevtools/rehype-toc";
import {
	Client,
	isFullBlock,
	isFullPage,
	iteratePaginatedAPI,
} from "@notionhq/client";
import type { MarkdownHeading } from "astro";
import type { Loader, LoaderContext } from "astro/loaders";
import type { Element as ElementNode, Root } from "hast";
import { fileToUrl, type NotionLoaderOptions } from "notion-astro-loader";
import notionRehype from "notion-rehype-k";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { type Plugin, unified } from "unified";
import { visit } from "unist-util-visit";
import {
	mapNotionArticleEntry,
	type NotionArticleData,
} from "./notion-article.mapper";

type CachedNotionLoaderOptions = NotionLoaderOptions & {
	cacheUrl: URL;
	platformId?: string;
	requiredType?: string;
	requiredStatus?: string;
	defaultAuthorId?: string;
	defaultCategoryId?: string;
	defaultTags?: string[];
};

type CachedEntry = {
	id: string;
	data: NotionArticleData;
	rendered?: unknown;
	digest?: string | number;
	body?: string;
	sourceId?: string;
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

type RehypePlugin = Plugin<unknown[], Root>;

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

const baseProcessor = unified()
	.use(notionRehype, {})
	.use(rehypeSlug)
	.use(function rehypeKatexWorkaround() {
		return (tree) => {
			visit(tree, "element", (node: ElementNode) => {
				if (!node.properties) {
					node.properties = {};
				}
			});
		};
	})
	.use(rehypeKatex as unknown as Plugin)
	.use(rehypeStringify);

type RehypePluginConfig = unknown | string | readonly [unknown, unknown];

const buildProcessor = (
	rehypePlugins: Promise<ReadonlyArray<RehypePluginConfig>>,
) => {
	let headings: MarkdownHeading[] = [];

	const processorWithToc = baseProcessor().use(rehypeToc, {
		customizeTOC(toc) {
			headings = extractTocHeadings(toc as HtmlElementNode);
			return false;
		},
	});

	const processorPromise = rehypePlugins.then((plugins) => {
		let processor: unknown = processorWithToc;
		for (const config of plugins) {
			let plugin: unknown;
			let options: unknown;
			if (Array.isArray(config)) {
				[plugin, options] = config;
			} else {
				plugin = config;
			}
			processor = applyPlugin(processor, plugin, options);
		}
		return processor as ReturnType<typeof unified>;
	});

	return async function process(blocks: unknown[]) {
		const processor = await processorPromise;
		const vFile = await processor.process({ data: blocks } as Record<
			string,
			unknown
		>);
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
	client: Client,
	blockId: string,
	resolveImage: (file: unknown) => string | undefined,
) {
	for await (const block of iteratePaginatedAPI(client.blocks.children.list, {
		block_id: blockId,
	})) {
		if (!isFullBlock(block)) {
			continue;
		}

		if (block.has_children) {
			const children = await awaitAll(
				listBlocks(client, block.id, resolveImage),
			);
			const typedBlock = block as unknown as Record<
				string,
				{ children?: unknown[] }
			>;
			const entry = typedBlock[block.type];
			if (entry && typeof entry === "object") {
				entry.children = children;
			}
		}

		if (block.type === "image") {
			const url = resolveImage(block.image);
			yield {
				...block,
				image: {
					type: block.image.type,
					[block.image.type]: url ?? "",
					caption: block.image.caption,
				},
			};
			continue;
		}

		yield block;
	}
};

const extractTocHeadings = (toc: HtmlElementNode): MarkdownHeading[] => {
	if (toc.tagName !== "nav") {
		return [];
	}

	const listElementToTree = (
		ol: ListNode,
		depth: number,
	): MarkdownHeading[] => {
		return ol.children.flatMap((li) => {
			const [_link, subList] = li.children;
			const link = _link as HtmlElementNode;
			const currentHeading: MarkdownHeading = {
				depth,
				text: (link.children?.[0] as TextNode)?.value ?? "",
				slug: (link.properties?.href as string | undefined)?.slice(1) ?? "",
			};

			let headings = [currentHeading];
			if (subList) {
				headings = headings.concat(
					listElementToTree(subList as ListNode, depth + 1),
				);
			}
			return headings;
		});
	};

	return listElementToTree(toc.children?.[0] as ListNode, 0);
};

type RenderedNotionEntry = {
	html: string;
	metadata: {
		imagePaths: string[];
		headings: MarkdownHeading[];
	};
};

class NotionPageRenderer {
	#imagePaths: string[] = [];
	#logger: LoaderContext["logger"];

	constructor(
		private readonly client: Client,
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

	#resolveImage = (file: unknown): string | undefined => {
		const url = fileToUrl(file as Parameters<typeof fileToUrl>[0]);
		if (url) {
			this.#imagePaths.push(url);
		}
		return url;
	};
}

const createNotionLoaderNoImages = ({
	database_id,
	filter_properties,
	sorts,
	filter,
	archived,
	rehypePlugins = [],
	...clientOptions
}: NotionLoaderOptions): Loader => {
	const notionClient = new Client(clientOptions);
	const resolvedRehypePlugins = Promise.all(
		rehypePlugins.map(async (config) => {
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
			return [plugin, options] as const;
		}),
	);
	const processor = buildProcessor(resolvedRehypePlugins);

	return {
		name: "notion-loader-no-images",
		async load({ store, logger, parseData }) {
			logger.info("Loading notion pages");
			const existingPageIds = new Set<string>(store.keys());
			const renderPromises: Promise<void>[] = [];

			const pages = iteratePaginatedAPI(notionClient.databases.query, {
				database_id,
				filter_properties,
				sorts,
				filter,
				archived,
			});
			for await (const page of pages) {
				if (!isFullPage(page)) {
					continue;
				}

				existingPageIds.delete(page.id);
				const existingPage = store.get(page.id);
				if (existingPage?.digest !== page.last_edited_time) {
					const renderer = new NotionPageRenderer(notionClient, page, logger);
					const data = await parseData(renderer.getPageData());
					const renderPromise = renderer.render(processor).then((rendered) => {
						if (!rendered) {
							return;
						}
						store.set({
							id: page.id,
							digest: page.last_edited_time,
							data,
							rendered,
						});
					});
					renderPromises.push(renderPromise);
				}
			}

			for (const deletedPageId of existingPageIds) {
				store.delete(deletedPageId);
			}

			await Promise.all(renderPromises);
		},
	};
};

const stripCoverFromRendered = (
	rendered: CachedEntry["rendered"],
	coverUrl?: string,
): CachedEntry["rendered"] => {
	if (!rendered || typeof rendered !== "object") {
		return rendered;
	}
	const renderedObj = rendered as { html?: unknown };
	if (typeof renderedObj.html !== "string") {
		return rendered;
	}
	const html = renderedObj.html;
	const imageBlock = /<div class="notion-image">[\s\S]*?<\/div>/i;
	const nextHtml = coverUrl ? html.replace(imageBlock, "") : html;
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
	const mappedEntries: CachedEntry[] = [];
	const rawEntries = context.store.entries();
	context.store.clear();

	for (const [sourceId, entry] of rawEntries) {
		const mapped = mapNotionArticleEntry(
			entry.data as {
				properties: Record<string, unknown>;
				cover: unknown | null;
			},
			sourceId,
			{
				logger: context.logger,
				platformId: options.platformId,
				requiredType: options.requiredType,
				requiredStatus: options.requiredStatus,
				defaultAuthorId: options.defaultAuthorId,
				defaultCategoryId: options.defaultCategoryId,
				defaultTags: options.defaultTags,
			},
		);
		if (!mapped) {
			continue;
		}

		const renderedMetadata = (
			entry.rendered as { metadata?: unknown } | undefined
		)?.metadata as { imagePaths?: unknown } | undefined;
		const imagePaths = Array.isArray(renderedMetadata?.imagePaths)
			? renderedMetadata?.imagePaths
			: [];
		const coverFromContent = !mapped.data.cover
			? normalizeUrlValue(imagePaths[0])
			: undefined;

		const parsedData = await context.parseData({
			id: mapped.id,
			data: {
				...mapped.data,
				cover: coverFromContent ?? mapped.data.cover,
			},
		});
		const renderedWithCover = coverFromContent
			? stripCoverFromRendered(entry.rendered, coverFromContent)
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

const applyCache = async (
	context: LoaderContext,
	cacheUrl: URL,
): Promise<boolean> => {
	const cache = await readCache(cacheUrl);
	if (!cache) {
		return false;
	}

	context.store.clear();
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
				context.logger.warn(
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

				const mappedEntries = await mapEntries(context, {
					platformId,
					requiredType,
					requiredStatus,
					defaultAuthorId,
					defaultCategoryId,
					defaultTags,
				});
				await writeCache(cacheUrl, {
					version: 1,
					databaseId: loaderOptions.database_id,
					lastSync: new Date().toISOString(),
					entries: mappedEntries,
				});
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				context.logger.warn(
					`Notion loader failed; attempting cache fallback. ${errorMessage}`,
				);
				if (/api token is invalid/i.test(errorMessage)) {
					context.logger.warn(
						"Notion token rejected. Check NOTION_TOKEN in build env and re-share the database with the integration.",
					);
				}
				if (/could not find database|object not found/i.test(errorMessage)) {
					context.logger.warn(
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
