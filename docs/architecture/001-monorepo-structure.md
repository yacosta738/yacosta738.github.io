# ADR-001: Monorepo Architecture

## Status
**Accepted** | Date: 2024-01

## Context
This project is a monorepo containing multiple applications for a personal portfolio:
- Static portfolio site (Astro)
- Dynamic blog with content (Astro)
- Backend API for forms (Cloudflare Workers)

We need a structure that allows:
1. Code sharing between applications
2. Independent deployments
3. Easy development and testing

## Decision
We will use a monorepo with pnpm workspaces:

```
apps/
├── portfolio/     # Astro application - static site
├── blog/         # Astro application - blog with comments
└── api/          # Cloudflare Workers - REST API

packages/
└── shared/       # Shared code (components, types, utilities)
```

### Main Technologies:
- **Build**: pnpm workspaces
- **Frontend**: Astro 5.x + Tailwind CSS v4 + TypeScript
- **API**: Cloudflare Workers + Hono + Zod
- **Testing**: Vitest (unit) + Playwright (E2E)
- **CI/CD**: GitHub Actions

## Consequences

### Positive
- ✅ Shared code between apps reduces duplication
- ✅ Independent deployments
- ✅ Shared TypeScript
- ✅ Centralized quality tools (Biome, Vitest)

### Negative
- ❌ Learning curve for new contributors
- ❌ Complex initial setup
- ❌ Build times can be longer

## Notes
- Portfolio consumes data from `packages/shared/src/data/` via content collections
- API uses Zod for validation and OpenAPI for documentation
