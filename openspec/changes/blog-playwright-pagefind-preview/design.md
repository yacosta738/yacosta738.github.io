# Design: Blog Playwright Preview + Pagefind Base Assets

## Technical Approach

Update the blog Playwright webServer command to always run `astro preview` for E2E runs and tighten the CI skip-build guard to require Pagefind assets inside `dist/pagefind/`. Update search pages to generate Pagefind UI asset URLs using the configured Astro base (via `import.meta.env.BASE_URL`) so non-root deployments resolve assets correctly.

## Architecture Decisions

### Decision: Keep Preview-First E2E Server With Asset-Aware Skip Build

**Choice**: Continue using `astro preview` for E2E runs and make the skip-build guard validate `dist/index.html` plus `dist/pagefind/pagefind-ui.js` (and/or `pagefind-ui.css`) before skipping `pnpm build`.
**Alternatives considered**: Always rebuild on every E2E run; run `astro dev` for E2E.
**Rationale**: Preview serves the built artifact that includes Pagefind outputs, while the tighter guard avoids unnecessary builds without risking missing assets.

### Decision: Base-Aware Pagefind Asset URLs via `import.meta.env.BASE_URL`

**Choice**: Build asset paths using `const base = import.meta.env.BASE_URL` and concatenate `pagefind/pagefind-ui.css` and `pagefind/pagefind-ui.js` in both search pages.
**Alternatives considered**: Hardcoded `/pagefind/...` paths; derive from `Astro.url` and `new URL()` for each request.
**Rationale**: `BASE_URL` reflects the configured Astro `base` and preserves root behavior while keeping URLs stable in static output.

## Data Flow

Sequence: Playwright webServer startup

    Playwright Runner
          |
          | resolve webServer command
          v
    blog/playwright.config.ts
          |
          | if preview: check dist + pagefind assets
          v
    [build guard]
       | yes -> use preview
       | no  -> pnpm build -> preview
          v
    astro preview serves dist/ + dist/pagefind/

Search page asset resolution

    search.astro / [lang]/search.astro
          |
          | base = import.meta.env.BASE_URL
          v
    href/src = `${base}pagefind/pagefind-ui.*`
          |
          v
    Browser requests Pagefind assets under base

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `apps/blog/playwright.config.ts` | Modify | Update CI skip-build guard to check Pagefind assets and keep preview command as the E2E server. |
| `apps/blog/src/pages/search.astro` | Modify | Prefix Pagefind UI asset URLs with Astro base. |
| `apps/blog/src/pages/[lang]/search.astro` | Modify | Prefix Pagefind UI asset URLs with Astro base. |

## Interfaces / Contracts

No new external interfaces. Internal contract changes:

```ts
// Playwright build guard logic (conceptual)
const hasDist = existsSync("dist/index.html");
const hasPagefind = existsSync("dist/pagefind/pagefind-ui.js");
const skipBuild = hasDist && hasPagefind;
```

```astro
---
const base = import.meta.env.BASE_URL;
const pagefindCss = `${base}pagefind/pagefind-ui.css`;
const pagefindJs = `${base}pagefind/pagefind-ui.js`;
---
<link href={pagefindCss} rel="stylesheet" />
<script is:inline src={pagefindJs}></script>
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | None | No new logic requires unit tests. |
| Integration | Build guard | Run Playwright E2E in CI/local to confirm build runs when Pagefind assets are missing. |
| E2E | Search page assets | Run existing search E2E tests; confirm no 404s for `/pagefind/*` when base is non-root. |

## Migration / Rollout

No migration required.

## Open Questions

- [ ] Should the guard validate both `pagefind-ui.js` and `pagefind-ui.css`, or is JS-only sufficient for the E2E requirement?
