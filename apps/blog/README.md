# Blog Application

A personal blog application built with [Astro](https://astro.build/). It shares thoughts on software development, productivity, and technology.

## 🚀 Features

- **Astro 5**: Optimized for content-heavy sites.
- **MDX Support**: Write articles using Markdown and components.
- **Search**: Integrated search functionality.
- **RSS Feed**: Automatically generated RSS feeds for multiple languages.
- **SEO Optimized**: Meta tags, sitemaps, and open graph images.

## 🧞 Commands

All commands are run from the root of the monorepo or from this directory:

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts local dev server |
| `pnpm build` | Build the production site |
| `pnpm preview` | Preview the build locally |
| `pnpm check` | Run type checks and linting |
| `pnpm test:unit` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run end-to-end tests with Playwright |

## 📚 Notion Content

- Configure `NOTION_TOKEN` and `NOTION_DATABASE_ID` (server-side only) to load Notion articles.
- Optionally set `NOTION_PLATFORM_ID` to override the default platform filter (defaults to the YAP page id).
- Optional defaults if your Notion DB does not include author/category/tags yet:
  - `NOTION_DEFAULT_AUTHOR_ID` (default: `en/yuniel-acosta-perez`)
  - `NOTION_DEFAULT_CATEGORY_ID` (default: `en/software-development`)
  - `NOTION_DEFAULT_TAG_IDS` (default: `en/tech`, comma-separated)

## Notion author sync

To keep local author files in sync with Notion, run:

```bash
pnpm notion:sync-authors
```

Required env:
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID` (or `NOTION_AUTHORS_DATABASE_ID` to override)

Optional property overrides:
- `NOTION_AUTHORS_NAME_PROPERTY` (default: `Author`)
- `NOTION_AUTHORS_LOCALE_PROPERTY` (default: `Locale`)
- `NOTION_AUTHORS_LOCALES` (default: `en`)

## Notion taxonomy sync

To sync tags/categories from Notion into local collections:

```bash
pnpm notion:sync-taxonomy
```

Required env:
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID` (or `NOTION_TAXONOMY_DATABASE_ID` to override)

Optional property overrides:
- `NOTION_TAXONOMY_TAGS_PROPERTY` (default: `Tags`)
- `NOTION_TAXONOMY_CATEGORIES_PROPERTY` (default: `Category`)
- `NOTION_TAXONOMY_LOCALES` (default: `en,es`)

## Auto-sync on dev/build

Set `NOTION_SYNC=1` to run the Notion sync scripts before `pnpm dev` and `pnpm build`.
- The loader cache is stored at `apps/blog/.cache/notion-loader.json` (ignored in git).
- If Notion is unavailable, the build falls back to the cache or skips Notion entries with warnings.

## 📁 Structure

- `src/content/`: Articles and external links.
- `src/pages/`: Blog routes and RSS generation.
- `scripts/`: Helper scripts for organizing articles and updating CSP.

## 📄 License

See the root `README.md` for license information.
