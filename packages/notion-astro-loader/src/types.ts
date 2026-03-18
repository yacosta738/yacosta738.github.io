import type { Client, isFullDatabase, isFullPage } from "@notionhq/client";

/**
 * @module
 * Types from the internal Notion JS API, exposed for use in this project.
 */

type Asserts<Function> = Function extends (
	input: unknown,
) => input is infer Type
	? Type
	: never;

export type ClientOptions = NonNullable<
	ConstructorParameters<typeof Client>[0]
>;
export interface QueryDatabaseParameters
	extends NonNullable<Parameters<Client["databases"]["query"]>[0]> {}

export type DatabasePropertyConfigResponse = Asserts<
	typeof isFullDatabase
>["properties"][string];

export type PageObjectResponse = Asserts<typeof isFullPage>;
export type PageProperty = PageObjectResponse["properties"][string];
export type EmojiRequest = Extract<
	PageObjectResponse["icon"],
	{ type: "emoji" }
>["emoji"];

export type RichTextItemResponse = Extract<
	PageProperty,
	{ type: "rich_text" }
>["rich_text"][number];

export type NotionPageData = Pick<
	PageObjectResponse,
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
