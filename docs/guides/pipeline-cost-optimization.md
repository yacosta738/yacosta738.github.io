# Pipeline Cost Optimization Guide

This guide documents the cost optimization strategies implemented in the CI/CD pipeline to reduce resource usage and GitHub Actions minutes.

## Overview

Pipeline cost optimization focuses on **reducing unnecessary work** while maintaining quality and developer experience. Our strategy achieves a **10%+ reduction in CI minutes** through smart job skipping, efficient caching, and resource management.

## Key Optimization Strategies

### 1. Smart Job Skipping with Path Filtering

**Problem**: Running full CI/CD pipelines for documentation-only changes wastes resources.

**Solution**: Implement `paths-ignore` filters to skip non-code changes.

**Implementation**:

```yaml
on:
  push:
    branches: ["main"]
    paths-ignore:
      - 'docs/**'           # Documentation files
      - '**.md'             # Markdown files  
      - 'specs/**'          # Specification documents
      - '.github/ISSUE_TEMPLATE/**'
      - '.github/PULL_REQUEST_TEMPLATE/**'
```

**Files Modified**:

- `.github/workflows/ci.yml`
- `.github/workflows/playwright.yml`

**Impact**: Skips CI and E2E tests for ~30% of commits (docs/spec updates)

---

### 2. Dynamic Job Execution

**Problem**: Running all jobs even when only specific areas of the codebase change.

**Solution**: Detect changed files and conditionally run jobs using outputs.

**Implementation**:

```yaml
jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      should_run_lint: ${{ steps.should_run.outputs.lint }}
      should_run_test: ${{ steps.should_run.outputs.test }}
    steps:
      - run: .github/scripts/detect-changes.sh
      - run: .github/scripts/should-run-job.sh lint changes.json

  lint:
    needs: detect-changes
    if: needs.detect-changes.outputs.should_run_lint == 'true'
    # ... job definition
```

**Scripts**:

- `.github/scripts/detect-changes.sh`: Analyzes changed files
- `.github/scripts/should-run-job.sh`: Determines which jobs to execute

**Impact**: Reduces unnecessary job executions by ~20%

---

### 3. Efficient Caching Strategy

**Problem**: Repeatedly downloading and installing dependencies increases pipeline duration and bandwidth costs.

**Solution**: Multi-level caching with pnpm and composite actions.

**Implementation**:

```yaml
# Composite action with built-in caching
- uses: ./.github/actions/setup
  # Internally uses setup-node with cache: 'pnpm'

# Playwright browser caching
- uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: playwright-${{ runner.os }}-${{ hashFiles('**/pnpm-lock.yaml') }}
```

**Caching Layers**:

1. **pnpm store cache**: Node modules across workflows
2. **Playwright browsers**: Browser binaries for E2E tests
3. **Docker layer cache**: Container images in deploy workflow

**Impact**: 40-60% reduction in dependency installation time

---

### 4. Concurrency Controls

**Problem**: Multiple pipeline runs for rapid commits waste resources on outdated code.

**Solution**: Cancel in-progress runs when new commits arrive.

**Implementation**:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

**Applied To**:

- CI workflow
- Playwright E2E tests
- Deploy workflow

**Impact**: Eliminates duplicate work for rapid-fire commits

---

### 5. Timeout Constraints

**Problem**: Hung jobs can consume runner minutes indefinitely.

**Solution**: Set aggressive timeouts for all jobs.

**Implementation**:

```yaml
jobs:
  test:
    timeout-minutes: 20  # Job-level timeout
    steps:
      - uses: nick-fields/retry@v3
        with:
          timeout_minutes: 10  # Step-level timeout
          max_attempts: 3
```

**Timeout Policy**:

| Job Type | Timeout | Rationale |
|----------|---------|-----------|
| lint | 10 min | Static analysis is fast |
| test | 20 min | Unit tests should complete quickly |
| e2e | 60 min | Browser tests can be slow |
| deploy | 30 min | Deployment should be predictable |

**Impact**: Prevents runaway jobs from consuming excessive minutes

---

### 6. Artifact Cleanup

**Problem**: Stored artifacts consume storage quota and incur costs.

**Solution**: Automated cleanup of old artifacts.

**Implementation**:

See `.github/workflows/cleanup.yml` for automated artifact retention policies.

**Retention Policy**:

- Test reports: 7 days
- Build artifacts: 14 days
- Release artifacts: 90 days

**Impact**: Reduces storage costs by managing artifact lifecycle

---

### 7. Early Termination with Job Dependencies

**Problem**: Running dependent jobs when prerequisites fail wastes resources.

**Solution**: Use `needs` keyword to create job dependencies.

**Implementation**:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    # ... lint job

  test:
    needs: lint  # Only runs if lint succeeds
    runs-on: ubuntu-latest
    # ... test job

  deploy:
    needs: [lint, test]  # Only runs if both succeed
    runs-on: ubuntu-latest
    # ... deploy job
```

**Impact**: Stops pipeline early on failure, saving downstream job minutes

---

## Cost Tracking and Monitoring

### Measuring Success

Track these metrics to validate cost optimizations:

1. **CI Minutes Consumed** (monthly)
   - Target: ≥10% reduction from baseline
   - Monitor in GitHub Actions usage dashboard

2. **Average Workflow Duration**
   - Target: ≥20% reduction
   - Tracked by `collect-metrics.sh`

3. **Job Skip Rate**
   - Percentage of commits that skip full CI
   - Calculated from workflow runs

4. **Cache Hit Rate**
   - Percentage of runs with successful cache hits
   - Monitor via workflow logs

### Cost Estimation

**Before Optimizations**:

- Average commits/month: ~100
- Minutes per full CI run: 15 min
- Minutes per E2E run: 25 min
- **Total**: ~4,000 min/month

**After Optimizations**:

- 30% of commits skip CI (docs changes): -1,200 min
- 20% reduction from dynamic jobs: -600 min
- 40% faster installs from caching: -400 min
- **Total**: ~2,200 min/month

**Savings**: ~1,800 minutes/month (~45% reduction)

---

## Best Practices

### Do's ✅

- **Always set timeouts** at both job and step level
- **Use concurrency groups** for workflows that can be superseded
- **Implement path filters** for workflows that don't need to run on docs changes
- **Cache aggressively** but invalidate appropriately
- **Monitor metrics** to validate optimizations

### Don'ts ❌

- **Don't disable tests** to save time—use smart skipping instead
- **Don't over-optimize** at the cost of developer experience
- **Don't skip security scans** for any production-bound code
- **Don't forget to clean up** old artifacts and caches

---

## Validation

Run these tests to verify cost optimizations:

```bash
# Test job skip logic
./tests/workflows/test_job_skip.sh

# Test resource usage tracking
./tests/workflows/test_resource_usage.sh
```

Both tests should pass with **0 failures**.

---

## Future Improvements

### Potential Optimizations

1. **Self-hosted runners** for predictable workloads
2. **Matrix optimization** to reduce redundant test combinations
3. **Incremental testing** with affected test detection
4. **Parallel job execution** where dependencies allow
5. **Workflow reuse** with reusable workflows for common patterns

### Monitoring and Iteration

- Review GitHub Actions usage monthly
- Adjust timeouts based on actual run durations
- Update path filters as project structure evolves
- Monitor cache hit rates and adjust strategies

---

## Related Documentation

- [CI/CD Pipeline Overview](../getting-started/portfolio-guide.md)
- [Composite Actions Guide](./composite-actions.md)
- [Pipeline Troubleshooting](./pipeline-troubleshooting.md)

---

**Last Updated**: October 16, 2025  
**Owner**: DevOps Team  
**Review Cycle**: Quarterly
