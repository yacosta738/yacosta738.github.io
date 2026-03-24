import * as path from "node:path";
import { Client, isFullPage, iteratePaginatedAPI } from "@notionhq/client";
import type { RehypePlugins } from "astro";
import type { Loader } from "astro/loaders";
import { dim } from "kleur/colors";

import { propertiesSchemaForDatabase } from "./database-properties.js";
import { VIRTUAL_CONTENT_ROOT } from "./image.js";
import {
	buildProcessor,
	NotionPageRenderer,
	type RehypePlugin,
} from "./render.js";
import { notionPageSchema } from "./schemas/page.js";
import * as transformedPropertySchema from "./schemas/transformed-properties.js";
import type { ClientOptions, QueryDatabaseParameters } from "./types.js";

export interface NotionLoaderOptions
	extends Pick<
			ClientOptions,
			"auth" | "timeoutMs" | "baseUrl" | "notionVersion" | "fetch" | "agent"
		>,
		Pick<
			QueryDatabaseParameters,
			"database_id" | "filter_properties" | "sorts" | "filter" | "archived"
		> {
	/**
	 * Pass rehype plugins to customize how the Notion output HTML is processed.
	 * You can import and apply the plugin function (recommended), or pass the plugin name as a string.
	 */
	rehypePlugins?: RehypePlugins;
	/**
	 * The name of the collection, only used for logging and debugging purposes.
	 * Useful for multiple loaders to differentiate their logs.
	 */
	collectionName?: string;
	/**
	 * The path to save the images.
	 * Defaults to 'public'.
	 */
	publicPath?: string;
	/**
	 * MUST STORED IN `src` TO BE PROCESSED PROPERLY
	 * The path to save the images relative to `src`.
	 * Defaults to 'assets/images/notion'.
	 */
	imageSavePath?: string;
	/**
	 * Whether to cache images in the data.
	 * Defaults to `false`.
	 */
	experimentalCacheImageInData?: boolean;
	/**
	 * The root alias for the images.
	 * Defaults to `src`.
	 */
	experimentalRootSourceAlias?: string;
}

const DEFAULT_IMAGE_SAVE_PATH = "assets/images/notion";

/**
 * Notion loader for the Astro Content Layer API.
 *
 * It allows you to load pages from a Notion database then render them as pages in a collection.
 *
 * @param options Takes in same options as `notionClient.databases.query` and `Client` constructor.
 *
 * @example
 * // src/content/config.ts
 * import { defineCollection } from "astro:content";
 * import { notionLoader } from "notion-astro-loader";
 *
 * const database = defineCollection({
 *   loader: notionLoader({
 *     auth: import.meta.env.NOTION_TOKEN,
 *     database_id: import.meta.env.NOTION_DATABASE_ID,
 *     filter: {
 *       property: "Hidden",
 *       checkbox: { equals: false },
 *     }
 *   }),
 * });
 */
export function notionLoader({
	database_id,
	filter_properties,
	sorts,
	filter,
	archived,
	collectionName,
	imageSavePath = DEFAULT_IMAGE_SAVE_PATH,
	rehypePlugins = [],
	experimentalCacheImageInData = false,
	experimentalRootSourceAlias = "src",
	...clientOptions
}: NotionLoaderOptions): Loader {
	const notionClient = new Client(clientOptions);

	const resolvedRehypePlugins = Promise.all(
		rehypePlugins.map(async (config) => {
			let plugin: RehypePlugin | string;
			let options: unknown;
			if (Array.isArray(config)) {
				[plugin, options] = config;
			} else {
				plugin = config;
			}

			if (typeof plugin === "string") {
				plugin = (await import(/* @vite-ignore */ plugin))
					.default as RehypePlugin;
			}
			return [plugin, options] as const;
		}),
	);
	const processor = buildProcessor(resolvedRehypePlugins);

	return {
		name: collectionName ? `notion-loader/${collectionName}` : "notion-loader",
		createSchema: async () => ({
			schema: notionPageSchema({
				properties: await propertiesSchemaForDatabase(
					notionClient,
					database_id,
				),
			}),
			types: "",
		}),
		async load(ctx) {
			const { store, logger: log_db, parseData } = ctx;

			const existingPageIds = new Set<string>(store.keys());
			const renderPromises: Promise<void>[] = [];

			const storeInfo = dim(`found ${existingPageIds.size} pages in store`);
			log_db.info(`Loading database ${storeInfo}`);

			const pages = iteratePaginatedAPI(notionClient.databases.query, {
				database_id,
				filter_properties,
				sorts,
				filter,
				archived,
			});
			let pageCount = 0;

			for await (const page of pages) {
				if (!isFullPage(page)) {
					continue;
				}

				pageCount++;

				const log_pg = log_db.fork(`${log_db.label}/${page.id.slice(0, 6)}`);

				// Create metadata for logging
				const titleProp = Object.entries(page.properties).find(
					([_, property]) => property.type === "title",
				);
				const pageTitle = transformedPropertySchema.title.safeParse(
					titleProp ? titleProp[1] : {},
				);
				const titleLabel = pageTitle.success
					? `"${pageTitle.data}"`
					: "Untitled";
				const pageMetadata = [
					titleLabel,
					`(last edited ${page.last_edited_time.slice(0, 10)})`,
				].join(" ");

				const isCached = existingPageIds.delete(page.id);
				const existingPage = store.get(page.id);
				const pageIsUnchanged = existingPage?.digest === page.last_edited_time;

				// If the page has been updated, re-render it
				if (!pageIsUnchanged) {
					const realSavePath = path.resolve(
						process.cwd(),
						"src",
						imageSavePath,
					);

					const renderer = new NotionPageRenderer(
						notionClient,
						page,
						realSavePath,
						log_pg,
					);

					const data = await parseData(
						await renderer.getPageData(
							experimentalCacheImageInData,
							experimentalRootSourceAlias,
						),
					);

					const renderPromise = renderer
						.render(processor)
						.then((rendered) => {
							store.set({
								id: page.id,
								digest: page.last_edited_time,
								data,
								rendered,
								filePath: `${VIRTUAL_CONTENT_ROOT}/${page.id}.md`, // Not important — just needs to exist.
								assetImports: rendered?.metadata.imagePaths,
							});
						})
						.catch((error) => {
							log_pg.error(
								`Render failed for page ${page.id}: ${error instanceof Error ? error.message : String(error)}`,
							);
						});

					renderPromises.push(renderPromise);

					log_pg.info(
						`${isCached ? "Updated" : "Created"} page ${dim(pageMetadata)}`,
					);
				} else {
					log_pg.debug(`Skipped page ${dim(pageMetadata)}`);
				}
			}

			// Remove any pages that have been deleted
			for (const deletedPageId of existingPageIds) {
				const log_pg = log_db.fork(
					`${log_db.label}/${deletedPageId.slice(0, 6)}`,
				);

				store.delete(deletedPageId);
				log_pg.info("Deleted page");
			}

			const fetchInfo = dim(`fetched ${pageCount} pages from API`);
			log_db.info(`Loaded database ${fetchInfo}`);

			if (renderPromises.length === 0) {
				return;
			}

			// Wait for rendering to complete
			log_db.info(`Rendering ${renderPromises.length} updated pages`);
			await Promise.all(renderPromises);
			log_db.info(`Rendered ${renderPromises.length} pages`);
		},
	};
}
