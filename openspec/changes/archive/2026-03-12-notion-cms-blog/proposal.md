# Proposal: Dual-Source Blog Content (Astro + Notion Loader)

## Intent

Add Notion as a parallel authoring source while keeping the current Astro content collection pipeline (local MD/MDX in `packages/shared/src/data/articles`). The goal is to load Notion entries directly in the Astro content layer (via `notion-astro-loader` or similar) and render them alongside local collection entries without generating MD/MDX files, preserving the current workflow and build reliability.

## Scope

### In Scope
- Preserve current Astro content collections with minimal schema adjustments only if required for dual-source composition.
- Define a Notion-to-Astro schema mapping aligned to the `articles` collection (`title`, `description`, `date`, `lastModified`, `cover`, `author`, `tags`, `category`, `draft`, `featured`).
- Add a Notion loader in `apps/blog/src/content.config.ts` to ingest Notion entries directly into the Astro content layer (no MD/MDX generation).
- Define dual-source composition rules (merge local MD/MDX + Notion entries into a unified view or keep as two collections and compose in the blog list) with explicit slug and sorting logic.
- Implement image handling strategy for Notion cover and in-body images suitable for static builds (stable URLs or local caching via loader hooks).
- Add caching/incremental update logic (e.g., by `last_edited_time`) and CI-friendly failure handling within the loader pipeline.
- Document webhook/build-trigger considerations and the fallback behavior when Notion API is unavailable.

### Out of Scope
- Replacing Astro content collections with runtime API fetching.
- Building a Notion editing UI or auth layer beyond API key usage.
- Migrating existing posts automatically to Notion (one-way sync only in this change).
- Changing the blog front-end layout or routing.
- Generating MD/MDX files from Notion pages.

## Approach

Use an Astro content loader (e.g., `notion-astro-loader`) wired in `apps/blog/src/content.config.ts` to query the Notion database, map properties to the existing `articles` schema, and expose Notion entries as a collection or merged source within the content layer.

Dual-source behavior:
- Option A (single logical collection): merge loader results with the local MD/MDX `articles` collection by normalizing to a shared shape and composing at the content layer or via a helper used by listings.
- Option B (two collections): keep `articles` and `notionArticles` as separate collections and merge in the blog list/rendering code, applying consistent URL, sorting, and filtering rules.

Composition rules (explicit and deterministic):
- Slug precedence: Notion slug must be unique; collision with local MD/MDX results in a build error or a deterministic suffix (documented).
- Sorting: sort by `date` descending; if missing, fall back to `lastModified`.
- Drafts: Notion status/published flags map to `draft` and are filtered consistently with local content.
- Locale: Notion entries must carry locale metadata (property or mapping); otherwise default locale only.

Images (cover and inline) should be handled within the loader pipeline (prefer stable URLs or caching to local assets if supported). When Notion is unavailable, loader should warn and fall back to existing content without failing the build.

Schema mapping (based on provided Notion DB fields):
- `Title` -> `title`
- `Platforms` -> `tags` (existing tag references; generate missing tag files as needed)
- `Type` -> `category` (existing category reference; generate if missing)
- `Status` -> `draft` (e.g., non-published statuses set `draft: true`)
- `Schedule Date` -> `date`
- `Published` checkbox -> `draft` (checked => `draft: false`)
- `Created time` -> `date` fallback when schedule date absent
- `Last edited time` -> `lastModified`
- Cover image -> `cover` (download to local assets; link in frontmatter)
- Body content -> MD/MDX `content` converted from Notion blocks
- `description` -> derived from a Notion summary property if added; otherwise first paragraph excerpt

Webhook/caching considerations:
- Prefer scheduled or manual build triggers; Notion lacks first-party webhooks, so use build hooks or a small worker to trigger rebuilds on publish.
- Use `last_edited_time` for incremental updates; cache Notion responses in a loader cache if supported (or a lightweight local cache file if permitted by the loader).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `apps/blog/src/content.config.ts` | Modified | Add Notion loader and schema mapping alongside local collections. |
| `apps/blog/src/pages/blog/**` | Modified (optional) | Compose Astro and Notion sources in listing if using two collections. |
| `packages/shared/src/data/articles/**` | Unchanged | Remains the source for local MD/MDX content. |
| `packages/shared/src/data/tags/**` | Modified (optional) | Potential generation of missing tags from Notion platforms if required. |
| `packages/shared/src/data/categories/**` | Modified (optional) | Potential generation of missing categories from Notion type if required. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Notion API outage breaks CI builds | Medium | Make loader non-fatal; fall back to cached results or skip Notion entries. |
| Notion image URLs expire | High | Prefer loader proxy/caching; fall back to local download step if supported. |
| Schema drift between Notion and Astro frontmatter | Medium | Validate mappings and enforce required fields in loader config. |
| Duplicate slugs across sources | Medium | Enforce deterministic slug rules and collision checks during sync/merge. |
| Sorting/filtering inconsistencies between sources | Low/Med | Normalize data shape and apply shared sort logic. |
| Incorrect locale mapping | Low/Med | Use explicit `Platforms` or locale property mapping and add validation. |
| Notion loader image URL issues | High | Prefer loader options for proxy/caching; fall back to download step if supported; document limitations. |
| Callout rendering gaps | Medium | Provide custom Notion block renderers or map callouts to Astro-friendly HTML. |
| Video/embed handling | Medium | Map Notion embeds to iframe-safe output; allow whitelisted providers only. |
| Loader bugs/regressions | Low/Med | Pin loader version; use `patch-package` or fork if needed. |

## Rollback Plan

Remove the loader configuration from `apps/blog/src/content.config.ts` and revert any listing composition changes. Local MD/MDX content remains the source of truth, so rollback is a config revert only. If any caching artifacts were introduced by the loader, remove them from the repo and CI cache.

## Dependencies

- Notion API token and database ID in CI/local environment variables.
- Network access during build for API and image handling.

## Success Criteria

- [ ] Notion loader exposes entries that can be merged or composed with Astro content without MD/MDX generation.
- [ ] Astro collection content and Notion content render together in the blog listing with consistent sorting and filtering.
- [ ] Build succeeds without Notion access by using cached loader results or skipping Notion entries.
- [ ] Cover and inline images render with stable paths/URLs suitable for static builds.
- [ ] Incremental updates only refetch pages whose `last_edited_time` changed.
