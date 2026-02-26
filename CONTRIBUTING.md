# Contributing

All contributions to this project are welcome.

When contributing to this repository, please first discuss the change you wish to
make via an issue on the repository.

Note: we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it in all
your interactions with the project.

## Setting up the project

To set up the project, you need to have [Node.js](https://nodejs.org/en/) and
[pnpm](https://pnpm.io/) installed.

1. Fork the repository.
2. Clone the repository to your local machine.
3. Install the dependencies by running `pnpm install`.
4. Create a new branch for your changes.

## Development Commands

### Running the apps

```bash
# All apps in parallel
pnpm dev

# Individual apps
pnpm dev:portfolio  # http://localhost:4321
pnpm dev:blog      # http://localhost:4321
pnpm dev:api       # http://localhost:8787
```

### Building

```bash
# Build all apps
pnpm build

# Individual builds
pnpm build:portfolio
pnpm build:blog
pnpm build:api
```

### Testing

```bash
# All tests (unit + e2e)
pnpm test

# Unit tests only
pnpm test:unit

# E2E tests only
pnpm test:e2e
pnpm test:e2e:headed  # With visible browser
```

### Quality Checks

```bash
# Lint + Format + Type check
pnpm check

# Just linting
pnpm check:biome
```

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

| Setting | Value |
|---------|-------|
| Indentation | Tabs |
| Quotes | Double quotes |
| Semicolons | Required |
| Line endings | LF |

### Pre-commit Hooks

Before committing, the following checks run automatically:

1. **Biome** - Format and lint
2. **Organize imports** - Auto-organize imports

## Project Structure

```
apps/
├── portfolio/     # Static site (Astro)
├── blog/          # Blog with comments (Astro)
└── api/           # REST API (Cloudflare Workers)

packages/
└── shared/        # Shared code (components, types, data)
```

### Adding New Content

Content is managed via **Astro Content Collections** in `packages/shared/src/data/`:

- `resume/` - CV data (JSON per language)
- `articles/` - Blog posts (MD/MDX)
- `tags/`, `categories/`, `authors/` - Blog metadata

### Adding New Components

1. Create component in `packages/shared/src/components/`
2. Follow Atomic Design: `atoms/` → `molecules/` → `organisms/`
3. Add tests in `packages/shared/src/components/*.test.ts`
4. Export from `packages/shared/src/index.ts`

## API Development

The API uses:

- **Hono** - Web framework
- **Zod** - Schema validation
- **OpenAPI** - API documentation

### Adding a new endpoint

1. Create handler in `apps/api/src/endpoints/`
2. Add route in `apps/api/src/index.ts`
3. Add tests in `apps/api/src/endpoints/*.test.ts`
4. Environment variables go in `.dev.vars` (local) or Wrangler secrets (production)

## AI Assistant Instructions (AgentSync)

This project uses [AgentSync](https://github.com/dallay/agentsync) to centralize
and synchronize the instructions provided to AI coding assistants like GitHub Copilot,
Codex, Gemini, Claude, and others. This ensures that all assistants work with the same
context, conventions, and project architecture, which are defined in the `.agents/`
directory.

### How to Apply AI Instructions

After cloning the project or pulling new changes, you must synchronize the AI
instructions. To do this, run the following command in the root of the project:

```bash
pnpm run agents:apply
```

If you need to modify or add instructions for the AIs, edit the relevant Markdown
files (`.md`) inside the `.agents/` directory and run the `agents:apply` command
again to distribute the changes.

## Submitting Changes

When you are ready to submit your changes, please follow these steps:

1. Push your changes to your forked repository.
2. Create a new pull request.
3. Make sure that your pull request follows the [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Maintenance

Example:
```
feat(api): add rate limiting middleware

Add per-IP rate limiting to prevent abuse of form endpoints.
Uses in-memory store with 20 requests per minute limit.

Closes #123
```
