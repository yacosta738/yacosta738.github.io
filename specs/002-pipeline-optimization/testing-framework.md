# Workflow Testing Framework Setup

**Date**: 2025-10-16  
**Purpose**: Document workflow testing strategy and setup for validating GitHub Actions

## Testing Approach

For GitHub Actions workflows, we use a multi-layered testing strategy:

### 1. Local Testing with `act`

**Tool**: [nektos/act](https://github.com/nektos/act)  
**Purpose**: Run GitHub Actions locally for rapid iteration

**Installation**:
```bash
# macOS
brew install act

# Or using Docker
docker pull nektos/act
```

**Usage**:
```bash
# Test a specific workflow
act -W .github/workflows/ci.yml

# Test a specific job
act -W .github/workflows/ci.yml -j lint

# List all workflows
act -l

# Dry run (show what would run)
act -n
```

### 2. Workflow Assertion Tests

**Location**: `tests/workflows/`  
**Purpose**: Validate workflow behavior and outcomes

These are bash scripts that:
- Parse workflow YAML files
- Validate structure and configuration
- Check for required fields and anti-patterns
- Verify security settings

### 3. Integration Tests

**Purpose**: Test actual workflow execution in CI environment  
**Approach**: Use workflow_dispatch triggers for manual testing

## Test Scripts

### test_ci_duration.sh

Validates that CI duration improvements meet targets:
- Measures time from start to completion
- Compares against baseline
- Fails if duration exceeds threshold

### test_cache_efficiency.sh

Validates caching is working correctly:
- Checks cache hit rates
- Verifies cache keys are properly set
- Ensures cache invalidation works

### test_parallel_jobs.sh

Validates jobs run in parallel:
- Parses workflow run logs
- Checks job start times
- Ensures no unnecessary serialization

## Workflow Validation Checklist

Before committing workflow changes:

- [ ] Workflow passes `actionlint` validation
- [ ] Workflow has explicit permissions defined
- [ ] Workflow has timeout-minutes set
- [ ] Workflow has concurrency controls (if applicable)
- [ ] Jobs have proper dependencies declared
- [ ] Caching keys are appropriate
- [ ] Path filters are correct
- [ ] Workflow tested locally with `act` (when possible)

## Continuous Validation

All workflow files should be validated in CI:

```yaml
name: Validate Workflows

on:
  pull_request:
    paths:
      - '.github/workflows/**'
      - '.github/actions/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run actionlint
        uses: raven-actions/actionlint@v1
      - name: Run custom validation
        run: |
          bash tests/workflows/validate-all.sh
```

## Local Development Workflow

1. **Make workflow changes**
2. **Validate syntax**: `actionlint .github/workflows/ci.yml`
3. **Test locally** (if possible): `act -W .github/workflows/ci.yml -j lint`
4. **Run validation scripts**: `bash tests/workflows/validate-all.sh`
5. **Commit and push**
6. **Monitor actual workflow run**
7. **Collect metrics**: `bash .github/scripts/collect-metrics.sh ci.yml`

## Known Limitations

### `act` Limitations

- Some GitHub Actions features not fully supported
- Secrets handling differs from real GitHub
- Caching behavior may differ
- Some actions require specific runners (e.g., macOS)

**Workaround**: Use `act` for quick syntax validation, rely on actual CI runs for full testing

### Workflow Testing Best Practices

1. **Keep workflows simple**: Complex logic belongs in scripts
2. **Use reusable actions**: Easier to test composite actions independently
3. **Validate inputs**: Check all conditional logic
4. **Test failure paths**: Ensure errors are handled gracefully
5. **Monitor metrics**: Track duration, cache hit rate, failure rate

## References

- [nektos/act](https://github.com/nektos/act) - Run GitHub Actions locally
- [actionlint](https://github.com/rhysd/actionlint) - Linter for GitHub Actions
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration)
