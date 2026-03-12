# Tasks: Dual-Source Blog Content (Astro + Notion Loader)

## Phase 1: Foundation / Infrastructure

- [x] 1.1 Add the Notion loader dependency to `apps/blog/package.json` (pin version) and update `pnpm-lock.yaml`.
- [x] 1.2 Add server-side env schema entries for `NOTION_TOKEN` and `NOTION_DATABASE_ID` in `packages/shared/src/utils/env-schema.ts`.
- [x] 1.3 Define a loader cache file path (e.g. `apps/blog/.cache/notion-loader.json`) and add it to `.gitignore`.
- [x] 1.4 Document `NOTION_TOKEN` and `NOTION_DATABASE_ID` placeholders in `.env.example`.

## Phase 2: Notion Loader + Mapping

- [x] 2.1 Add a `notionArticles` collection in `apps/blog/src/content.config.ts` using the Notion loader and a schema aligned with `articles` (title, description, date, lastModified, cover, author, tags, category, draft, featured).
- [x] 2.2 Create `apps/blog/src/lib/notion/notion-article.mapper.ts` to map Notion properties to the article schema, generate `id`/slug with locale, and exclude entries missing required fields.
- [x] 2.3 Configure loader caching + fallback in `apps/blog/src/content.config.ts` to load cached results when Notion is unavailable and warn without failing the build.
- [x] 2.4 Add block transformation helpers in `apps/blog/src/lib/notion/notion-blocks.ts` for callouts/embeds/images with safe fallbacks.

## Phase 3: Service Merge + Collision Handling

- [x] 3.1 Extend `packages/shared/src/core/article/article.model.ts` so `entry` includes `CollectionEntry<"notionArticles">` and `cover` supports remote URLs if needed.
- [x] 3.2 Add `toNotionArticle` / `toNotionArticles` in `packages/shared/src/core/article/article.mapper.ts`, resolving author/tags/category references and enforcing required fields.
- [x] 3.3 Update `packages/shared/src/core/article/article.service.ts` to fetch `notionArticles`, merge with `articles` + `externalArticles`, prefer local articles on slug/id collisions, and apply consistent filtering/sorting.

## Phase 4: Testing / Verification

- [x] 4.1 Update `packages/shared/src/core/article/article.service.test.ts` to cover Notion merge behavior, collision preference, and draft filtering across all sources.
- [x] 4.2 Add unit tests for the Notion mapper in `packages/shared/src/core/article/__tests__/notion-article.mapper.test.ts` with cases for required fields, draft mapping, and slug/id generation.
- [x] 4.3 Add an integration test in `apps/blog/tests/unit/content/notion-render.test.ts` to validate `render(entry)` works with a Notion-derived entry and unsupported blocks fall back safely.

## Phase 5: Documentation / Cleanup

- [x] 5.1 Update `apps/blog/README.md` with Notion configuration, cache location, and fallback behavior notes.

## Phase 6: Stabilization / Follow-up

- [x] 6.1 Add a Vitest config for `packages/shared` and move the Notion mapper unit test under the blog config.
- [x] 6.2 Stabilize blog Playwright web server usage with prebuilt support, longer timeout, and reuseExistingServer.
- [x] 6.3 Add an E2E check that a cached Notion article renders in the blog.

## Phase 7: Test Fixes

- [x] 7.1 Stabilize resume parser mocks for shared and blog unit tests.
- [x] 7.2 Align BaseToast expectations with current default classes.
- [x] 7.3 Mock astro-icon components and test-safe optimized images for TechBadge and Logo tests.
