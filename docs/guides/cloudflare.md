# Cloudflare Setup Guide

This repository maps cleanly to Cloudflare as three separate deployments:

- `apps/portfolio` -> Cloudflare Pages project `yap-portfolio`
- `apps/blog` -> Cloudflare Pages project `yap-blog`
- `apps/api` -> Cloudflare Worker `yap-api`

This guide reflects the live Cloudflare account state inspected on `2026-04-09` with the Cloudflare MCP tools.

## Recommended product choice

Use **Cloudflare Pages** for the Astro frontends because both apps build to static output and the existing Cloudflare projects do not use Pages Functions.

Use **Cloudflare Workers** for the API because `apps/api` is already a Hono-based Worker with Wrangler config, secrets, and observability enabled.

## Current Cloudflare resources

### Pages projects

- `yap-portfolio`
  - Domains: `yunielacosta.com`, `www.yunielacosta.com`, `yacosta738-github-io.pages.dev`
  - Production branch: `main`
  - Build command: `pnpm run build:portfolio`
  - Output directory: `apps/portfolio/dist`
- `yap-blog`
  - Domains: `blog.yunielacosta.com`, `yap-blog.pages.dev`
  - Production branch: `main`
- `yap-portfolio` currently has a production service binding named `API` that points to the Worker service `yap-api`

### Worker

- `yap-api`
  - Runtime: Workers
  - Config file: `apps/api/wrangler.jsonc`
  - Observability: enabled
  - Compatibility date in account: `2025-10-08`

## Local commands

These scripts are available from the repository root:

```bash
pnpm run cloudflare:whoami
pnpm run cloudflare:check
pnpm run cloudflare:download:portfolio
pnpm run cloudflare:download:blog
pnpm run cloudflare:deploy:portfolio
pnpm run cloudflare:deploy:blog
pnpm run cloudflare:deploy:api
pnpm run cloudflare:tail:api
pnpm run cloudflare:typegen:api
```

## Wrangler strategy in this repo

### Portfolio and blog

The frontends deploy best as **Pages projects**.

- Use the dashboard or Git integration as the source of truth for Pages project settings
- Use `pnpm dlx wrangler pages deploy ...` when you want a direct CLI deployment from local build output
- Use `pnpm run cloudflare:download:portfolio` or `pnpm run cloudflare:download:blog` to pull dashboard config into a local Wrangler file when needed

### API

The API is already configured for Wrangler in [`apps/api/wrangler.jsonc`](/Users/acosta/Dev/yunielacosta.com/apps/api/wrangler.jsonc).

Useful commands:

```bash
pnpm --filter=yap-api dev
pnpm --filter=yap-api deploy
pnpm --filter=yap-api cf-typegen
pnpm --filter=yap-api exec wrangler tail yap-api
```

## Environment notes

- Pages production for `yap-portfolio` currently stores `API_URL` with leading whitespace in the dashboard value
- The frontend now trims `API_URL` before using it, which makes the app more tolerant of dashboard formatting drift
- Sensitive Worker values should stay in Cloudflare secrets, not in `wrangler.jsonc`

## Inspecting with Cloudflare MCP

Useful MCP checks for this repo:

- List Workers in the account and confirm `yap-api` exists
- Inspect Pages project settings for `yap-portfolio` and `yap-blog`
- Inspect Worker settings for `yap-api` to verify bindings, observability, and compatibility date

When using the Cloudflare API MCP directly, the most useful account endpoints for this project are:

- `GET /accounts/{account_id}/pages/projects`
- `GET /accounts/{account_id}/pages/projects/{project_name}`
- `GET /accounts/{account_id}/workers/scripts`
- `GET /accounts/{account_id}/workers/scripts/{script_name}/settings`
