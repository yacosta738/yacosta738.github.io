# Pipeline Baseline Metrics

**Date**: 2025-10-16  
**Branch**: 002-pipeline-optimization  
**Purpose**: Establish baseline metrics before optimization to measure improvement

## Current Pipeline Structure

### Workflows Analyzed

1. **ci.yml** - Main CI pipeline
2. **playwright.yml** - E2E testing
3. **deploy.yml** - Deployment workflow
4. **sonarcloud.yml** - Code quality analysis
5. **cleanup.yml** - Artifact cleanup
6. **image-actions.yml** - Image optimization
7. **links.yml** - Link checking
8. **labeler.yml** - Auto-labeling

## Baseline Metrics (Pre-Optimization)

### Duration Metrics

**CI Workflow (ci.yml)**:
- **Jobs**: lint, test, security-audit (run sequentially)
- **Estimated Duration**: ~5-8 minutes per run
  - Lint job: ~2-3 minutes
  - Test job: ~2-3 minutes
  - Security audit: ~1-2 minutes
- **Anti-pattern**: Jobs run sequentially despite no dependencies
- **Bottleneck**: Each job repeats setup (checkout, pnpm install)

**Playwright Workflow (playwright.yml)**:
- **Jobs**: Runs tests sequentially
- **Estimated Duration**: ~10-15 minutes per run
- **Anti-pattern**: No browser caching, no parallel execution
- **Bottleneck**: Browser installation and sequential test execution

**Deploy Workflow (deploy.yml)**:
- **Jobs**: Build and deploy
- **Estimated Duration**: ~8-12 minutes per run
- **Anti-pattern**: No Docker layer caching
- **Bottleneck**: Full Docker build on every run

### Reliability Metrics

**Current State**:
- **Permission Model**: Default GITHUB_TOKEN permissions (overprivileged)
- **Error Handling**: No retry logic for network operations
- **Job Dependencies**: Implicit dependencies not documented
- **Timeout Controls**: No explicit timeouts set

**Known Issues**:
- Occasional failures due to npm registry timeouts
- No automatic retry for flaky network operations
- Workflow logs don't clearly indicate failure reasons

### Resource Usage Metrics

**CI Minutes Consumption**:
- **Estimated**: ~25-35 minutes per PR (all workflows combined)
- **Redundant Runs**: No path filtering - all jobs run for any change
- **Cache Usage**: Limited caching (only Node.js modules via setup action)

**Optimization Opportunities Identified**:
1. **Parallelization**: CI jobs can run in parallel (save ~4-6 minutes)
2. **Path Filtering**: Skip jobs for docs-only changes (save ~25-35 minutes on docs PRs)
3. **Enhanced Caching**: Add pnpm store, Playwright browsers, Docker layers
4. **Concurrency Controls**: Cancel outdated runs (save minutes on rapid pushes)
5. **Conditional Execution**: Smart job skipping based on changed files

## Target Metrics (Post-Optimization)

### Duration Targets

- **CI Workflow**: Reduce from ~5-8 min to ~3-5 min (≥25% improvement)
- **Playwright Workflow**: Reduce from ~10-15 min to ~6-10 min (≥33% improvement)
- **Deploy Workflow**: Reduce from ~8-12 min to ~5-8 min (≥37% improvement)
- **Overall**: Achieve ≥20% reduction in average pipeline duration

### Reliability Targets

- **Zero Non-Code Failures**: Implement retry logic and proper error handling
- **Explicit Permissions**: Least-privilege model for all jobs
- **Clear Failure Messages**: Improved logging and error reporting
- **Documented Dependencies**: All job dependencies explicitly declared

### Resource Usage Targets

- **CI Minutes**: Reduce by ≥10% through smart skipping and caching
- **Cache Hit Rate**: Achieve ≥80% cache hit rate for dependencies
- **Redundant Runs**: Eliminate 100% of unnecessary job executions

## Anti-Patterns Documented

### 1. Sequential Jobs Without Dependencies

**Location**: `.github/workflows/ci.yml`
**Issue**: lint, test, and security-audit run sequentially despite being independent
**Impact**: Wastes ~4-6 minutes per run
**Fix**: Add parallel execution

### 2. No Path Filtering

**Location**: All workflows
**Issue**: All jobs run for any change, even docs-only
**Impact**: Wastes ~25-35 CI minutes on irrelevant changes
**Fix**: Add path filters and conditional execution

### 3. Overprivileged Workflows

**Location**: All workflows
**Issue**: Default GITHUB_TOKEN permissions grant write access unnecessarily
**Impact**: Security risk
**Fix**: Implement least-privilege permissions

### 4. Insufficient Caching

**Location**: All workflows
**Issue**: Only basic Node.js caching, missing pnpm store, browsers, Docker layers
**Impact**: Slower builds, higher costs
**Fix**: Implement comprehensive caching strategy

### 5. No Concurrency Controls

**Location**: All workflows
**Issue**: Outdated runs continue even when new commits pushed
**Impact**: Wasted CI minutes
**Fix**: Add concurrency groups with cancel-in-progress

## Measurement Plan

### Pre-Optimization Baseline Collection

1. Collect 10 sample PR runs across different change types
2. Measure average duration per workflow
3. Track failure rates and causes
4. Document CI minutes consumed

### Post-Optimization Validation

1. Collect 10 sample PR runs with optimizations
2. Compare against baseline metrics
3. Verify ≥20% duration reduction
4. Confirm no regression in reliability or coverage
5. Measure resource usage reduction

## Success Criteria Tracking

- [ ] **SC-001**: Average CI/CD pipeline duration reduced by ≥20%
- [ ] **SC-002**: Pipeline reliability maintained or improved
- [ ] **SC-003**: Test coverage maintained (no decrease)
- [ ] **SC-004**: Resource usage reduced by ≥10%
- [ ] **SC-005**: All automated tests pass (no new flakiness)
- [ ] **SC-006**: Developer satisfaction improved

---

**Next Steps**: Proceed with Phase 1 implementation (audit, scripts, testing framework)
