# Tasks: Sync Workspace Lockfile

## Phase 1: Lockfile Ownership Foundation

- [x] 1.1 Delete `packages/notion-astro-loader/pnpm-lock.yaml` so `packages/notion-astro-loader` no longer carries a package-local workspace lockfile.
- [x] 1.2 Update `packages/notion-astro-loader/package.json` to align its `packageManager` metadata with the monorepo root `package.json` workspace pnpm version and make the package clearly workspace-managed.
- [x] 1.3 Verify `pnpm-lock.yaml` still contains the canonical importer entry for `packages/notion-astro-loader` after the package-local lockfile is removed, and refresh the root lockfile from the repository root only if the importer metadata is stale.

## Phase 2: Guardrail Implementation

- [x] 2.1 Create `scripts/verify-workspace-lockfiles.mjs` to scan workspace package directories from `pnpm-workspace.yaml`, ignore the root `pnpm-lock.yaml`, and fail with actionable output when a committed package-local `pnpm-lock.yaml` is found.
- [x] 2.2 Add a reusable script entry in `package.json` for the new workspace lockfile verification command so contributors and automation invoke the same check.
- [x] 2.3 Update `.github/actions/setup/action.yml` to run the workspace lockfile verification before `pnpm install --frozen-lockfile` so CI and release jobs fail fast on reintroduced nested lockfiles.

## Phase 3: Workflow Alignment

- [x] 3.1 Verify `.github/workflows/ci.yml` continues to use `./.github/actions/setup` for dependency preparation and does not introduce any package-local frozen install path for `packages/notion-astro-loader`.
- [x] 3.2 Verify `.github/workflows/release.yml` continues to use `./.github/actions/setup` with root-level `pnpm install --frozen-lockfile` semantics and does not depend on `packages/notion-astro-loader/pnpm-lock.yaml`.
- [x] 3.3 If contributor guidance is needed to make the canonical lockfile model explicit, add a short note to the most relevant repo-owned entry point touched by this change (for example the new script message or adjacent workflow/setup documentation) stating that dependency updates for `packages/notion-astro-loader` must be performed from the repository root.

## Phase 4: Verification

- [x] 4.1 Run the new verification command from the repository root and confirm it passes when no workspace package contains a nested `pnpm-lock.yaml`.
- [x] 4.2 Validate the guardrail failure path by creating a temporary nested `pnpm-lock.yaml` fixture under a workspace package, rerunning the verification command, and confirming it exits non-zero with the expected remediation message; remove the temporary fixture after the check.
- [x] 4.3 Run `pnpm install --frozen-lockfile` from the repository root and confirm the supported workspace install succeeds without `ERR_PNPM_OUTDATED_LOCKFILE`.
- [x] 4.4 Review the completed change against `openspec/changes/sync-workspace-lockfile/specs/workspace-dependencies/spec.md` and confirm each scenario is covered by the implemented guardrail, workflow wiring, and root install validation.
