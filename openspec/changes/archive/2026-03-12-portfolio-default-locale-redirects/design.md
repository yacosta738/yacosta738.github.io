# Design: Portfolio Default Locale Redirects

## Technical Approach

Move default-locale (English) content out of `src/pages/en/` and into root routes so `/about` and `/support` serve English directly. Add a Cloudflare Pages `_redirects` rule to permanently redirect any `/en/*` request to its unprefixed counterpart with a 301, and keep the existing Astro redirect page for local dev. Update localized dynamic routes to exclude the default locale from `getStaticPaths` so `/en/*` pages are no longer generated, avoiding duplicate content in the static build. Extend the existing Playwright redirect test coverage to assert 301 responses for `/en/about`, `/en/support`, and a wildcard `/en/*` path.

## Architecture Decisions

### Decision: Use Cloudflare Pages `_redirects` for wildcard `/en/*`

**Choice**: Add `apps/portfolio/public/_redirects` with `/en/* /:splat 301`.
**Alternatives considered**: Astro `Astro.redirect` pages only; Astro middleware.
**Rationale**: The portfolio outputs static HTML (`output: "static"`), and Cloudflare Pages supports `_redirects` for wildcard rules with explicit status codes. This guarantees `/en/*` redirects even for paths not pre-rendered, while middleware is not applied to static output.

### Decision: Exclude default locale from `[lang]` static paths

**Choice**: Filter `DEFAULT_LOCALE` out of `getStaticPaths` in `src/pages/[lang]/index.astro`, `src/pages/[lang]/projects.astro`, and `src/pages/[lang]/404.astro`.
**Alternatives considered**: Keep default locale in `[lang]` and rely on redirects; adjust `SHOW_DEFAULT_LANG_IN_URL` only.
**Rationale**: Prevents building `/en/*` content pages, which avoids duplicate content and ensures the canonical default locale is served only from unprefixed routes.

### Decision: Move English MDX pages to root routes

**Choice**: Move `src/pages/en/about.mdx` -> `src/pages/about.mdx` and `src/pages/en/support.mdx` -> `src/pages/support.mdx`.
**Alternatives considered**: Keep English content under `/en/*` and add canonical tags or rewrite rules.
**Rationale**: Aligns with the default-locale-at-root requirement and avoids serving the same English content at both prefixed and unprefixed URLs.

## Data Flow

Request flow for default-locale redirects:

    Browser ── GET /en/about ──→ Cloudflare Pages
       │                              │
       │                              └─ 301 Location: /about
       └──────────────────────────────────────────────→ GET /about (static)

Local dev (Astro) fallback for known paths:

    Browser ── GET /en/about ──→ Astro route /en/[...path].astro
       │                              │
       │                              └─ 301 Location: /about
       └──────────────────────────────────────────────→ GET /about

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `apps/portfolio/src/pages/en/about.mdx` | Move | Move English About content to root `/about`. |
| `apps/portfolio/src/pages/en/support.mdx` | Move | Move English Support content to root `/support`. |
| `apps/portfolio/src/pages/about.mdx` | Create | Root default-locale About page (moved content). |
| `apps/portfolio/src/pages/support.mdx` | Create | Root default-locale Support page (moved content). |
| `apps/portfolio/src/pages/[lang]/index.astro` | Modify | Exclude `DEFAULT_LOCALE` from `getStaticPaths`. |
| `apps/portfolio/src/pages/[lang]/projects.astro` | Modify | Exclude `DEFAULT_LOCALE` from `getStaticPaths`. |
| `apps/portfolio/src/pages/[lang]/404.astro` | Modify | Exclude `DEFAULT_LOCALE` from `getStaticPaths`. |
| `apps/portfolio/public/_redirects` | Create | Add `/en/*` → `/:splat` 301 redirect rule. |
| `packages/testing-e2e/tests/e2e/i18n-default-locale-redirects-portfolio.spec.ts` | Modify | Assert 301 redirects for `/en/about`, `/en/support`, and `/en/*`. |

## Interfaces / Contracts

Cloudflare Pages redirects file (Netlify-style syntax):

```text
/en/*  /:splat  301
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| E2E | `/en/about`, `/en/support`, and `/en/<nested>` return 301 to unprefixed routes | Update Playwright spec to use `request.get` with redirects disabled (or capture redirect response) and assert status + Location header. |
| E2E | Unprefixed `/about` and `/support` render English content | Use existing Playwright base URL and assert expected headings. |

## Migration / Rollout

No migration required. Deploy with new redirects and moved pages; old `/en/*` URLs will permanently redirect to unprefixed routes.

## Open Questions

- [ ] None.
