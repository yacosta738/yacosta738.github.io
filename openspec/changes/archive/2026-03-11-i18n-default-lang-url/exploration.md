## Exploration: i18n-default-lang-url

### Current State
- Astro i18n is configured with `prefixDefaultLocale: true` in both apps, so the default locale is always prefixed (ex: `/en/...`).
- `SHOW_DEFAULT_LANG_IN_URL` is `true` in shared i18n types, and `useTranslatedPath` always includes the default locale prefix.
- The blog root `src/pages/index.astro` is a client-side redirector that sends users to `/{lang}/` (defaulting to `/{DEFAULT_LOCALE}/`).
- Most localized pages live under `src/pages/[lang]/...` and `getRelativeLocaleUrl` is used to build locale links.

### Affected Areas
- `packages/shared/src/i18n/types.ts` - toggles whether the default locale is shown in URLs.
- `packages/shared/src/i18n/i18n.ts` - path translation logic depends on `SHOW_DEFAULT_LANG_IN_URL`.
- `apps/blog/astro.config.mjs` - `i18n.routing.prefixDefaultLocale` currently `true`.
- `apps/portfolio/astro.config.mjs` - same i18n routing config.
- `apps/blog/src/pages/index.astro` - redirector assumes a prefixed default locale.
- `apps/blog/src/pages/[lang]/...` - routing model centers on `/{lang}`; default-locale unprefixed paths may need explicit handling.
- `apps/*/tests/unit/i18n/__tests__/i18n.test.ts` - already contain cases for default locale prefix/no-prefix behavior.

### Approaches
1. **Astro-native unprefixed default locale**
   - Set `prefixDefaultLocale: false`, set `SHOW_DEFAULT_LANG_IN_URL` to `false`, and adjust the root/index routes to render the default locale without the `/en` prefix.
   - Pros: aligns with Astro i18n routing; consistent `getRelativeLocaleUrl` outputs; better canonical URLs.
   - Cons: requires route restructuring for default-locale pages currently living under `src/pages/[lang]/...`; may need redirects from `/en/...` to `/...`.
   - Effort: Medium.

2. **Keep routing prefixed, only tweak translate helpers**
   - Leave `prefixDefaultLocale: true` and just switch `SHOW_DEFAULT_LANG_IN_URL` to `false` in shared helpers.
   - Pros: minimal routing changes.
   - Cons: creates mismatched URL behavior (helpers return `/` while routing still expects `/en`); broken links/SEO; inconsistent with Astro routing.
   - Effort: Low, but risky.

### Recommendation
Go with **Approach 1**. It keeps Astro routing and helper logic aligned and avoids mismatched URLs. It will likely require updating the root redirector and adding redirects from `/en/...` to unprefixed paths (or keeping `/en` as legacy redirects) to preserve SEO and bookmarks.

### Risks
- Route conflicts or missing pages if `src/pages/[lang]/...` does not automatically map to unprefixed default-locale routes.
- SEO regressions if canonical/alternate URLs and sitemap outputs are not updated for the new structure.
- Existing bookmarks to `/en/...` need explicit redirects to avoid 404s.

### Ready for Proposal
Yes — proposal should confirm desired behavior for `/en/...` (redirect vs keep), and whether both apps (blog + portfolio) must change together.
