# Implementation Plan: [FEATURE]


**Branch**: `002-pipeline-optimization` | **Date**: 2025-10-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-pipeline-optimization/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Primary requirement: Optimize the CI/CD pipeline for speed, reliability, and cost-efficiency. Technical approach: Apply conditional job execution, advanced caching, and modular composite actions; flag and remediate anti-patterns; validate against GitHub Actions best practices and security benchmarks.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->


**Language/Version**: TypeScript 5.x (strict), JavaScript (Node 22+), YAML (GitHub Actions)  
**Primary Dependencies**: Biome, Playwright, Vitest, Astro, Tailwind CSS, pnpm, Docker (for some jobs)  
**Storage**: N/A (stateless pipeline, uses ephemeral runners and GitHub Artifacts)  
**Testing**: Vitest (unit/integration), Playwright (E2E), Biome (lint/format), GitHub Actions workflow assertions  
**Target Platform**: GitHub-hosted Linux runners (ubuntu-latest), with possible macOS runners for cross-platform tests  
**Project Type**: Monorepo (apps/api, apps/portfolio, docs, specs)  
**Performance Goals**: Reduce average pipeline duration by ≥20%; maintain or improve reliability; reduce CI resource usage by ≥10%  
**Constraints**: No reduction in test coverage or quality gates; must support PR and main branch flows; must not increase security risk  
**Scale/Scope**: Supports all contributors (internal and external); typical PR volume 5–20/week; pipeline runs on every PR and main push


**Anti-patterns flagged:**

- Sequential steps lacking justification (e.g., build → test → lint when jobs could run in parallel)
- Undocumented dependencies between jobs (e.g., test depends on build artifacts but not declared)
- Overprivileged workflows (e.g., jobs running with unnecessary permissions or broad GITHUB_TOKEN scopes)

**Recommendations:**

- Use conditional job execution (e.g., skip deploy on docs-only changes, skip E2E on backend-only changes)
- Implement caching for npm/pnpm, pip, and Docker layers with proper cache invalidation (e.g., hash lockfiles, Dockerfile, or requirements.txt)
- Refactor reusable logic into composite actions (e.g., setup, install, test, build) to maximize DRY and maintainability
- Validate all workflows against GitHub Actions best practices and security benchmarks (principle of least privilege, explicit permissions, avoid untrusted code execution, use official actions)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*


*Code Quality*: Plan references Biome and TypeScript strict mode; coding conventions documented (AGENTS.md, TypeScript, Tailwind v4, Astro). All pipeline scripts and YAML must be reviewed for clarity and maintainability.
*Testing Standards*: All pipeline changes require automated tests (unit/integration for scripts, workflow assertions, E2E for P1 journeys). Regression tests required for any bug fix. Playwright coverage for frontend flows.
*UX Consistency*: Not directly applicable to pipeline, but all user-facing logs and error messages must be clear and actionable. i18n not required for pipeline logs.
*Performance Requirements*: Pipeline must meet or exceed defined budgets (duration, reliability, resource usage). Metrics must be measured in CI and reported in PRs or dashboards.

All gates can be met. No waivers required at this stage.

## Project Structure

### Documentation (this feature)


```text
specs/002-pipeline-optimization/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

ios/ or android/

```text
.github/
├── workflows/           # All GitHub Actions workflow YAMLs
├── actions/             # Custom and composite actions for DRY pipeline logic
└── scripts/             # Utility scripts for setup, cache, etc.

apps/
├── api/
├── portfolio/

tests/
├── contract/
├── integration/
└── unit/
```

**Structure Decision**: Use monorepo structure with workflows and composite actions in `.github/`, apps in `apps/`, and tests in `tests/`. Composite actions will be created or refactored for setup, install, build, and test steps to maximize reusability and maintainability.

## Complexity Tracking

*No Constitution violations or waivers required.*
