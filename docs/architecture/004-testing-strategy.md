# ADR-004: Testing Strategy

## Status
**Accepted** | Date: 2024-01

## Context
We need a testing strategy that ensures:
- Code quality
- Minimal regression
- Confidence in deployments

## Decision
We will use a multi-level testing strategy:

### Testing Levels:

#### 1. Unit Tests (Vitest)
- **Scope**: Utilities, pure functions, isolated components
- **Location**: `tests/unit/**/*.test.ts`
- **Execution**: In CI and pre-push

#### 2. Integration Tests (Vitest)
- **Scope**: API endpoints, handlers
- **Location**: `src/**/*.test.ts` (in each app)
- **Mocks**: Wrangler for Workers testing

#### 3. E2E Tests (Playwright)
- **Scope**: Complete user flows
- **Location**: `packages/testing-e2e/tests/e2e/**/*.spec.ts`
- **Browsers**: Chromium, Firefox, WebKit, Mobile
- **Accessibility**: @axe-core/playwright

### Target Coverage:
- Unit: >70% for business logic
- API: 100% coverage on endpoints
- E2E: Critical flows (contact, newsletter, navigation)

### CI Pipeline:
```
1. Biome (lint + format)
2. TypeScript check
3. Unit tests + coverage
4. Build
5. E2E tests (Playwright)
6. SonarCloud quality gate
```

## Consequences
- ✅ Multiple levels = confidence
- ✅ Coverage tracking
- ✅ Accessibility verified
- ❌ CI time increases
- ❌ E2E tests maintenance

## References
- Playwright config: `apps/*/playwright.config.ts`
- Vitest config: `apps/*/vitest.config.ts`
