# Workspace Dependencies Specification

## Purpose

Define deterministic lockfile ownership and frozen-install validation for workspace-managed packages.

## Requirements

### Requirement: Root lockfile is the canonical workspace lockfile

The repository MUST treat the root `pnpm-lock.yaml` as the canonical lockfile for all packages declared in `pnpm-workspace.yaml`, including `packages/notion-astro-loader`.

#### Scenario: Root frozen install resolves workspace package dependencies

- GIVEN `packages/notion-astro-loader` is listed under the workspace packages
- WHEN `pnpm install --frozen-lockfile` is run from the repository root
- THEN the install MUST resolve `packages/notion-astro-loader` from the root `pnpm-lock.yaml`
- AND the install MUST complete without requiring a package-local lockfile

#### Scenario: Workspace dependency changes require root lockfile alignment

- GIVEN a committed change modifies dependency specifiers in `packages/notion-astro-loader/package.json`
- WHEN frozen-install validation is run for the supported workspace workflow
- THEN the repository MUST require the root `pnpm-lock.yaml` to reflect the same dependency specifiers
- AND validation MUST fail if the root lockfile is stale

### Requirement: Workspace CI and release installs use the canonical lockfile model

The system MUST validate dependency installation for CI and release workflows from the repository root, and MUST NOT depend on an undocumented package-local frozen-install workflow for `packages/notion-astro-loader`.

#### Scenario: CI setup installs from workspace root

- GIVEN a CI or release workflow prepares dependencies through the shared setup action
- WHEN the install step runs
- THEN it MUST execute from the repository root using `pnpm install --frozen-lockfile`
- AND the workflow MUST use the root lockfile as its deterministic dependency source

#### Scenario: Package-local lockfile drift does not define supported build behavior

- GIVEN `packages/notion-astro-loader` is supported as a workspace-managed package
- WHEN dependency behavior is documented or validated for builds and releases
- THEN the supported frozen-install workflow MUST be the root workspace install
- AND the repository MUST NOT require `packages/notion-astro-loader/pnpm-lock.yaml` to pass supported CI or release checks

### Requirement: Lockfile ownership has a drift-prevention guardrail

The repository MUST include a documented or automated guardrail that makes the canonical lockfile strategy for `packages/notion-astro-loader` explicit during dependency updates.

#### Scenario: Dependency update guidance points to the canonical lockfile

- GIVEN a contributor updates dependencies for `packages/notion-astro-loader`
- WHEN they follow the repository's lockfile guidance or verification steps
- THEN the guidance MUST identify the root `pnpm-lock.yaml` as the lockfile that must remain in sync

#### Scenario: Reintroduction of dual-lockfile ownership is blocked or made explicit

- GIVEN a change reintroduces `packages/notion-astro-loader/pnpm-lock.yaml` or another package-local lockfile for the same workspace package
- WHEN repository validation or review guidance is applied
- THEN the change MUST either fail validation or require explicit documentation of a supported standalone workflow in the same change
- AND the repository MUST NOT leave lockfile ownership ambiguous
