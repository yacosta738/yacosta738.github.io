# GitHub Actions - Composite Actions Architecture

**Date**: 2025-10-16  
**Purpose**: Complete guide for the optimized GitHub Actions architecture with reusable composite actions

## 📋 Overview

This project uses a modular GitHub Actions architecture with reusable composite actions to optimize CI/CD pipelines. This approach reduces duplication, improves maintainability, and enables intelligent caching strategies.

## 🏗️ Architecture

### Composite Actions (`.github/actions/`)

Reusable building blocks for common tasks:

### 1. setup-node

**Location**: `.github/actions/setup-node/action.yml`  
**Purpose**: Set up Node.js with caching support

**Inputs**:
- `node-version` (optional, default: '22'): Node.js version to install
- `cache` (optional, default: 'pnpm'): Package manager to cache (npm, pnpm, yarn)

**Usage**:
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/setup-node
    with:
      node-version: '22'
      cache: 'pnpm'
```

**When to use**:
- When you need Node.js without installing dependencies
- When you want to customize the Node.js version
- When you need just the Node.js environment setup

### 2. install-deps

**Location**: `.github/actions/install-deps/action.yml`  
**Purpose**: Install dependencies using pnpm with optimized caching

**Inputs**:
- `frozen-lockfile` (optional, default: 'true'): Use --frozen-lockfile flag
- `pnpm-version` (optional, default: auto-detect): pnpm version to use

**Usage**:
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/setup-node
  - uses: ./.github/actions/install-deps
    with:
      frozen-lockfile: 'true'
```

**When to use**:
- When you need to install dependencies with caching
- When you want automatic pnpm store caching
- In most CI/CD workflows that need dependencies

**Caching behavior**:
- Caches pnpm store directory
- Cache key based on `pnpm-lock.yaml` hash
- Restore-keys for partial cache hits

### 3. cache-docker

**Location**: `.github/actions/cache-docker/action.yml`  
**Purpose**: Set up Docker Buildx with layer caching

**Inputs**:
- `cache-key` (optional, default: 'docker-buildx'): Cache key for Docker layers
- `cache-from` (optional, default: 'type=gha'): Cache sources
- `cache-to` (optional, default: 'type=gha,mode=max'): Cache destinations

**Usage**:
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/cache-docker
  - name: Build Docker image
    run: |
      docker buildx build \
        --cache-from type=gha \
        --cache-to type=gha,mode=max \
        -t myapp:latest \
        .
```

**When to use**:
- When building Docker images in workflows
- When you want to cache Docker layers for faster builds
- In deployment workflows

### 4. setup (existing)

**Location**: `.github/actions/setup/action.yml`  
**Purpose**: Complete setup including Node.js, pnpm, and dependency installation

**Usage**:
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/setup
```

**When to use**:
- When you need the full setup (Node.js + pnpm + dependencies)
- In most CI/CD workflows
- This is the most common action to use

## Recommended Workflow Patterns

### Pattern 1: Full Setup (Most Common)

Use this for lint, test, and build jobs:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup
      - name: Run lint
        run: pnpm run check
```

### Pattern 2: Custom Node.js Version

When you need a specific Node.js version:

```yaml
jobs:
  test-node-18:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-node
        with:
          node-version: '18'
      - uses: ./.github/actions/install-deps
      - name: Run tests
        run: pnpm test
```

### Pattern 3: Docker Build with Caching

For deployment workflows:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/cache-docker
      - name: Build and push
        run: |
          docker buildx build \
            --cache-from type=gha \
            --cache-to type=gha,mode=max \
            -t myapp:latest \
            --push \
            .
```

### Pattern 4: No Frozen Lockfile (Development)

When you want to allow lockfile updates:

```yaml
jobs:
  update-deps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-node
      - uses: ./.github/actions/install-deps
        with:
          frozen-lockfile: 'false'
      - name: Update dependencies
        run: pnpm update
```

## Best Practices

### 1. Always Use Composite Actions

**Do this**:
```yaml
- uses: ./.github/actions/setup
```

**Not this**:
```yaml
- uses: actions/setup-node@v4
- uses: pnpm/action-setup@v4
- run: pnpm install
```

**Why**: Composite actions ensure consistency, automatic caching, and easier maintenance.

### 2. Leverage Caching

All composite actions include optimized caching:
- `setup-node`: Caches Node.js itself
- `install-deps`: Caches pnpm store
- `cache-docker`: Caches Docker layers

**Benefit**: Faster builds and reduced CI minutes.

### 3. Use Explicit Versions

When using `setup-node`, be explicit about Node.js version:

```yaml
- uses: ./.github/actions/setup-node
  with:
    node-version: '22'  # Explicit version
```

### 4. Test Composite Actions Locally

Before committing changes to composite actions:

```bash
# Test the action
act -j lint -W .github/workflows/ci.yml
```

### 5. Keep Actions Simple

Composite actions should:
- Have a single, clear purpose
- Accept minimal, well-documented inputs
- Fail fast with clear error messages
- Log important information

## Troubleshooting

### Cache Not Working

**Symptom**: Dependencies re-installed on every run

**Solution**:
1. Check `pnpm-lock.yaml` is committed
2. Verify cache key in action output
3. Check GitHub Actions cache dashboard

### Action Not Found

**Symptom**: `Error: Unable to resolve action ./.github/actions/setup`

**Solution**:
1. Ensure `actions/checkout@v4` runs first
2. Verify action path is correct
3. Check `action.yml` file exists

### Permission Denied

**Symptom**: Scripts fail with permission errors

**Solution**:
1. Ensure scripts in actions are executable:
   ```bash
   chmod +x .github/scripts/*.sh
   ```
2. Commit the permission change

## Migration Guide

### Migrating Existing Workflows

**Before**:
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '20'
      cache: 'pnpm'
  - uses: pnpm/action-setup@v4
  - run: pnpm install --frozen-lockfile
```

**After**:
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/setup
```

**Benefits**:
- Less boilerplate
- Automatic caching optimization
- Consistent configuration
- Easier to maintain

## Contributing

When creating new composite actions:

1. **Location**: Place in `.github/actions/ACTION_NAME/action.yml`
2. **Documentation**: Update this guide with usage examples
3. **Testing**: Test with `act` before committing
4. **Inputs**: Keep inputs minimal and well-documented
5. **Outputs**: Use outputs for important information
6. **Logging**: Log actions taken for debugging

## References

- [GitHub Actions: Creating Composite Actions](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)
- [GitHub Actions: Caching Dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [pnpm Action Setup](https://github.com/pnpm/action-setup)
- [Docker Buildx](https://github.com/docker/setup-buildx-action)
