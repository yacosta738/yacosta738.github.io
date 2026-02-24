# @portfolio/testing-e2e

Shared Playwright E2E test suite and fixtures used by both `apps/blog` and
`apps/portfolio` during the migration split.

## Layout

- `tests/e2e/*.spec.ts`: canonical shared specs
- `tests/fixtures/index.ts`: canonical shared fixtures

Each app keeps lightweight wrappers under `apps/*/tests` that import these
shared tests so app-level Playwright config, projects, and reporting remain
independent.
