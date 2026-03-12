## Exploration: Notion CMS blog integration

### Current State
- Blog content is managed via Astro content collections in `apps/blog/src/content.config.ts` using `glob` loaders pointed at `packages/shared/src/data/*`.
- Articles and external articles are MD/MDX files with frontmatter referencing authors/tags/categories by ID (e.g., `en/yuniel-acosta-perez`, `en/java`).
- Tags/categories/authors are their own collections (MD/JSON) and are resolved via `getEntry/getEntries` in mappers.
- Blog routes and listings rely on `post.id` prefixed by locale (e.g., `en/2023/02/19/slug`) for filtering and routing.
- Rendering uses `render(post.entry)` from `astro:content`; remark/rehype plugins add reading time and lazy image/table behavior.
- Output is static (`output: "static"`), so all blog data must be available at build time.

### Affected Areas
- `apps/blog/src/content.config.ts` — content collections and schema/loader definitions.
- `packages/shared/src/core/article/article.service.ts` — `getCollection("articles")` and filtering logic.
- `packages/shared/src/core/article/article.mapper.ts` — `getEntry/getEntries` for author/category/tags, `entry` shape for rendering.
- `packages/shared/src/core/tag/tag.service.ts`, `packages/shared/src/core/category/category.service.ts`, `packages/shared/src/core/author/author.service.ts` — collections-based lookups by locale and slug.
- `apps/blog/src/pages/[lang]/blog/[...id].astro` — `getStaticPaths` and `render(post.entry)` usage.
- `apps/blog/src/pages/[lang]/blog/index.astro`, `.../tag/...`, `.../category/...`, `.../author/...` — listing/filtering by locale and slug.
- `apps/blog/src/pages/en/[...path].astro` and `apps/blog/src/pages/[lang]/rss.xml.js` — direct `getCollection("articles")` calls for routes and RSS.

### Approaches
1. **Prebuild sync (Notion → MDX/JSON files)** — Fetch Notion DB content and write MDX/JSON into `packages/shared/src/data/*` before Astro build.
   - Pros: Keeps `astro:content` and existing services/routes intact; minimal runtime changes; no SSR required.
   - Cons: Requires sync tooling, credentials, and repo file writes; potential merge conflicts; slower builds.
   - Effort: Medium.

2. **Astro content loader (Notion → content collections)** — Replace `glob` loaders with a custom loader that fetches Notion data at build time and returns entries for `articles` (and optionally tags/categories/authors).
   - Pros: No repo writes; data stays in Notion; clean build-time fetch.
   - Cons: Must map Notion schema → collection schema; handle `id` formatting for locale routing; ensure `render()` works with converted Markdown/MDX; image handling constraints.
   - Effort: Medium–High.

3. **Hybrid: Notion for articles, local tags/categories/authors** — Keep tags/categories/authors as local collections, fetch only articles from Notion, map relations to existing IDs.
   - Pros: Smaller scope; preserves tag/category/author pages and slugs.
   - Cons: Manual mapping of Notion multi-selects or relations to local IDs; two sources of truth.
   - Effort: Medium.

### Recommendation
Start with the **Hybrid** approach or **Prebuild sync** to preserve current routing, tag/category pages, and `render(post.entry)` behavior. If the team prefers no repo writes and is ok with more integration work, move to a custom content loader after validating Notion schema, image handling, and locale-driven IDs.

### Risks
- Static build requirement: runtime Notion fetch is incompatible with `output: "static"` unless switching to SSR/hybrid.
- Locale routing depends on `post.id` prefix; Notion entries must produce consistent `lang/slug` IDs.
- Image handling: `cover` uses `image()` in collection schema; remote Notion images may need `image` config changes or download pipeline.
- `render(post.entry)` expects an Astro content entry with `body`; Notion content must be converted to MD/MDX that Astro can render.

### Ready for Proposal
Yes — but the proposal should request decisions on: Notion DB schema (properties for locale/slug/tags/categories/authors), content source strategy (sync vs loader), and image handling (remote vs downloaded).
