# Proposal: Sync Workspace Lockfile

## Intent

Fix lockfile drift for `packages/notion-astro-loader` so frozen installs remain deterministic in CI and release workflows. The package manifest has moved forward, but the nested `pnpm-lock.yaml` still reflects an older standalone state, creating a reproducible `ERR_PNPM_OUTDATED_LOCKFILE` failure and leaving dependency ownership unclear.

## Scope

### In Scope
- Decide whether `packages/notion-astro-loader` is supported only as a workspace package or also as a standalone package.
- Align lockfile ownership with that decision so the repository has one clear source of truth for frozen installs.
- Add or update verification/documentation so future dependency changes do not silently reintroduce lockfile drift.

### Out of Scope
- Upgrading package dependencies beyond what is needed to restore lockfile consistency.
- Broad changes to CI, release automation, or unrelated monorepo package management conventions.

## Approach

Adopt the root `pnpm-lock.yaml` as the default canonical lockfile because current CI and release workflows install from the workspace root. The recommended implementation is to treat `packages/notion-astro-loader` as workspace-managed, remove or stop maintaining its nested lockfile, and add a verification step that checks the chosen lockfile model during dependency updates. If a documented standalone install workflow is discovered, fall back to explicitly regenerating and validating the nested lockfile in the same change instead of relaxing frozen-lockfile enforcement.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `packages/notion-astro-loader/package.json` | Modified | Confirms the package manifest whose dependencies must match the selected lockfile model. |
| `packages/notion-astro-loader/pnpm-lock.yaml` | Modified/Removed | Drift source to remove or regenerate depending on the supported install model. |
| `pnpm-lock.yaml` | Modified/Verified | Remains the workspace source of truth for root installs. |
| `pnpm-workspace.yaml` | Verified | Confirms the package is managed as a workspace member. |
| `.github/actions/setup/action.yml` | Verified/Modified | Existing root `pnpm install --frozen-lockfile` behavior should stay aligned with the chosen lockfile strategy. |
| `.github/workflows/ci.yml` | Verified | Confirms CI depends on deterministic workspace installs. |
| `.github/workflows/release.yml` | Verified | Confirms release automation depends on deterministic workspace installs. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| An undocumented standalone workflow depends on `packages/notion-astro-loader/pnpm-lock.yaml` | Medium | Confirm package install expectations before removal; keep the fallback path to regenerate the nested lockfile if needed. |
| Future dependency updates reintroduce drift | Medium | Add an explicit verification step and document the canonical lockfile ownership. |
| pnpm version differences keep producing inconsistent lockfile output | Low | Validate with the repo's current CI pnpm version and avoid changing frozen-lockfile behavior as part of this fix. |

## Rollback Plan

If the change breaks a real standalone workflow, restore `packages/notion-astro-loader/pnpm-lock.yaml`, regenerate it against the current package manifest, and document that the package requires dual lockfile maintenance. If workspace installs regress, revert the lockfile strategy change and restore the previous verified lockfile files.

## Dependencies

- Existing workspace install flow in `pnpm-workspace.yaml`
- Root install enforcement in `.github/actions/setup/action.yml`
- Confirmation of whether `@yap/astro-notion-loader` is intended to be independently installed outside the monorepo

## Success Criteria

- [ ] The repository has one documented lockfile strategy for `packages/notion-astro-loader`.
- [ ] Frozen install validation passes for the supported workflow model without `ERR_PNPM_OUTDATED_LOCKFILE`.
- [ ] The chosen approach includes a guardrail or documentation update that reduces future lockfile drift.
