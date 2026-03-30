import type {
	Client,
	DataSourceObjectResponse,
	QueryDataSourceParameters,
} from "@notionhq/client";

export type { PageObjectResponse } from "@notionhq/client";

/**
 * @module
 * Types from the internal Notion JS API, exposed for use in this project.
 */

export type ClientOptions = NonNullable<
	ConstructorParameters<typeof Client>[0]
>;

export interface QueryDatabaseParameters extends QueryDataSourceParameters {}

export type DatabasePropertyConfigResponse =
	DataSourceObjectResponse["properties"][string];

export type PageProperty =
	import("@notionhq/client").PageObjectResponse["properties"][string];
export type EmojiRequest = Extract<
	import("@notionhq/client").PageObjectResponse["icon"],
	{ type: "emoji" }
>["emoji"];

export type RichTextItemResponse = Extract<
	PageProperty,
	{ type: "rich_text" }
>["rich_text"][number];

export type NotionPageData = Pick<
	import("@notionhq/client").PageObjectResponse,
	| "icon"
	| "cover"
	| "archived"
	| "in_trash"
	| "url"
	| "public_url"
	| "properties"
>;

export type FileObject =
	| { type: "external"; external: { url: string } }
	| { type: "file"; file: { url: string } };
