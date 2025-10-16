<!--
Sync Impact Report
- Version change: 1.0.1 → 1.0.2
- Modified principles: None
- Added sections: None
- Removed sections: None
- Templates reviewed for alignment:
  - ✅ .specify/templates/plan-template.md (Constitution Check aligns with gates)
  - ✅ .specify/templates/spec-template.md (NFRs reflect gates and budgets)
  - ✅ .specify/templates/tasks-template.md (tests required note present)
  - ✅ .specify/templates/agent-file-template.md (generic; no agent-specific names)
  - ⚠ .specify/templates/commands/* (directory not present) — N/A
- Follow-up TODOs: None
-->

# Portfolio Monorepo (yacosta738.github.io) Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)

All source must be readable, consistent, and type-safe.

- Lint/format: Biome is the single source of truth. `pnpm check` MUST pass with
  zero errors before merge. Formatting is not debated in review.
- Type safety: TypeScript `strict` MUST be enabled. Avoid `any`; use `unknown`
  with proper narrowing. Prefer `type` aliases over `interface` unless merging
  is explicitly required. Prefer named exports.
- Maintainability: Functions and components MUST be small, cohesive, and have a
  single responsibility. Follow the repo’s Architecture, Astro, Tailwind v4,
  TypeScript, HTML, and UI conventions documented in `AGENTS.md`.
- Docs-as-code: Public APIs, utilities, and complex components MUST include
  inline docs or links to reference docs in `/docs`.

Rationale: High-quality, consistent code reduces defects, accelerates onboarding,
and lowers long-term maintenance cost.

### II. Testing Standards (NON-NEGOTIABLE)

Every change MUST be protected by automated tests at the appropriate level.

- Scope: New features require tests; bug fixes REQUIRE a regression test.
- Levels by app:
  - apps/api: Unit tests (Vitest) + integration/contract tests for endpoints.
  - apps/portfolio: End-to-end tests (Playwright) for primary user journeys; add
    unit/integration tests where value is high.
- Red–Green–Refactor: Tests SHOULD be written first or alongside and MUST fail
  before implementation when practical.
- Coverage: For libraries and API code, target ≥80% statements/branches overall
  with no critical paths untested. For the portfolio, at minimum one E2E test
  per P1 user journey and a smoke test per supported language.
- Reliability: Flaky tests MUST be fixed or quarantined within 48 hours; no
  merges with known flakiness on required checks.

Rationale: Tests provide safety for refactors, enforce behavior, and protect
user experience.

### III. User Experience Consistency

The interface MUST be consistent, accessible, and aligned with conventions.

- Design system: Follow Atomic Design and Tailwind v4 conventions. Prefer
  semantic utilities defined in `src/styles/global.css` and component-scoped
  styling. Avoid unnecessary client JS; use Astro islands only when needed.
- Accessibility: Meet WCAG 2.1 AA contrast; full keyboard support; visible
  focus; accurate names/labels; `alt` text; polite `aria-live` for status.
- Internationalization: Text MUST be localizable; dates/numbers are
  locale-aware; ensure parity across languages per docs/i18n guides.
- Navigation & state: URLs MUST reflect navigable state; links are links; back
  and forward behavior preserved; avoid layout shift with reserved space.

Rationale: Consistency and a11y broaden reach, reduce cognitive load, and build
trust.

### IV. Performance Requirements

Deliver fast-by-default experiences with explicit budgets.

- Web (apps/portfolio):
  - Core Web Vitals (mobile p75): LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1.
  - Lighthouse: Performance score ≥ 90 on key pages (home, articles, CV) in CI
    or documented local runs.
  - Shipping JS: Keep client JS minimal; prefer static HTML; hydrate only where
    necessary (`client:*`). Lazy-load below-the-fold images; use Astro `<Image>`.
- API (apps/api):
  - Latency: p95 ≤ 200ms under expected load; cold-start overhead minimized on
    Workers; timeouts and retries applied as appropriate.
  - Reliability: Explicit error handling, input validation, and idempotency for
    mutating endpoints.

Rationale: Performance is a feature; fast systems improve UX, SEO, and costs.

## Quality Gates (CI/CD)

These MUST pass on every PR to protected branches and on `main`:

- Build: `pnpm build` succeeds for all apps.
- Lint/Typecheck: `pnpm check` passes (Biome + typecheck). No new warnings are
  introduced in required checks.
- Tests: All required unit/integration tests pass (Vitest), and required E2E
  tests (Playwright) pass for primary journeys and supported locales.
- UX: Accessibility checks (manual or automated) confirm focus, names, and
  contrast for changed surfaces; no regressions to navigation semantics.
- Performance: Evidence of meeting budgets for affected pages/endpoints (CI or
  documented local run linked from the PR).

Exceptions MUST be recorded in the feature’s plan (`Complexity Tracking`) with a
remediation path and owners; time-boxed waivers expire in ≤30 days.

## Development Workflow & Review Process

- Branching: `feature/*`, `fix/*`, `chore/*` naming. Keep changes small and
  reviewable.
- PR requirements: Link to spec/plan; include a Constitution Check summary
  showing how gates were met (or waivers). At least one reviewer approval.
- Commits: Conventional Commits are encouraged; release automation uses
  semantic-release.
- Documentation: Update `/docs` and in-repo READMEs when behavior or guidance
  changes.

## Governance

This Constitution supersedes other engineering practices for this repository.

- Amendments: Proposed via PR with a Sync Impact Report and propagation plan
  for templates/docs. Breaking governance changes require team approval.
- Versioning of this document: Semantic Versioning is used.
  - MAJOR: Backward-incompatible governance changes or principle removals.
  - MINOR: New principles/sections or materially expanded guidance.
  - PATCH: Clarifications and non-semantic edits.
- Compliance: Reviewers verify Constitution Check in plans/PRs. Non-compliant
  changes must carry a recorded waiver with owners and expiry.

**Version**: 1.0.2 | **Ratified**: 2025-10-16 | **Last Amended**: 2025-10-16
