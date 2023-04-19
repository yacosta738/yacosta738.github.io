import { z } from "astro/zod";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { yellow } from "kleur/colors";
import { rssSchema } from "./schema.js";
import { createCanonicalURL, errorMap, isValidURL } from "./util.js";
const rssFeedItemValidator = rssSchema.extend({ link: z.string(), content: z.string().optional() });
const globResultValidator = z.record(z.function().returns(z.promise(z.any())));
const rssOptionsValidator = z.object({
  title: z.string(),
  description: z.string(),
  site: z.preprocess((url) => url instanceof URL ? url.href : url, z.string().url()),
  items: z.array(rssFeedItemValidator).or(globResultValidator).transform((items) => {
    if (!Array.isArray(items)) {
      console.warn(
        yellow(
          "[RSS] Passing a glob result directly has been deprecated. Please migrate to the `pagesGlobToRssItems()` helper: https://docs.astro.build/en/guides/rss/"
        )
      );
      return pagesGlobToRssItems(items);
    }
    return items;
  }),
  xmlns: z.record(z.string()).optional(),
  drafts: z.boolean().default(false),
  stylesheet: z.union([z.string(), z.boolean()]).optional(),
  customData: z.string().optional(),
  trailingSlash: z.boolean().default(true)
});
async function getRSS(rssOptions) {
  const validatedRssOptions = await validateRssOptions(rssOptions);
  return {
    body: await generateRSS(validatedRssOptions)
  };
}
async function validateRssOptions(rssOptions) {
  const parsedResult = await rssOptionsValidator.safeParseAsync(rssOptions, { errorMap });
  if (parsedResult.success) {
    return parsedResult.data;
  }
  const formattedError = new Error(
    [
      `[RSS] Invalid or missing options:`,
      ...parsedResult.error.errors.map(
        (zodError) => `${zodError.message} (${zodError.path.join(".")})`
      )
    ].join("\n")
  );
  throw formattedError;
}
function pagesGlobToRssItems(items) {
  return Promise.all(
    Object.entries(items).map(async ([filePath, getInfo]) => {
      const { url, frontmatter } = await getInfo();
      if (url === void 0 || url === null) {
        throw new Error(
          `[RSS] You can only glob entries within 'src/pages/' when passing import.meta.glob() directly. Consider mapping the result to an array of RSSFeedItems. See the RSS docs for usage examples: https://docs.astro.build/en/guides/rss/#2-list-of-rss-feed-objects`
        );
      }
      const parsedResult = rssFeedItemValidator.safeParse(
        { ...frontmatter, link: url },
        { errorMap }
      );
      if (parsedResult.success) {
        return parsedResult.data;
      }
      const formattedError = new Error(
        [
          `[RSS] ${filePath} has invalid or missing frontmatter.
Fix the following properties:`,
          ...parsedResult.error.errors.map((zodError) => zodError.message)
        ].join("\n")
      );
      formattedError.file = filePath;
      throw formattedError;
    })
  );
}
async function generateRSS(rssOptions) {
  var _a;
  const { site } = rssOptions;
  const items = rssOptions.drafts ? rssOptions.items : rssOptions.items.filter((item) => !item.draft);
  const xmlOptions = {
    ignoreAttributes: false,
    // Avoid correcting self-closing tags to standard tags
    // when using `customData`
    // https://github.com/withastro/astro/issues/5794
    suppressEmptyNode: true
  };
  const parser = new XMLParser(xmlOptions);
  const root = { "?xml": { "@_version": "1.0", "@_encoding": "UTF-8" } };
  if (typeof rssOptions.stylesheet === "string") {
    const isXSL = /\.xsl$/i.test(rssOptions.stylesheet);
    root["?xml-stylesheet"] = {
      "@_href": rssOptions.stylesheet,
      ...isXSL && { "@_type": "text/xsl" }
    };
  }
  root.rss = { "@_version": "2.0" };
  if (items.find((result) => result.content)) {
    const XMLContentNamespace = "http://purl.org/rss/1.0/modules/content/";
    root.rss["@_xmlns:content"] = XMLContentNamespace;
    if (((_a = rssOptions.xmlns) == null ? void 0 : _a.content) && rssOptions.xmlns.content === XMLContentNamespace) {
      delete rssOptions.xmlns.content;
    }
  }
  if (rssOptions.xmlns) {
    for (const [k, v] of Object.entries(rssOptions.xmlns)) {
      root.rss[`@_xmlns:${k}`] = v;
    }
  }
  root.rss.channel = {
    title: rssOptions.title,
    description: rssOptions.description,
    link: createCanonicalURL(site, rssOptions.trailingSlash, void 0).href
  };
  if (typeof rssOptions.customData === "string")
    Object.assign(
      root.rss.channel,
      parser.parse(`<channel>${rssOptions.customData}</channel>`).channel
    );
  root.rss.channel.item = items.map((result) => {
    const itemLink = isValidURL(result.link) ? result.link : createCanonicalURL(result.link, rssOptions.trailingSlash, site).href;
    const item = {
      title: result.title,
      link: itemLink,
      guid: itemLink
    };
    if (result.description) {
      item.description = result.description;
    }
    if (result.pubDate) {
      item.pubDate = result.pubDate.toUTCString();
    }
    if (typeof result.content === "string") {
      item["content:encoded"] = result.content;
    }
    if (typeof result.customData === "string") {
      Object.assign(item, parser.parse(`<item>${result.customData}</item>`).item);
    }
    return item;
  });
  return new XMLBuilder(xmlOptions).build(root);
}
export {
  getRSS as default,
  pagesGlobToRssItems,
  rssSchema
};
