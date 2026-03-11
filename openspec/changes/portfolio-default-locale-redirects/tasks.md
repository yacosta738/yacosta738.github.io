# Tasks: Portfolio Default Locale Redirects

## Phase 1: Routing + i18n foundation

- [x] 1.1 Create `apps/portfolio/public/_redirects` with `/en/* /:splat 301` for Cloudflare Pages.
- [x] 1.2 Update `apps/portfolio/astro.config.mjs` to keep the default locale unprefixed and remove `/en` from any canonical/sitemap generation logic.
- [x] 1.3 Update `apps/portfolio/src/pages/[lang]/index.astro` `getStaticPaths` to exclude `DEFAULT_LOCALE`.
- [x] 1.4 Update `apps/portfolio/src/pages/[lang]/projects.astro` `getStaticPaths` to exclude `DEFAULT_LOCALE`.
- [x] 1.5 Update `apps/portfolio/src/pages/[lang]/404.astro` `getStaticPaths` to exclude `DEFAULT_LOCALE`.

## Phase 2: Content moves + route cleanup

- [x] 2.1 Move `apps/portfolio/src/pages/en/about.mdx` to `apps/portfolio/src/pages/about.mdx` (preserve frontmatter and content).
- [x] 2.2 Move `apps/portfolio/src/pages/en/support.mdx` to `apps/portfolio/src/pages/support.mdx` (preserve frontmatter and content).
- [x] 2.3 Update portfolio links in `apps/portfolio/src` that reference `/en/...` to the root equivalents.

## Phase 3: Tests + verification

- [x] 3.1 Update `packages/testing-e2e/tests/e2e/i18n-default-locale-redirects-portfolio.spec.ts` to assert 301 + `Location` for `/en/about`, `/en/support`, `/en/`, and `/en/projects/case-study`.
- [x] 3.2 Extend the same spec to assert `/about` and `/support` render English content.
- [x] 3.3 Run the Playwright spec `packages/testing-e2e/tests/e2e/i18n-default-locale-redirects-portfolio.spec.ts` and confirm it passes.
