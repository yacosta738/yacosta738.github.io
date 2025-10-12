# Semantic Release Analysis - Monorepo

## 📋 Current Status

### Global Configuration

**Location:** `.releaserc.json` (monorepo root)

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "pnpm-lock.yaml", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

### Monorepo Structure

```
yacosta-portfolio-monorepo/
├── package.json (no version, "semantic-release" script)
├── .releaserc.json (global config)
├── apps/
│   ├── portfolio/ (version: 0.0.1, has semantic-release deps)
│   └── api/ (version: 0.0.1, no semantic-release deps)
└── pnpm-workspace.yaml (packages: 'apps/*')
```

### Package Versions

- **Root**: no `version` field (correct for a private monorepo)
- **apps/portfolio**: `0.0.1` (static, not updated automatically)
- **apps/api**: `0.0.1` (static, not updated automatically)

### CI/CD Workflow

**File:** `.github/workflows/deploy.yml`

```yaml
- name: 🚀 Semantic Release
  run: npx semantic-release
  env:
    GITHUB_TOKEN: ${{ env.PBOT_GITHUB_TOKEN }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Runs on:
- Push to `main`
- Manual workflow dispatch

## 🔍 Problem Analysis

### ❌ Problem 1: Incomplete Monorepo Configuration

**Current state:** The semantic-release configuration is **global** but not adapted to handle multiple independent packages.

**Symptoms:**
- Only one `CHANGELOG.md` is generated at the root.
- Only the root `package.json` is committed (which has no version).
- Versions in `apps/*/package.json` are not updated.
- No separate releases are created per application.

**Impact:**
- ❌ Changes in `apps/api` do not trigger independent releases.
- ❌ Changes in `apps/portfolio` do not trigger independent releases.
- ❌ No separate CHANGELOGs per app.
- ❌ Package versions are static (0.0.1).

### ❌ Problem 2: @semantic-release/npm Plugin Not Configured

**Current state:** The plugin is installed (present in `pnpm-lock.yaml`) but **is NOT in `.releaserc.json`**.

**Impact:**
- ❌ Versions in the apps' `package.json` files are not updated.
- ❌ Packages are not published (even if private, the plugin's role is to update versions).

### ❌ Problem 3: Lack of a Multi-Package Versioning Strategy

**Unimplemented options:**
1.  **Unified versioning** (all apps share a version): requires `@semantic-release/npm` or `@semantic-release/exec` plugin to update all `package.json` files.
2.  **Independent versions** (each app has its own version): requires multiple semantic-release runs with specific configurations.

**Current state:** Neither strategy is implemented.

## ✅ Proposed Solutions

### Option 1: Unified Versioning (Recommended for this case)

All apps share the same version. Any change increments the version of the entire monorepo.

**Advantages:**
- ✅ Simple to maintain
- ✅ Consistency across apps
- ✅ A single CHANGELOG
- ✅ Ideal for apps that are deployed together

**Implementation:**

1.  **Update `.releaserc.json`:**

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        "npmPublish": false
      }
    ],
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "pnpm -r exec npm version ${nextRelease.version} --no-git-tag-version"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": [
          "package.json",
          "apps/*/package.json",
          "pnpm-lock.yaml",
          "CHANGELOG.md"
        ],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}
```

2.  **Install missing dependencies:**

```bash
cd /Users/acosta/Dev/yacosta738.github.io
pnpm add -D -w @semantic-release/npm @semantic-release/exec @semantic-release/github
```

3.  **Add a version to the root `package.json`:**

```json
{
  "name": "yacosta-portfolio-monorepo",
  "version": "0.0.0-development",
  "private": true,
  ...
}
```

### Option 2: Independent Versions (More Complex)

Each app has its own version and release notes.

**Advantages:**
- ✅ Independent releases per app
- ✅ Separate CHANGELOGs
- ✅ Semantic versioning per application

**Disadvantages:**
- ❌ More complex to configure
- ❌ Requires multiple semantic-release executions
- ❌ Needs commit filtering per app

**Implementation:**

Requires:
- Multiple `.releaserc.json` files (one per app)
- Separate scripts in CI/CD
- A plugin like `@semantic-release/monorepo` or custom logic
- Conventional commits with scopes (e.g., `feat(api): ...`, `feat(portfolio): ...`)

### Option 3: Hybrid (Not Recommended for this Project)

Only one app uses semantic-release, the other does not.

## 📊 Recommendation

**For this project: Option 1 - Unified Versioning**

**Reasons:**
1.  The apps are related (portfolio + its API).
2.  They are deployed together in the same workflow.
3.  It simplifies maintenance.
4.  Ensures version consistency.

## 🚀 Implementation Plan

### Phase 1: Basic Configuration

1.  ✅ Add `@semantic-release/npm` to `.releaserc.json`.
2.  ✅ Add `@semantic-release/exec` to update versions in apps.
3.  ✅ Update assets in `@semantic-release/git` to include `apps/*/package.json`.
4.  ✅ Add an initial version to the root `package.json`.

### Phase 2: Testing

1.  ✅ Create a test commit using a conventional commit message.
2.  ✅ Run `npx semantic-release --dry-run` locally.
3.  ✅ Verify that versions are updated correctly.

### Phase 3: Deployment

1.  ✅ Merge to `main`.
2.  ✅ Verify the workflow execution.
3.  ✅ Review the generated release.
4.  ✅ Check the tags and CHANGELOG.

## 📝 Useful Commands

```bash
# Local dry run (no actual commits)
npx semantic-release --dry-run

# See what version would be generated
npx semantic-release --dry-run --no-ci

# Run semantic-release manually
GITHUB_TOKEN=xxx npx semantic-release

# Update versions manually (temporary)
pnpm -r exec npm version 1.0.0 --no-git-tag-version
```

## 🔗 References

- [Semantic Release Docs](https://semantic-release.gitbook.io/)
- [Semantic Release NPM Plugin](https://github.com/semantic-release/npm)
- [Semantic Release Exec Plugin](https://github.com/semantic-release/exec)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [PNPM Workspaces](https://pnpm.io/workspaces)

## 📌 Additional Notes

### Commit Conventions

Ensure you use conventional commits for semantic-release to work:

- `feat:` → minor version bump (0.1.0 → 0.2.0)
- `fix:` → patch version bump (0.1.0 → 0.1.1)
- `feat!:` or `BREAKING CHANGE:` → major version bump (0.1.0 → 1.0.0)

### Configuration for Individual Apps

If you decide to use independent versions later:

**apps/api/.releaserc.json:**
```json
{
  "extends": "../../.releaserc.json",
  "tagFormat": "api-v${version}",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
    "@semantic-release/npm",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"]
    }],
    "@semantic-release/github"
  ]
}
```

**apps/portfolio/.releaserc.json:**
```json
{
  "extends": "../../.releaserc.json",
  "tagFormat": "portfolio-v${version}",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
    "@semantic-release/npm",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"]
    }],
    "@semantic-release/github"
  ]
}
```

And execute in CI/CD:
```bash
pnpm --filter=api -C apps/api run semantic-release
pnpm --filter=portfolio -C apps/portfolio run semantic-release
```