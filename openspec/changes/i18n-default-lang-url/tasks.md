# Tasks: Unprefixed Default Locale URLs

## Phase 1: Foundation and Alignment

- [x] 1.1 Resolve root path behavior mismatch by updating `openspec/changes/i18n-default-lang-url/specs/i18n/spec.md` and/or `openspec/changes/i18n-default-lang-url/design.md` to explicitly state expected `/` behavior for blog and portfolio.
- [x] 1.2 Update `apps/blog/astro.config.mjs` to set `i18n.routing.prefixDefaultLocale` to `false`.
- [x] 1.3 Update `apps/portfolio/astro.config.mjs` to set `i18n.routing.prefixDefaultLocale` to `false`.
- [x] 1.4 Update `packages/shared/src/i18n/types.ts` to set `SHOW_DEFAULT_LANG_IN_URL` to `false`.
- [x] 1.5 Update `packages/shared/src/i18n/i18n.ts` to ensure helpers emit unprefixed default-locale paths and prefixed non-default paths.

## Phase 2: Routing and Redirect Pages

- [x] 2.1 Update `apps/blog/src/pages/index.astro` to implement resolved root behavior: serve default-locale content at `/` and route non-default locales to `/{lang}/` (or redirect to `/blog` if confirmed by spec).
- [x] 2.2 Update `apps/portfolio/src/pages/index.astro` to serve default-locale content at `/` without forcing `/{lang}/` redirects.
- [x] 2.3 Create `apps/blog/src/pages/en/index.astro` to issue a permanent redirect from `/en` to `/`.
- [x] 2.4 Create `apps/blog/src/pages/en/[...path].astro` to issue a permanent redirect from `/en/<path>` to `/<path>`.
- [x] 2.5 Create `apps/portfolio/src/pages/en/index.astro` to issue a permanent redirect from `/en` to `/`.
- [x] 2.6 Create `apps/portfolio/src/pages/en/[...path].astro` to issue a permanent redirect from `/en/<path>` to `/<path>`.

## Phase 3: Tests and Verification

- [x] 3.1 Update `apps/blog/tests/unit/i18n/__tests__/i18n.test.ts` to assert default-locale helpers return unprefixed paths and non-default remain prefixed.
- [x] 3.2 Update `apps/portfolio/tests/unit/i18n/__tests__/i18n.test.ts` with the same default-locale expectations.
- [x] 3.3 Add Playwright redirect coverage in `apps/blog/tests/e2e/i18n-default-locale-redirects.spec.ts` for `/en/` and `/en/<path>` -> unprefixed paths.
- [x] 3.4 Add Playwright redirect coverage in `apps/portfolio/tests/e2e/i18n-default-locale-redirects.spec.ts` for `/en/` and `/en/<path>` -> unprefixed paths.

## Phase 4: Cleanup and Documentation

- [ ] 4.1 Update `apps/blog/tests/README.md` and `apps/portfolio/tests/README.md` with any new e2e test instructions if required.
- [ ] 4.2 Run unit tests for i18n helpers in both apps and verify default-locale routing manually in a build preview.
