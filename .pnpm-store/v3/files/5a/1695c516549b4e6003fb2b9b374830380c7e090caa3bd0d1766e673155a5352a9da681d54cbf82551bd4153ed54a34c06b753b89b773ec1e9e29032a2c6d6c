import { z } from 'astro/zod';
import { rssSchema } from './schema.js';
export { rssSchema };
export type RSSOptions = {
    /** Title of the RSS Feed */
    title: z.infer<typeof rssOptionsValidator>['title'];
    /** Description of the RSS Feed */
    description: z.infer<typeof rssOptionsValidator>['description'];
    /**
     * Specify the base URL to use for RSS feed links.
     * We recommend using the [endpoint context object](https://docs.astro.build/en/reference/api-reference/#contextsite),
     * which includes the `site` configured in your project's `astro.config.*`
     */
    site: z.infer<typeof rssOptionsValidator>['site'];
    /** List of RSS feed items to render. */
    items: RSSFeedItem[] | GlobResult;
    /** Specify arbitrary metadata on opening <xml> tag */
    xmlns?: z.infer<typeof rssOptionsValidator>['xmlns'];
    /**
     * Specifies a local custom XSL stylesheet. Ex. '/public/custom-feed.xsl'
     */
    stylesheet?: z.infer<typeof rssOptionsValidator>['stylesheet'];
    /** Specify custom data in opening of file */
    customData?: z.infer<typeof rssOptionsValidator>['customData'];
    /** Whether to include drafts or not */
    drafts?: z.infer<typeof rssOptionsValidator>['drafts'];
    trailingSlash?: z.infer<typeof rssOptionsValidator>['trailingSlash'];
};
type RSSFeedItem = {
    /** Link to item */
    link: string;
    /** Full content of the item. Should be valid HTML */
    content?: string | undefined;
    /** Title of item */
    title: z.infer<typeof rssSchema>['title'];
    /** Publication date of item */
    pubDate: z.infer<typeof rssSchema>['pubDate'];
    /** Item description */
    description?: z.infer<typeof rssSchema>['description'];
    /** Append some other XML-valid data to this item */
    customData?: z.infer<typeof rssSchema>['customData'];
    /** Whether draft or not */
    draft?: z.infer<typeof rssSchema>['draft'];
};
type ValidatedRSSFeedItem = z.infer<typeof rssFeedItemValidator>;
type GlobResult = z.infer<typeof globResultValidator>;
declare const rssFeedItemValidator: z.ZodObject<{
    title: z.ZodString;
    pubDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodDate]>, Date, string | number | Date>;
    description: z.ZodOptional<z.ZodString>;
    customData: z.ZodOptional<z.ZodString>;
    draft: z.ZodOptional<z.ZodBoolean>;
    link: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    customData?: string | undefined;
    draft?: boolean | undefined;
    content?: string | undefined;
    title: string;
    pubDate: Date;
    link: string;
}, {
    description?: string | undefined;
    customData?: string | undefined;
    draft?: boolean | undefined;
    content?: string | undefined;
    title: string;
    pubDate: string | number | Date;
    link: string;
}>;
declare const globResultValidator: z.ZodRecord<z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodPromise<z.ZodAny>>>;
declare const rssOptionsValidator: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    site: z.ZodEffects<z.ZodString, string, unknown>;
    items: z.ZodEffects<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        pubDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodDate]>, Date, string | number | Date>;
        description: z.ZodOptional<z.ZodString>;
        customData: z.ZodOptional<z.ZodString>;
        draft: z.ZodOptional<z.ZodBoolean>;
        link: z.ZodString;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        customData?: string | undefined;
        draft?: boolean | undefined;
        content?: string | undefined;
        title: string;
        pubDate: Date;
        link: string;
    }, {
        description?: string | undefined;
        customData?: string | undefined;
        draft?: boolean | undefined;
        content?: string | undefined;
        title: string;
        pubDate: string | number | Date;
        link: string;
    }>, "many">, z.ZodRecord<z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodPromise<z.ZodAny>>>]>, {
        description?: string | undefined;
        customData?: string | undefined;
        draft?: boolean | undefined;
        content?: string | undefined;
        title: string;
        pubDate: Date;
        link: string;
    }[], {
        description?: string | undefined;
        customData?: string | undefined;
        draft?: boolean | undefined;
        content?: string | undefined;
        title: string;
        pubDate: string | number | Date;
        link: string;
    }[] | Record<string, (...args: unknown[]) => Promise<any>>>;
    xmlns: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    drafts: z.ZodDefault<z.ZodBoolean>;
    stylesheet: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodBoolean]>>;
    customData: z.ZodOptional<z.ZodString>;
    trailingSlash: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    customData?: string | undefined;
    xmlns?: Record<string, string> | undefined;
    stylesheet?: string | boolean | undefined;
    title: string;
    description: string;
    trailingSlash: boolean;
    site: string;
    items: {
        description?: string | undefined;
        customData?: string | undefined;
        draft?: boolean | undefined;
        content?: string | undefined;
        title: string;
        pubDate: Date;
        link: string;
    }[];
    drafts: boolean;
}, {
    customData?: string | undefined;
    trailingSlash?: boolean | undefined;
    site?: unknown;
    xmlns?: Record<string, string> | undefined;
    drafts?: boolean | undefined;
    stylesheet?: string | boolean | undefined;
    title: string;
    description: string;
    items: {
        description?: string | undefined;
        customData?: string | undefined;
        draft?: boolean | undefined;
        content?: string | undefined;
        title: string;
        pubDate: string | number | Date;
        link: string;
    }[] | Record<string, (...args: unknown[]) => Promise<any>>;
}>;
export default function getRSS(rssOptions: RSSOptions): Promise<{
    body: string;
}>;
export declare function pagesGlobToRssItems(items: GlobResult): Promise<ValidatedRSSFeedItem[]>;
