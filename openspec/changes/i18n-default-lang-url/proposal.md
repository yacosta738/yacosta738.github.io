# Proposal: Unprefixed Default Locale URLs

## Intent

Make the default locale resolve to unprefixed URLs (e.g., `/about` instead of `/en/about`) while keeping locale-prefixed URLs for non-default locales to improve canonical structure and UX.

## Scope

### In Scope
- Switch Astro i18n routing to not prefix the default locale in both apps.
- Align shared i18n helpers with unprefixed default-locale URLs.
- Update default-locale routing/redirects so `/en/...` remains reachable via redirects.

### Out of Scope
- Full rework of translation content or locale coverage.
- New locales or content migrations beyond URL routing.

## Approach

Adopt the Astro-native unprefixed default locale by setting `prefixDefaultLocale: false` and `SHOW_DEFAULT_LANG_IN_URL: false`, then adjust index routing and legacy redirects for `/en/...` to keep SEO/bookmarks intact.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `packages/shared/src/i18n/types.ts` | Modified | Set default-locale visibility flag to false. |
| `packages/shared/src/i18n/i18n.ts` | Modified | Ensure translated path helpers emit unprefixed default-locale URLs. |
| `apps/blog/astro.config.mjs` | Modified | Set `i18n.routing.prefixDefaultLocale: false`. |
| `apps/portfolio/astro.config.mjs` | Modified | Set `i18n.routing.prefixDefaultLocale: false`. |
| `apps/blog/src/pages/index.astro` | Modified | Remove forced redirect to `/{lang}/` for default locale. |
| `apps/*/src/pages/[lang]/...` | Modified | Ensure default-locale pages are reachable without `/en`. |
| `apps/*/tests/unit/i18n/__tests__/i18n.test.ts` | Modified | Update/extend tests for unprefixed default locale behavior. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Default-locale routes 404 if `[lang]` pages don't map to unprefixed paths | Medium | Add explicit default-locale routes or redirects; validate with tests. |
| SEO regressions from URL changes | Medium | Add redirects from `/en/...` to `/...`, update canonical/alternate links and sitemap outputs if applicable. |
| Inconsistent behavior across apps | Low | Apply changes to both apps in the same change and verify. |

## Rollback Plan

Revert `prefixDefaultLocale` and `SHOW_DEFAULT_LANG_IN_URL` to previous values and restore the root redirect behavior to `/{DEFAULT_LOCALE}/`. Remove or disable `/en/...` redirect rules introduced in this change.

## Dependencies

- Astro i18n routing behavior for unprefixed default locale.

## Success Criteria

- [ ] Default locale resolves at unprefixed URLs across blog and portfolio (e.g., `/about`).
- [ ] `/en/...` redirects to `/...` with no 404s for existing default-locale paths.
- [ ] i18n helper tests pass and cover default-locale URL behavior.
