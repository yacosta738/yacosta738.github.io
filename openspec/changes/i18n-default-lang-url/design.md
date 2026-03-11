# Design: Unprefixed Default Locale URLs

## Technical Approach

Enable Astro's unprefixed default locale routing in both apps, align shared i18n helpers to emit unprefixed default-locale URLs, and introduce explicit redirects from legacy `/en/...` paths to the new canonical unprefixed paths. Adjust root routing so default-locale content is accessible at `/` (portfolio) and `/blog` (blog) without forcing `/en/...` redirects.

## Architecture Decisions

### Decision: Use Astro i18n `prefixDefaultLocale: false`

**Choice**: Set `i18n.routing.prefixDefaultLocale` to `false` in `apps/blog/astro.config.mjs` and `apps/portfolio/astro.config.mjs`.
**Alternatives considered**: Manual route duplication with separate default-locale pages and leaving Astro routing untouched.
**Rationale**: Aligns with Astro's native i18n routing behavior, reduces manual route maintenance, and ensures correct behavior in `astro:i18n` helpers (e.g., `getRelativeLocaleUrl`).

### Decision: Hide default locale in shared URL helpers

**Choice**: Set `SHOW_DEFAULT_LANG_IN_URL` to `false` in `packages/shared/src/i18n/types.ts`.
**Alternatives considered**: Keeping `SHOW_DEFAULT_LANG_IN_URL` true and rewriting URLs at the edge or in templates.
**Rationale**: Centralizes URL behavior in shared i18n helpers used across apps, reducing inconsistent URL generation in UI links and tests.

### Decision: Add explicit redirect routes for legacy `/en/...`

**Choice**: Create default-locale redirect pages under `apps/*/src/pages/en/...` that issue permanent redirects to unprefixed paths.
**Alternatives considered**: Rely on static hosting redirect rules (`_redirects`) or Astro config redirects.
**Rationale**: Keeps redirect behavior versioned with the app code and works in static builds without platform-specific config.

### Decision: Rework root redirector pages

**Choice**: Update `apps/blog/src/pages/index.astro` to redirect to `/blog` for default and to `/{lang}/blog` for non-default; update `apps/portfolio/src/pages/index.astro` to render default-locale content (or delegate to a shared component) instead of redirecting to `/{lang}/`.
**Alternatives considered**: Removing `index.astro` and relying solely on `[lang]/index.astro`.
**Rationale**: Avoids routing conflicts and ensures `/` is a real canonical page for the default locale instead of a redirect loop.

## Data Flow

Request flow for default and non-default locales:

    Request URL
        │
        ├─ /about (default) ──> Astro i18n routing ──> page render (default locale)
        │
        ├─ /es/about ─────────> Astro i18n routing ──> page render (es locale)
        │
        └─ /en/about ─────────> redirect page ──> 301 to /about

## Sequence Diagram

Legacy default-locale redirect flow:

    Browser        Astro route (/en/...)
       |                   |
       | GET /en/about     |
       |------------------>| 
       |                   | 301 Location: /about
       |<------------------|
       | GET /about        |
       |------------------>| render default-locale page
       |<------------------|

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `apps/blog/astro.config.mjs` | Modify | Set `i18n.routing.prefixDefaultLocale` to `false`. |
| `apps/portfolio/astro.config.mjs` | Modify | Set `i18n.routing.prefixDefaultLocale` to `false`. |
| `packages/shared/src/i18n/types.ts` | Modify | Set `SHOW_DEFAULT_LANG_IN_URL` to `false`. |
| `packages/shared/src/i18n/i18n.ts` | Modify | Confirm `useTranslatedPath` and `getLocalePaths` behavior aligns with unprefixed default. |
| `apps/blog/src/pages/index.astro` | Modify | Redirect to `/blog` for default locale; redirect to `/{lang}/blog` for non-default. |
| `apps/portfolio/src/pages/index.astro` | Modify | Render default-locale content; remove forced redirect to `/{lang}/`. |
| `apps/blog/src/pages/en/index.astro` | Create | Redirect legacy `/en` homepage to `/`. |
| `apps/blog/src/pages/en/[...path].astro` | Create | Redirect legacy `/en/...` to `/<path>`. |
| `apps/portfolio/src/pages/en/index.astro` | Create | Redirect legacy `/en` homepage to `/`. |
| `apps/portfolio/src/pages/en/[...path].astro` | Create | Redirect legacy `/en/...` to `/<path>`. |
| `apps/blog/tests/unit/i18n/__tests__/i18n.test.ts` | Modify | Update expectations for default-locale paths if needed. |
| `apps/portfolio/tests/unit/i18n/__tests__/i18n.test.ts` | Modify | Update expectations for default-locale paths if needed. |

## Interfaces / Contracts

No new public API surface. Redirect pages use Astro's `Astro.redirect`:

```astro
---
export const prerender = true;
const target = /* computed unprefixed path */;
return Astro.redirect(target, 301);
---
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | i18n URL helpers return unprefixed default paths | Update existing Vitest tests in `apps/*/tests/unit/i18n/__tests__/i18n.test.ts`. |
| Integration | Default-locale pages render at unprefixed URLs | Run Astro build and validate routes (manual check of generated output). |
| E2E | Legacy `/en/...` redirects | Add Playwright checks for 301 from `/en/...` to `/<path>`. |

## Migration / Rollout

No migration required. Existing `/en/...` URLs will be preserved via redirects.

## Open Questions

- None.
