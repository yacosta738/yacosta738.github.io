# Quickstart for Implementing externalArticles Support in Tags Pages

## Steps

1. Create combined API in `apps/portfolio/src/core/article/article.service.ts`:
   - Add `getAllArticlesIncludingExternal(criteria?)` returning `Article[]`.
   - Combine `articles` + `externalArticles`, apply `draft` filter, lang filter, dedupe by `id`.
2. Update `apps/portfolio/src/pages/[lang]/blog/tag/[tag].astro` to use the combined API for:
   - `getStaticPaths()` (route generation)
   - Page article list (with pagination)
3. Tests:
   - Unit: add tests for combination/filter/dedupe/pagination on a small fixture set.
   - E2E: add a test visiting `/en/blog/tag/r` and verifying at least one item renders (from external).
4. Verify quality gates locally:
   - Run `pnpm check` and `pnpm -w test` in repo root.
   - Validate CWV manually for the tag page.
