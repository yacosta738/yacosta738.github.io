# Proposal: Enforce Blog Playwright Preview Build for Pagefind

## Intent

Ensure blog E2E search coverage always runs against a built preview so Pagefind assets exist, and make Pagefind asset URLs base-aware to prevent 404s when the site uses a non-root base.

## Scope

### In Scope
- Force blog Playwright to run build + preview for E2E runs that rely on Pagefind assets.
- Update the CI/local skip-build guard to only skip builds when valid Pagefind assets are present.
- Make Pagefind asset paths base-aware on blog search pages.

### Out of Scope
- Changing Pagefind indexing content, search UI behavior, or styling.
- Modifying other apps' Playwright configurations (portfolio, etc.).
- Introducing new E2E tests or altering existing test coverage.

## Approach

Update the blog Playwright webServer command to always run preview and validate build outputs (including Pagefind assets) before skipping build. Adjust search page asset URLs to derive from Astro base to keep Pagefind UI resources accessible under non-root deployments.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `apps/blog/playwright.config.ts` | Modified | Enforce build + preview; tighten skip-build guard to ensure Pagefind assets exist. |
| `apps/blog/src/pages/search.astro` | Modified | Make Pagefind UI asset URLs base-aware. |
| `apps/blog/src/pages/[lang]/search.astro` | Modified | Make Pagefind UI asset URLs base-aware for localized search. |
| `apps/blog/astro.config.mjs` | Modified | Verify base usage and any Pagefind output settings if needed. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Longer E2E startup time on CI | Medium | Keep skip-build guard, but only when build outputs and Pagefind assets are valid. |
| Base-aware asset changes break local dev | Low | Use Astro base helpers so dev (base = "/") stays unchanged. |

## Rollback Plan

Revert the Playwright webServer command changes and restore original Pagefind asset URLs in search pages. If CI time regressions are unacceptable, revert the stricter build guard to the prior behavior.

## Dependencies

- Astro build outputs Pagefind assets under `dist/pagefind/` during `pnpm build` for the blog app.

## Success Criteria

- [ ] Blog Playwright E2E runs use preview with Pagefind assets available (no missing `/pagefind/pagefind-ui.js` or CSS).
- [ ] Skip-build guard only skips when `dist/` and Pagefind assets are present.
- [ ] Search pages load Pagefind UI assets correctly when Astro base is non-root.
