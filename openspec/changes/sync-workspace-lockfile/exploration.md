## Exploration: sync workspace lockfile

### Current State
- Snapshot anchor: repository state at commit `1330ca6` (`2026-03-28T09:16:21+01:00`).
- The monorepo is configured around a single workspace install from the repository root via `pnpm-workspace.yaml` and `pnpm install --frozen-lockfile` in `.github/actions/setup/action.yml`.
- The root lockfile already includes the `packages/notion-astro-loader` importer and the `apps/blog` workspace link to `@yap/astro-notion-loader`, so root-level frozen installs succeed.
- `packages/notion-astro-loader/package.json` has been upgraded to Astro 6-era dependencies (`astro@6.0.8`, `@notionhq/client@^5.14.0`, `rehype-katex@^7.0.1`, `slug@^11.0.1`, `zod@^4.3.6`, `vitest@^4.1.1`).
- `packages/notion-astro-loader/pnpm-lock.yaml` is stale and still describes an older standalone package state (`astro@5.0.3`, `@notionhq/client@^2.2.0`, `rehype-katex@^6.0.0`, `slug@^9.1.0`, no `zod`).
- Reproduction: `pnpm install --frozen-lockfile --ignore-workspace` from `packages/notion-astro-loader` fails with `ERR_PNPM_OUTDATED_LOCKFILE` because the local lockfile specifiers do not match `packages/notion-astro-loader/package.json`.

### Affected Areas
- `packages/notion-astro-loader/package.json` — current package manifest that no longer matches the nested lockfile.
- `packages/notion-astro-loader/pnpm-lock.yaml` — stale standalone lockfile causing the reproducible frozen-lockfile failure.
- `pnpm-lock.yaml` — current workspace lockfile and likely canonical lock for normal monorepo installs.
- `pnpm-workspace.yaml` — defines `packages/*` as workspace members, which makes root install behavior differ from isolated package installs.
- `.github/actions/setup/action.yml` — CI installs from the workspace root with `pnpm install --frozen-lockfile`.
- `.github/workflows/ci.yml` and `.github/workflows/release.yml` — production CI/release entry points that depend on deterministic lockfile behavior.

### Approaches
1. **Single lockfile source of truth** — Treat the root `pnpm-lock.yaml` as canonical and remove or stop committing `packages/notion-astro-loader/pnpm-lock.yaml`.
   - Pros: Eliminates dual-lockfile drift; matches current workspace CI/install flow; lowest ongoing maintenance.
   - Cons: Loses a standalone lockfile for isolated package installs unless that workflow is intentionally unsupported.
   - Effort: Low.

2. **Sync both root and nested lockfiles** — Keep `packages/notion-astro-loader/pnpm-lock.yaml`, but regenerate it from the current package manifest and document/update both lockfiles together.
   - Pros: Preserves standalone package install support; keeps package-level reproducibility.
   - Cons: Two lockfiles must be maintained forever; easy to regress again without automation.
   - Effort: Medium.

3. **Relax frozen-lockfile enforcement** — Change CI or package-level install commands to allow non-frozen installs.
   - Pros: Fastest unblock if a pipeline is already failing.
   - Cons: Masks dependency drift instead of fixing it; weakens reproducibility and should not be the preferred long-term fix.
   - Effort: Low.

### Recommendation
Use **Single lockfile source of truth** unless `packages/notion-astro-loader` is intentionally installed and validated outside the workspace. The root workspace lockfile is already correct for the current monorepo, while the nested package lockfile is the actual drifting artifact. If standalone package installs must remain supported, the fallback recommendation is to explicitly regenerate and verify the nested lockfile in the same change.

### Risks
- Removing the nested lockfile could break any undocumented standalone install/release workflow that expects `packages/notion-astro-loader/pnpm-lock.yaml`.
- Keeping both lockfiles without automation will likely reintroduce the same drift on the next dependency update.
- The package uses `packageManager: pnpm@10.7.0` while the repo root and workflows use newer `pnpm` 10.x versions, which increases the chance of future lockfile inconsistencies.

### Ready for Proposal
Yes — the proposal should decide whether `packages/notion-astro-loader` is a workspace-only package or must remain independently installable, then implement the matching lockfile strategy and add a verification step for the chosen model.
