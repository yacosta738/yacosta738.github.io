# Proposal: Portfolio Default Locale Redirects

## Intent

Fix incorrect `/en/about` redirect behavior by making the default locale serve from the root and redirecting `/en/*` to root equivalents to avoid duplicate content and broken navigation.

## Scope

### In Scope
- Move default-locale portfolio pages from `/en/*` to root routes.
- Add redirects so `/en/*` permanently redirects to the root equivalent.
- Align i18n, sitemap, and canonical behavior with root-default locale.
- Update or add tests to cover the redirect behavior.

### Out of Scope
- Changes to non-default locales or locale detection behavior beyond `/en/*`.
- Copy edits or content rewrites.
- New analytics or tracking changes.

## Approach

Use Astro routing to ensure default-locale content is served at the root, then implement a centralized redirect rule (Astro config or middleware) that maps `/en/*` to root paths with permanent redirects. Update i18n configuration and page locations to avoid duplicate routes, and confirm sitemap/canonical behavior follows the root paths.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `apps/portfolio/src/pages/` | Modified | Move default-locale page routes to root paths. |
| `apps/portfolio/astro.config.mjs` | Modified | Update i18n or redirect config for default locale and `/en/*` redirects. |
| `apps/portfolio/src/middleware.ts` | Modified | Add redirect logic if config-level redirects are insufficient. |
| `apps/portfolio/tests/` | Modified | Add or update tests for `/en/*` redirects and root routes. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| SEO impact from route changes | Med | Use permanent redirects and update canonicals/sitemap to root. |
| Broken internal links | Low | Update navigation/links during move; add tests. |
| Duplicate content persists | Low | Remove `/en/*` pages and verify build output. |

## Rollback Plan

Revert routing and redirect changes to restore `/en/*` default-locale pages, remove added redirects, and re-run tests to confirm prior behavior.

## Dependencies

- Hosting/adapter must support permanent redirects configured by Astro or middleware.

## Success Criteria

- [ ] Default-locale pages are served at root (e.g., `/about`).
- [ ] `/en/*` routes return permanent redirects to root equivalents.
- [ ] Sitemap/canonical URLs use root paths for default locale.
- [ ] Portfolio tests pass with new routing behavior.
