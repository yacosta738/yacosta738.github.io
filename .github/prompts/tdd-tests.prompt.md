---
mode: agent
---

# TDD Test Creation Prompt (project-adapted)

## Template (Role, Task, Context, Expectations)

```markdown
Role: Act as a senior QA engineer and TDD-focused developer who designs robust,
maintainable automated tests aligned to the portfolio/CV design.

Task: Create a comprehensive test suite using Test-Driven Development (TDD) for
this Astro + TypeScript project. For each unit of work outline the
RED-GREEN-REFACTOR cycle and propose test structure and coverage.

Required context:
- Design document (functional and non-functional requirements):
  [DESIGN_DOCUMENT_CONTENT]
- Language, framework and test runner: TypeScript, Vitest 3.x, Astro 5.x
- System boundaries and integration points: Static site generation (SSG) with
  Astro; local i18n; Astro Content Collections; resume JSON files in
  `src/data/resume/*/resume.json`; no backend; avoid network calls from client
  by default; `hotkeypad` for UX.
- Data stores and models: JSON schemas in `src/lib/resume-types.ts` and
  validation in `src/content.config.ts` (Zod); skills library in
  `src/data/skills`; languages in `src/data/languages`.
- Authentication/authorization: Not applicable for the static site. If
  admin/CMS endpoints are added, explicitly include auth tests.
- Performance and security requirements: Minimize shipped JS; avoid XSS (safe
  templates); basic accessibility (a11y); clean build without critical
  warnings; keep build times reasonable.
- Environments and CI constraints: Node 20+, Vitest locally and in CI;
  package.json scripts (build: `astro check && astro build`, test: `vitest`);
  GitHub Actions optional.

Expectations and goals (deliver sections 1–10):

1) Test strategy
  - Test pyramid guidance, scope boundaries (unit/integration/optional E2E),
    mocking/stubbing policy, fixtures/factories plan.

2) Unit tests
  - For each component/function: inputs/outputs, edge cases, error conditions,
    state transitions.
  - Template examples using Vitest and TypeScript.

3) Integration/contract/API tests
  - Component interaction scenarios, validation of Astro Content Collection
    schemas (Zod), parser contracts, i18n + routing interactions.

4) Data model tests
  - Validation rules, constraints, referential integrity (simulated),
    migration/format checks (dates, URLs, emails).

5) Performance and reliability tests
  - Latency/throughput targets for pure utilities (where reasonable),
    concurrency considerations, timeouts, retries, idempotency for
    parsers/mappers.

6) Security tests
  - Input sanitization, access control tests (if endpoints exist), common
    vulnerability checks (XSS, injection patterns in routing/params).

7) Coverage and traceability
  - Map tests to requirements (traceability matrix), define coverage goals and
    meaningful metrics (lines/branches on critical utils).

8) Test data management
  - Fixtures/factories (JSON under `src/data/.../__fixtures__`), seeding
    strategy, isolation, deterministic tests, time/clock control
    (`vi.useFakeTimers`).

9) TDD workflow plan
  - Break down features into test-first tasks with RED/GREEN/REFACTOR notes
    for each task.

10) CI integration
  - Commands to run, parallelization/sharding recommendations, flake handling,
    reporting, and coverage publishing (optional `vitest --coverage`).

Authoring guidelines:
- Write tests before implementation; keep tests focused and descriptive.
- Prefer deterministic tests; mock external dependencies; avoid network/FS
  unless the test target is I/O behavior.
- Use AAA (Arrange, Act, Assert) and given-when-then naming conventions.
- Keep tests independent and idempotent; clean up resources.
- Measure coverage but prioritize meaningful assertions over raw coverage
  percent.
```

## Project-specific context (to fill placeholders)

- Runner: Vitest (`pnpm test`)
- Build: `pnpm build` → `astro check && astro build`
- Relevant structure:
  - i18n: `src/i18n/*` (exports: `useTranslations`, `useTranslatedPath`,
    `retrieveLocalizedString`, `getLocalePaths`, `localeParams`); existing
    tests: `src/i18n/__tests__/i18n.test.ts`.
  - Collection utilities: `src/lib/collection.entity.ts` (functions
    `parseEntityId`, `cleanEntityId`); tests:
    `src/lib/collection.entity.test.ts`.
  - Resume types & parser: `src/lib/resume-types.ts`,
    `src/lib/resume-parser.ts` (reads `src/data/resume/es/resume.json` and
    caches result).
  - Content validation: `src/content.config.ts` (Zod schemas for `resume`,
    `skillsLibrary`, `languagesLibrary`).

## Expected deliverable

Provide sections 1–10 with concrete test examples. Below are repo-aligned
examples and guidance.

### 1) Test strategy (summary)

- Unit: pure utilities (i18n helpers, entity id parsing, mappers, parsers).
  Minimal mocks for FS and `process.cwd()` when relevant. Prefer small inputs
  and fixtures.
- Integration: Zod schema validation via `content.config.ts` with example
  objects; i18n + routing interactions; mapping skills JSON to frontend
  shapes.
- Lightweight E2E (optional): rendering Astro components with `@astrojs/check`
  or a testing library for islands if interactive components exist. Avoid
  heavyweight E2E for now.
- Mocks/stubs: `vi.mock` for modules (`astro:i18n`, `fs`, i18n config). Use
  `vi.useFakeTimers()` where tests involve time.
- Fixtures: `src/data/**/__fixtures__/*.json` or inline typed factories.

### 2) Unit tests (templates)

```ts
// Example: src/lib/collection.entity.ts
import { describe, it, expect } from 'vitest';
import { parseEntityId, cleanEntityId } from '@/lib/collection.entity';

describe('parseEntityId', () => {
  it('extracts lang and path from "en/blog/post"', () => {
    expect(parseEntityId('en/blog/post'))
    .toEqual({ lang: 'en', path: 'blog/post' });
  });

  it('returns lang=null when no language prefix', () => {
    expect(parseEntityId('about')).toEqual({ lang: null, path: 'about' });
  });
});

describe('cleanEntityId', () => {
  it('removes composite language prefix', () => {
    expect(cleanEntityId('zh-cn/entry')).toBe('entry');
  });
});
```

```ts
// Example: i18n utils
import { describe, it, expect, vi } from 'vitest';
import { useTranslatedPath } from '@/i18n';

vi.mock('@/i18n/types', () => ({
  DEFAULT_LOCALE: 'en',
  LOCALES: { en: 'English', es: 'Spanish' },
  SHOW_DEFAULT_LANG_IN_URL: false,
}));

describe('useTranslatedPath', () => {
  it('prefixes non-default languages', () => {
    const t = useTranslatedPath('en');
    expect(t('/about', 'es')).toBe('/es/about');
  });
});
```

Suggested edge cases:

- i18n: missing keys, multiple variables in templates, duplicate prefixes,
  paths without leading slash.
- Entity IDs: composite languages (e.g. `pt-br`), multiple segments, numeric
  or dashed parts.
- Resume parser: missing optional fields, empty/null dates, caching across
  calls, malformed JSON.

### 3) Integration / contract tests

- Validate `content.config.ts` Zod schemas with minimal valid/invalid
  objects; assert coercion of dates and nullable behavior.
- `resume-parser` contract: mock `fs` to return JSON, assert parser caches the
  result after the first call.

```ts
import { describe, it, expect, vi } from 'vitest';

// Use require/import inside the test after mocking
describe('getResumeData', () => {
  it('caches JSON file reads', () => {
    const readFileSync = vi.fn().mockReturnValue('{"basics":{"name":"x","label":"y","image":"/i.png","email":"a@b.com","summary":"s","location":{"city":"c","countryCode":"CC","region":"R"},"profiles":[]},"work":[],"education":[],"skills":[]}');
    vi.doMock('node:fs', () => ({ readFileSync }));
    vi.doMock('node:path', () => ({ resolve: (...a: string[]) => a.join('/') }));
    const { getResumeData: get } = require('@/lib/resume-parser');
    get();
    get();
    expect(readFileSync).toHaveBeenCalledTimes(1);
  });
});
```

### 4) Data model tests

- Use Zod schemas in `src/content.config.ts` to test valid/invalid payloads.
  Verify `z.coerce.date()` behavior, null/undefined handling for `endDate`,
  URL/email validation.

### 5) Performance and reliability

- Ensure pure utilities run quickly in tests; optionally assert no
  unexpectedly long loops. Use `vi.setTimeout` on long-running tests if
  necessary.

### 6) Security tests

- Test that i18n path normalization prevents path injection and that variable
  interpolation does not evaluate code.

### 7) Coverage and traceability

- Initial target: aim for meaningful coverage in `src/i18n/*` and `src/lib/*`
  (e.g., 80% lines/branches on critical utilities). Run coverage locally with:

```bash
pnpm vitest -- --coverage
```

Configure CI to collect/publish coverage if desired.

### 8) Test data management

- Add minimal fixtures at `src/data/resume/__fixtures__/valid.json` and
  invalid variations. Provide small TS factories for creating `RawWork` or
  `RawProject` objects. Use `vi.useFakeTimers()` for time-related tests.

### 9) TDD workflow

- For each new utility or feature: write a failing test (RED), implement the
  minimal change to pass (GREEN), then refactor with tests (REFACTOR).
  Document any non-obvious tradeoffs in test comments.

### 10) CI integration

- Example pipeline steps (order): `pnpm check` -> `pnpm test` (with coverage)
  -> `pnpm build`.
- Vitest runs in parallel by default; for flaky tests use `test.retry(2)` or
  quarantine and fix root causes.
