# Design: Dual-Source Blog Content (Astro + Notion Loader)

## Technical Approach

Integrate Notion via a content loader in `apps/blog/src/content.config.ts` (no MD/MDX file
generation). Notion pages are normalized to the existing `articles` schema and exposed as a separate
`notionArticles` collection. The blog layer keeps its current rendering pipeline (
`getCollection(...)` -> `Article` mapping -> `render(post.entry)` in
`apps/blog/src/pages/[lang]/blog/[...id].astro`), but
`packages/shared/src/core/article/article.service.ts` merges `articles` + `notionArticles` into a
unified list with deterministic slug collision handling and consistent sorting/filtering.
Loader-level caching provides build availability when Notion is down.

Rendering pipeline is preserved by requiring the Notion loader to output markdown/MDX-compatible
bodies that Astro can `render()`, so the existing remark/rehype plugins in
`apps/blog/astro.config.mjs` continue to apply.

## Architecture Decisions

### Decision: Add a dedicated `notionArticles` collection and merge in the service layer

**Choice**: Define `notionArticles` in `apps/blog/src/content.config.ts` with a Notion loader and
merge results in `packages/shared/src/core/article/article.service.ts` (and related mapper/model
updates).
**Alternatives considered**: Replace the existing `articles` loader with a custom loader that merges
local MD/MDX + Notion; materialize Notion to MD/MDX on disk.
**Rationale**: Astro allows a single loader per collection, so a dedicated collection avoids
reimplementing the glob loader and keeps local content unchanged while still satisfying dual-source
requirements.

### Decision: Normalize Notion to the existing `articles` schema and exclude invalid entries

**Choice**: Map Notion properties to `title`, `description`, `date`, `lastModified`, `cover`,
`author`, `tags`, `category`, `draft`, `featured` using the same schema as `articles`. Entries
missing required fields or references are excluded with warnings, not build failures.
**Alternatives considered**: Extend schema with Notion-specific fields or relax validation.
**Rationale**: The current `article.mapper.ts` and filters depend on this shape and `reference(...)`
fields. Enforcing the same schema keeps behavior consistent and satisfies spec scenarios for missing
fields.

### Decision: Deterministic slug collision handling prefers Astro content

**Choice**: When two entries resolve to the same route id, keep the Astro `articles` entry and drop
the Notion entry, recording a warning.
**Alternatives considered**: Prefer Notion, append suffixes, or fail the build.
**Rationale**: Local MD/MDX is the current source of truth. This avoids accidental content
replacement and guarantees stable routing without failing builds.

### Decision: Cache Notion loader results for availability

**Choice**: Use loader-level caching (e.g., `cache` option or a small on-disk cache path) and fall
back to cached results when Notion API requests fail.
**Alternatives considered**: Always require live Notion access; cache only in CI.
**Rationale**: The spec requires builds to succeed without Notion access. A local cache is the most
reliable fallback without generating content files.

### Decision: Custom Notion block rendering with patch-package or fork fallback

**Choice**: Use loader-provided block rendering hooks to normalize callouts, embeds, and images. If
the loader lacks required hooks or has bugs, patch it via `patch-package`; if issues persist, fork
and pin a local package.
**Alternatives considered**: Post-process rendered HTML in the blog templates or accept rendering
gaps.
**Rationale**: Block-level issues affect content quality and stability. Fixing at the loader keeps
output consistent and contained.

## Data Flow

### Content loading + merge

    Notion API ──→ Notion loader ──→ collection: notionArticles
         │               │
         │               └─ cache (on disk) for fallback
         │
         └── fallback (API unavailable) → read cache (or empty set)

    Astro build ──→ getCollection("articles")
               ├─→ getCollection("notionArticles")
               └─→ getCollection("externalArticles")
                        │
                        └─ article.service.ts merges + filters + sorts
                                   │
                                   └─ Article[] → pages/[lang]/blog/*.astro

### Rendering pipeline

    Article.entry ──→ render(entry) ──→ markdown/MDX pipeline
                                    ├─ remark: readingTimeRemarkPlugin
                                    └─ rehype: responsiveTablesRehypePlugin, lazyImagesRehypePlugin

### Sequence diagram: build + fallback

```text
participant Build as Astro Build
participant Content as astro:content
participant Notion as Notion API
participant Cache as Loader Cache
participant Pages as Blog Pages

Build->>Content: getCollection("notionArticles")
Content->>Notion: query database/pages/blocks
Notion-->>Content: pages + blocks
Content->>Cache: persist cache snapshot
Build->>Content: getCollection("articles")
Build->>Content: getCollection("externalArticles")
Content-->>Build: entries
Build->>Pages: merge + render

Note over Content,Notion: If Notion is unavailable
Content->>Cache: load cached results
Content-->>Build: cached entries (or empty)
Build->>Pages: render without errors
```

## File Changes

| File                                                  | Action            | Description                                                                                                              |
|-------------------------------------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------|
| `apps/blog/src/content.config.ts`                     | Modify            | Add `notionArticles` collection with Notion loader + mapping to `articles` schema.                                       |
| `packages/shared/src/core/article/article.model.ts`   | Modify            | Allow `entry` union to include Notion collection entries; update `cover` typing if remote URLs are used.                 |
| `packages/shared/src/core/article/article.mapper.ts`  | Modify            | Add mapper for `notionArticles` entries; enforce normalized shape and required references.                               |
| `packages/shared/src/core/article/article.service.ts` | Modify            | Merge `articles` + `notionArticles` (and `externalArticles`) with deterministic collision handling and shared filtering. |
| `packages/shared/src/utils/env-schema.ts`             | Modify            | Add server-side env fields for Notion token/database id if validating build-time env.                                    |
| `apps/blog/astro.config.mjs`                          | Modify (optional) | Add `image.remotePatterns` for Notion image domains if using remote images instead of local caching.                     |

## Interfaces / Contracts

### Normalized Notion data (aligned to `articles` schema)

```ts
type NotionArticleData = {
  title: string;
  description: string;
  date: string; // ISO string; Astro schema coerces to Date
  lastModified?: string;
  cover?: string; // local asset path or remote URL depending on image strategy
  author: string; // collection reference id, e.g. "en/yuniel-acosta-perez"
  tags: string[]; // collection reference ids
  category: string; // collection reference id
  draft?: boolean;
  featured?: boolean;
};
```

### Deterministic slug/id rule (used by loader)

```text
slug = slugify(Title or Notion Slug property)
id = {lang}/{yyyy}/{mm}/{dd}/{slug}
if id collides with local articles -> keep local, drop Notion entry (warn)
```

### Cache contract (loader-level)

```ts
type NotionLoaderCache = {
  databaseId: string;
  lastSync: string;
  pages: Array<{
    pageId: string;
    lastEditedTime: string;
    id: string; // {lang}/{yyyy}/{mm}/{dd}/{slug}
  }>;
};
```

## Notion Block Mitigations

### Images

- Prefer loader-side download to a local cache folder so `cover` and inline images become stable
  assets (avoids signed URL expiry).
- If downloads are not supported, use remote image URLs and whitelist Notion domains in
  `apps/blog/astro.config.mjs`.
- Ensure inline images include width/height when using remote sources to keep `astro:assets`
  compatible.

### Callouts

- Map Notion callout blocks to a consistent HTML structure (e.g., `<aside class="callout">` or
  `<blockquote>`), preserving icons/emoji.
- If the loader only outputs HTML, apply a lightweight post-transform in the loader to add class
  names used by `apps/blog/src/styles/blog.css`.

### Embeds

- Whitelist providers (e.g., YouTube, Vimeo, CodePen, Twitter/X) and convert to safe iframes.
- Unsupported embeds fall back to a plain link with a warning.

### Patch-package / fork policy

- Pin the loader version; add `patch-package` for missing hooks (block transforms, cache path, image
  handling).
- If upstream does not accept fixes, fork and replace with a local package to stabilize builds.

## Testing Strategy

| Layer       | What to Test                                                                 | Approach                                                                                           |
|-------------|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| Unit        | Notion mapping to `NotionArticleData`, slug generation, collision resolution | Vitest tests in `packages/shared/src/core/article` or `apps/blog/src` with mocked Notion payloads. |
| Integration | Loader returns valid entries and `render(entry)` works                       | `astro check` + a small fixture that calls `render()` for a Notion entry.                          |
| E2E         | Blog listing includes Notion entries and fallback works                      | Playwright: build with cached data, simulate Notion outage, validate listing output and no errors. |

## Migration / Rollout

No migration required. Rollback is removing the Notion loader and merge logic; local MD/MDX content
remains untouched. If a cache file is introduced, delete it and clear CI caches.

## Open Questions

- [ ] Which Notion property is the authoritative locale field (explicit locale vs default locale)?
- [ ] What is the default author reference id if a Notion entry omits author?
- [ ] Do we want remote image support (update `image.remotePatterns`) or enforce local image caching
  in the loader?
