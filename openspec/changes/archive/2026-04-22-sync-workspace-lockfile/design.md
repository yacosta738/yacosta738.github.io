# Design: Sync Workspace Lockfile

## Technical Approach

Treat the repository root `pnpm-lock.yaml` as the only supported lockfile for
`packages/notion-astro-loader`. The package already participates in the root workspace via
`pnpm-workspace.yaml`, CI and release flows already install from the repository root through
`.github/actions/setup/action.yml`, and the root lockfile already contains the correct
`packages/notion-astro-loader` importer state.

The implementation will remove the stale nested `packages/notion-astro-loader/pnpm-lock.yaml`, align
the package metadata with the workspace-managed install model, and add a repo-level verification
step that fails when a workspace package reintroduces its own committed lockfile. This keeps frozen
installs deterministic without weakening `--frozen-lockfile` behavior.

## Architecture Decisions

### Decision: Use the root workspace lockfile as the single source of truth

**Choice**: Keep `pnpm-lock.yaml` at the repository root as the canonical lockfile and delete
`packages/notion-astro-loader/pnpm-lock.yaml`.
**Alternatives considered**: Regenerate and maintain both root and nested lockfiles; remove
`--frozen-lockfile` from CI or isolated workflows.
**Rationale**: The current repository behavior is already workspace-first: `pnpm-workspace.yaml`
includes `packages/*`, `apps/blog` consumes `@yap/astro-notion-loader` through `workspace:*`, and
all automation installs from the root. Maintaining a second lockfile adds drift without supporting a
documented in-repo workflow.

### Decision: Enforce the strategy with a repo-level guardrail

**Choice**: Add a lightweight verification script that checks workspace packages do not commit their
own `pnpm-lock.yaml` files, and run it in CI as part of the shared setup/check path.
**Alternatives considered**: Rely on contributor discipline; document the policy only; add a more
complex dual-lockfile sync script.
**Rationale**: The regression came from silent divergence. A file-system level check is cheap,
deterministic, and catches the exact failure mode before it becomes another stale committed lockfile.

### Decision: Align package metadata with the workspace-managed install model

**Choice**: Update `packages/notion-astro-loader/package.json` so its `packageManager` metadata no
longer points to an older pnpm patch release than the monorepo root.
**Alternatives considered**: Leave the package-level version mismatch in place; remove the field
entirely.
**Rationale**: Every other workspace manifest already points to `pnpm@10.32.1`. Keeping the loader
package on `pnpm@10.7.0` increases the chance that contributors regenerate artifacts with a slightly
different toolchain and interpret the package as independently managed.

## Data Flow

### Dependency update flow

    Developer updates packages/notion-astro-loader/package.json
         |
         +--> runs pnpm install from repo root
         |        |
         |        +--> updates root pnpm-lock.yaml importer: packages/notion-astro-loader
         |
         +--> runs lockfile verification
                  |
                  +--> passes when no nested workspace lockfile exists
                  +--> fails with actionable error if a package-level pnpm-lock.yaml is committed

### CI install flow after the change

    GitHub Actions setup --> verify lockfile model --> pnpm install --frozen-lockfile
            |                                                |
            |                                                +--> reads root pnpm-lock.yaml only
            +--> fail fast if a nested workspace lockfile reappears

### Sequence diagram: frozen install validation

```text
participant Dev as Contributor
participant Repo as Monorepo Files
participant Guard as Lockfile Check
participant CI as GitHub Setup Action
participant PNPM as pnpm

Dev->>Repo: Change package dependencies
Dev->>PNPM: pnpm install (repo root)
PNPM->>Repo: Update root pnpm-lock.yaml importer
Dev->>Guard: Run lockfile verification
Guard-->>Dev: Pass only if no nested workspace lockfile exists

CI->>Guard: Verify lockfile model
Guard-->>CI: Pass/fail
CI->>PNPM: pnpm install --frozen-lockfile
PNPM->>Repo: Resolve from root pnpm-lock.yaml
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `packages/notion-astro-loader/pnpm-lock.yaml` | Delete | Remove the stale standalone lockfile so the package is no longer treated as independently locked. |
| `packages/notion-astro-loader/package.json` | Modify | Align package metadata with the workspace-only install model, including the pnpm version reference. |
| `pnpm-lock.yaml` | Verify | Confirm the root importer entry for `packages/notion-astro-loader` remains the canonical dependency snapshot. |
| `package.json` | Modify | Add a reusable verification script entry so contributors and CI can validate the lockfile policy consistently. |
| `scripts/verify-workspace-lockfiles.mjs` | Create | Fail when committed workspace packages contain nested `pnpm-lock.yaml` files, with a targeted message for this repo's policy. |
| `.github/actions/setup/action.yml` | Modify | Run the verification step in the shared setup path before or alongside frozen installs so every workflow enforces the same rule. |
| `.github/workflows/ci.yml` | Verify | Confirm the shared setup action keeps lint, test, build, and E2E jobs on the root lockfile path. |
| `.github/workflows/release.yml` | Verify | Confirm release automation continues to use the same shared setup action and root frozen install behavior. |

## Interfaces / Contracts

### Lockfile verification contract

```ts
type WorkspaceLockfileViolation = {
  packagePath: string;
  lockfilePath: string;
  message: string;
};
```

Expected behavior:

```text
Input: repository workspace package directories
Rule: committed workspace packages MUST NOT contain pnpm-lock.yaml
Pass: zero nested workspace lockfiles found
Fail: print violating paths and instruct contributors to update the root pnpm-lock.yaml instead
```

### Canonical install contract

```text
Supported install: pnpm install --frozen-lockfile (repository root)
Unsupported install model: pnpm install --frozen-lockfile --ignore-workspace inside packages/notion-astro-loader
Canonical lock owner: /pnpm-lock.yaml
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Lockfile verification detects nested workspace lockfiles and ignores the root lockfile | Add focused tests for `scripts/verify-workspace-lockfiles.mjs` if the repo already has a simple Node/Vitest pattern for scripts; otherwise keep the script small and validate through CLI execution. |
| Integration | Root frozen install succeeds with the loader package managed through the workspace importer | Run `pnpm install --frozen-lockfile` from the repository root after removing the nested lockfile. |
| Integration | Guardrail fails when a nested workspace lockfile exists | Temporarily restore or fixture a nested `pnpm-lock.yaml` path and run the verification command to confirm the expected non-zero exit and message. |
| CI | Shared setup action enforces the policy before downstream jobs run | Validate the setup action locally where practical and confirm CI jobs continue using `./.github/actions/setup`. |

## Migration / Rollout

No data migration is required. Rollout consists of landing the lockfile-policy change and letting the
existing CI and release workflows consume it through the shared setup action.

For contributors, the operational change is simple:

- update workspace dependencies from the repository root;
- commit the root `pnpm-lock.yaml` when dependency resolution changes;
- do not regenerate or commit package-level lockfiles for workspace members.

## Rollback Considerations

If a real standalone workflow for `packages/notion-astro-loader` is discovered after rollout:

1. Restore `packages/notion-astro-loader/pnpm-lock.yaml` from git history.
2. Regenerate it against the current package manifest with the repo-approved pnpm version.
3. Replace the single-lockfile guardrail with a dual-lockfile verification flow that explicitly checks
   both the root and package lockfiles.
4. Document the standalone workflow so future dependency changes update both artifacts together.

If the shared setup verification proves too broad, rollback can also be limited to removing the CI
guardrail while keeping the root lockfile as the documented source of truth.

## Open Questions

- [ ] None.
