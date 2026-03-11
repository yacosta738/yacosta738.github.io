# Tasks: Blog Playwright Preview + Pagefind Base Assets

## Phase 1: Infrastructure

- [ ] 1.1 Update `apps/blog/playwright.config.ts` to keep `astro preview` as the E2E webServer command and document the expected preview port/command mapping.
- [ ] 1.2 Tighten the skip-build guard in `apps/blog/playwright.config.ts` to require `dist/index.html` and Pagefind UI assets (`dist/pagefind/pagefind-ui.js` and `dist/pagefind/pagefind-ui.css`) before skipping `pnpm build`.

## Phase 2: Implementation

- [ ] 2.1 Update `apps/blog/src/pages/search.astro` to build Pagefind UI asset URLs using `import.meta.env.BASE_URL` (define `base`, `pagefindCss`, `pagefindJs`).
- [ ] 2.2 Update `apps/blog/src/pages/[lang]/search.astro` to build Pagefind UI asset URLs using `import.meta.env.BASE_URL` (define `base`, `pagefindCss`, `pagefindJs`).

## Phase 3: Testing / Verification

- [ ] 3.1 Run blog E2E tests locally with `pnpm --filter blog test:e2e` to confirm the webServer uses preview and Pagefind assets are served.
- [ ] 3.2 Verify skip-build behavior by removing `dist/pagefind/*` and re-running `pnpm --filter blog test:e2e` to ensure the build step is not skipped when assets are missing.
- [ ] 3.3 Validate base-aware assets by setting a non-root base (if available in config) and confirming search pages request `${BASE_URL}pagefind/pagefind-ui.*` without 404s.
