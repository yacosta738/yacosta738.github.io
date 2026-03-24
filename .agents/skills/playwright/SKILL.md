---
name: playwright
description: >
  Comprehensive Playwright E2E testing skill combining planning, generation, and healing.
  Trigger: When writing, debugging, or planning E2E tests, working with *.spec.ts files,
  Playwright config, test fixtures, or when asked to create/fix/plan browser tests.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Playwright E2E Testing Skill

Unified skill for planning, generating, and healing Playwright E2E tests in this monorepo.

## When to Use

- Creating new E2E test plans or specs
- Writing or generating Playwright test files
- Debugging and fixing failing E2E tests
- Working with `*.spec.ts` files in `packages/testing-e2e/tests/e2e/`
- Modifying Playwright config or test fixtures
- Running E2E tests across portfolio and blog apps
- Reviewing test coverage or test reliability

## Project Test Architecture

### Monorepo Structure

```
packages/testing-e2e/          # Shared E2E package (canonical source)
├── tests/
│   ├── e2e/                   # All E2E spec files
│   │   ├── seed-portfolio.spec.ts   # Seed for portfolio app
│   │   ├── seed-blog.spec.ts        # Seed for blog app
│   │   ├── contact-form.spec.ts
│   │   └── i18n-*.spec.ts
│   └── fixtures/
│       └── index.ts           # Shared helpers, selectors, mocks, i18n data
├── specs/
│   ├── portfolio/             # Test plans for portfolio
│   └── blog/                  # Test plans for blog
apps/portfolio/
│   └── playwright.config.ts   # Port 4173, includes all specs
apps/blog/
    └── playwright.config.ts   # Port 4174, ignores contact-form.spec.ts
```

### Key Conventions

- **Centralized tests**: All E2E specs live in `packages/testing-e2e/tests/e2e/`
- **Shared fixtures**: Import helpers and selectors from `../fixtures`
- **App-specific configs**: Each app has its own `playwright.config.ts` with different `baseURL` and `testIgnore`
- **Blog ignores** `contact-form.spec.ts` (contact form only exists in portfolio)
- **Playwright version**: 1.58.2 (aligned across all packages)
- **Accessibility**: `@axe-core/playwright` 4.11.1 available for a11y testing

### Seed Tests

Seed tests bootstrap the page context for test agents. Use the app-specific seed:

```ts
// For portfolio tests
// seed: packages/testing-e2e/tests/e2e/seed-portfolio.spec.ts

// For blog tests
// seed: packages/testing-e2e/tests/e2e/seed-blog.spec.ts
```

## Phase 1: Planning (🎭 Planner)

### When to Plan

- New feature needs E2E coverage
- Exploring an app to discover testable flows
- Creating a test strategy from a PRD or user story

### Planning Workflow

1. **Set up the page**: Invoke `planner_setup_page` once before any browser tools
2. **Explore**: Use `browser_*` tools to navigate and discover the interface
3. **Map user flows**: Identify critical paths, forms, navigation, interactive elements
4. **Design scenarios**: Cover happy path, edge cases, error handling, and validation
5. **Save the plan**: Use `planner_save_plan` to write the Markdown spec

### Test Plan Structure

Each scenario in the plan must include:

- Clear, descriptive title
- Detailed step-by-step instructions
- Expected outcomes for each step
- Assumptions about starting state (always assume fresh/blank state)
- Success criteria and failure conditions

### Plan Output Format

```markdown
# [App Name] - [Feature] Test Plan

## Application Overview
Brief description of the feature under test.

## Test Scenarios

### 1. [Scenario Group Name]
**Seed:** `packages/testing-e2e/tests/e2e/seed-[app].spec.ts`

#### 1.1 [Scenario Name]
**Steps:**
1. Navigate to [page]
2. Click [element]
3. Type [value]

**Expected Results:**
- [Assertion 1]
- [Assertion 2]
```

### Planning Quality Standards

- Steps must be specific enough for any tester or generator to follow
- Include negative testing scenarios (invalid input, missing fields, network errors)
- Scenarios must be independent and runnable in any order
- Do not take screenshots unless absolutely necessary — prefer browser snapshots

## Phase 2: Generation (🎭 Generator)

### When to Generate

- A test plan exists in `specs/` and needs implementation
- Converting manual test scenarios to automated Playwright tests

### Generation Workflow

1. **Read the plan**: Obtain the test plan with all steps and verification specs
2. **Set up the page**: Run `generator_setup_page` for the scenario
3. **Execute each step live**: Use Playwright tools to manually perform each step in real-time
4. **Read the log**: Retrieve the generator log via `generator_read_log`
5. **Write the test**: Invoke `generator_write_test` with the generated source code

### Generated Test Structure

```ts
// spec: specs/portfolio/contact-form.md
// seed: packages/testing-e2e/tests/e2e/seed-portfolio.spec.ts

import { test, expect } from "@playwright/test";
import { selectors, helpers, testData } from "../fixtures";

test.describe("Contact Form Validation", () => {
  test("Submit valid contact form", async ({ page }) => {
    // 1. Navigate to the contact page
    await page.goto("/contact");

    // 2. Fill in the name field
    await page.getByLabel("Name").fill(testData.contact.valid.name);

    // 3. Fill in the email field
    await page.getByLabel("Email").fill(testData.contact.valid.email);

    // 4. Submit the form
    await page.getByRole("button", { name: /send/i }).click();

    // Expected: Success message appears
    await expect(page.getByText(/message sent/i)).toBeVisible();
  });
});
```

### Generation Rules

- **One test per file** — file name must be a filesystem-friendly scenario name
- **`test.describe` matches** the top-level plan item (without ordinal)
- **Test title matches** the scenario name (without ordinal)
- **Comment before each step** — do not duplicate comments for multi-action steps
- **Use shared fixtures**: Import `selectors`, `helpers`, `testData`, `mockResponses` from `../fixtures`
- **Use best practices from the log** when generating tests
- **Place generated tests** in `packages/testing-e2e/tests/e2e/` (or subdirectories)

## Phase 3: Healing (🎭 Healer)

### When to Heal

- Tests are failing after application changes
- Selectors broke due to UI refactoring
- Timing/flakiness issues need resolution
- Tests need updating for new behavior

### Healing Workflow

1. **Run all tests**: Use `test_run` to identify failing tests
2. **Debug each failure**: For each failing test, run `test_debug`
3. **Investigate errors**: When the test pauses on errors:
   - Examine error details
   - Capture page snapshot for context
   - Analyze selectors, timing issues, or assertion failures
4. **Root cause analysis**: Determine the underlying cause:
   - Selectors that changed
   - Timing and synchronization issues
   - Data dependencies or environment problems
   - Application changes that broke test assumptions
5. **Fix the code**: Edit the test to address identified issues
6. **Verify**: Restart the test after each fix
7. **Iterate**: Repeat until the test passes cleanly

### Healing Principles

- Fix errors **one at a time** and retest after each fix
- Prefer robust, maintainable solutions over quick hacks
- For dynamic data, use **regular expressions** for resilient locators
- **Never** wait for `networkidle` or use deprecated APIs
- If the test is correct but the app is broken, mark as `test.fixme()` with a comment explaining the issue
- Do not ask user questions — make the most reasonable fix possible

## Locator Best Practices

### Preferred Locator Strategy (in priority order)

| Priority | Locator | Example |
|----------|---------|---------|
| 1 | Role-based | `page.getByRole('button', { name: 'Submit' })` |
| 2 | Label-based | `page.getByLabel('Email address')` |
| 3 | Placeholder | `page.getByPlaceholder('Search...')` |
| 4 | Text content | `page.getByText('Welcome back')` |
| 5 | Test ID | `page.getByTestId('submit-btn')` |
| 6 | CSS selector | `page.locator('[data-test="form"]')` |

### Use Shared Selectors

**ALWAYS check `packages/testing-e2e/tests/fixtures/index.ts`** for existing selectors before creating new ones:

```ts
import { selectors } from "../fixtures";

// ✅ Use centralized selectors
await page.locator(selectors.contact.form).isVisible();
await page.locator(selectors.navigation.mainNav).click();

// ❌ Don't hardcode selectors in test files
await page.locator('[data-test="contact-form"]').isVisible();
```

## Assertion Patterns

### Structural Assertions (prefer these)

```ts
// Verify element visibility
await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

// Verify form state
await expect(page.getByLabel("Email")).toHaveValue("user@example.com");
await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();

// Verify list content
await expect(page.getByRole("listitem")).toHaveCount(3);

// Verify URL navigation
await expect(page).toHaveURL(/\/contact$/);
```

### ARIA Snapshot Assertions

Use for structural validation of complex UI:

```ts
await expect(page.getByRole("navigation")).toMatchAriaSnapshot(`
  - navigation:
    - link "Home"
    - link "Blog"
    - link "Contact"
`);
```

## API Mocking

Use the shared `mockResponses` and `helpers.mockContactApi()` from fixtures:

```ts
import { mockResponses, helpers } from "../fixtures";

test("handles API error gracefully", async ({ page }) => {
  // Mock API to return error
  await page.route("**/api/contact", (route) =>
    route.fulfill(mockResponses.contact.error)
  );

  // ... test steps ...
});
```

## Running Tests

```bash
# Run all E2E tests (portfolio then blog)
pnpm test:e2e

# Portfolio only
pnpm --filter=portfolio test:e2e

# Blog only
pnpm --filter=blog test:e2e

# Interactive modes
pnpm --filter=portfolio test:e2e:ui        # UI mode
pnpm --filter=portfolio test:e2e:headed    # Headed browser
pnpm --filter=portfolio test:e2e:debug     # Debug mode

# Single browser
pnpm --filter=portfolio test:e2e:chromium

# Mobile viewports
pnpm --filter=portfolio test:e2e:mobile

# Generate report
pnpm --filter=portfolio test:e2e:report

# Code generation helper
pnpm --filter=portfolio test:e2e:codegen
```

## Anti-Patterns

❌ **Hardcoded selectors** — Use shared `selectors` from fixtures
❌ **`networkidle` waits** — Deprecated and flaky; use specific element waits
❌ **`page.waitForTimeout()`** — Fragile; wait for specific conditions instead
❌ **`force: true` clicks** — Hides real accessibility issues
❌ **Duplicate test data** — Use shared `testData` and `mockResponses`
❌ **Tests depending on other tests** — Each test must be independent
❌ **Screenshots for validation** — Prefer snapshot assertions and structural checks
❌ **Raw CSS selectors** — Prefer role/label/text locators first

## Accessibility Testing

Leverage `@axe-core/playwright` for automated a11y checks:

```ts
import AxeBuilder from "@axe-core/playwright";

test("contact page has no a11y violations", async ({ page }) => {
  await page.goto("/contact");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

## Config Reference

| Setting | Portfolio | Blog |
|---------|-----------|------|
| Base URL | `http://127.0.0.1:4173` | `http://127.0.0.1:4174` |
| Timeout | 120s | 120s |
| Expect timeout | 10s | 10s |
| Action timeout | 15s | 15s |
| Retries (CI) | 2 | 2 |
| Retries (local) | 1 | 1 |
| Workers (CI) | 2 | 2 |
| Browsers | Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari | Same |
| Test ignore | — | `contact-form.spec.ts` |

## Resources

- [Playwright Test Agents](https://playwright.dev/docs/test-agents)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Locators Guide](https://playwright.dev/docs/locators)
- [ARIA Snapshots](https://playwright.dev/docs/aria-snapshots)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
