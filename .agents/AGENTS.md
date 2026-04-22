# AGENTS.md — yunielacosta.com monorepo

## Critical: branch workflow

- **Never push directly to `main`**. Always work on a feature branch and open a PR.
- Branch protection has `enforce_admins: false` — the tooling will NOT stop you from pushing to main. Follow the convention anyway.
- Conventional commits only. No co-authored-by or AI attribution.

## Repo structure

```
apps/
  portfolio/   Astro 6 site — port 4173
  blog/        Astro 6 site — port 4174  (Notion-driven content)
  api/         Hono + Cloudflare Workers — port 8787
packages/      Shared libs (consumed by apps/*)
.agents/       Canonical AI config (AGENTS.md lives HERE, symlinked to root)
scripts/       Node utility scripts (notion sync, CSP hashes, etc.)
openspec/      SDD spec artifacts
```

Package manager: **pnpm 10** only (`preinstall` guard enforces this).  
Node: `>=22.22.2`

## Essential commands

```bash
# Install
pnpm install

# Dev (all apps)
pnpm dev                          # also runs agents:apply first

# Dev (single app)
pnpm dev:portfolio                # http://127.0.0.1:4173
pnpm dev:blog                     # http://127.0.0.1:4174  (runs Notion pre-sync)
pnpm dev:api                      # http://127.0.0.1:8787

# Build
pnpm build                        # all apps
pnpm build:portfolio | build:blog | build:api

# Lint / format / typecheck (all-in-one)
pnpm check                        # biome + per-app checks
pnpm check:biome                  # biome only (auto-fixes)

# Tests
pnpm test:unit                    # vitest across all apps
pnpm test:unit:portfolio          # single-app unit tests
pnpm test:e2e                     # playwright (portfolio + blog)
pnpm test:e2e:portfolio

# Pre-push validation (format + lint + tests + build)
make preflight
```

## Key quirks

### NOTION_LOADER flag
All portfolio dev/build commands set `NOTION_LOADER=0` to skip live Notion API calls. The blog runs a real `notion-prebuild-sync.mjs` / `notion-predev-sync.mjs` pre-step — requires valid `NOTION_TOKEN` env var in production.

### agentsync — do not edit AGENTS.md in the root
`/AGENTS.md` is a symlink to `.agents/AGENTS.md`. Edit the source file. Run `pnpm agents:apply` (or just `pnpm install`) to re-sync symlinks to CLAUDE.md, GEMINI.md, `.github/copilot-instructions.md`, etc.

### Pre-commit hooks (lefthook)
- `agentsync-apply` runs automatically when `.agents/**/*` changes
- `organize` runs on every commit
- Pre-push: `pnpm check` + `lychee` link checker (requires `lychee` CLI)

### Biome (not ESLint / Prettier)
Formatter and linter is Biome. Config in `biome.json` at root. Run `pnpm check:biome` to auto-fix.

### TypeScript catalog versions
All dependency versions are centrally managed via `pnpm-workspace.yaml` catalog. Add new deps using `catalog:` protocol, not arbitrary versions.

### API is a Cloudflare Worker (Hono)
`apps/api/` uses `wrangler` for dev and deploy. `wrangler deploy --dry-run` is the build step. Type gen: `pnpm cloudflare:typegen:api`.

### Portfolio and blog E2E tests
E2E requires a running dev server. The Playwright config in each app handles server startup. Run via `pnpm test:e2e:portfolio` or `pnpm test:e2e:blog`.

### CSP hashes
After touching inline scripts in portfolio or blog, regenerate: `pnpm --filter=portfolio csp:hashes` or `pnpm --filter=blog csp:hashes`.

## CI

CI runs on PRs to `main` and `develop`. Jobs are path-filtered — only affected app jobs run. Full pipeline: lint → unit tests → build → E2E. Playwright tests run in a separate `playwright.yml` workflow.

## SDD (Spec-Driven Development)

Artifacts live in `openspec/`. Sub-agents: `sdd-explore`, `sdd-propose`, `sdd-spec`, `sdd-design`, `sdd-tasks`, `sdd-apply`, `sdd-verify`, `sdd-archive`. State tracked in `openspec/changes/{change}/state.yaml`. Do not move to `apply` without completed proposal + spec + design + tasks.
