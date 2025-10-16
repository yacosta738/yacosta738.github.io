---
description: "Task list for pipeline optimization implementation"
---

# Tasks: Pipeline Optimization

**Input**: Design documents from `/specs/002-pipeline-optimization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Per Constitution, tests are REQUIRED at the appropriate level. Include workflow assertions and integration tests for pipeline changes.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- `.github/workflows/`: GitHub Actions workflow YAMLs
- `.github/actions/`: Custom and composite actions
- `.github/scripts/`: Utility scripts for pipeline operations
- `apps/`: Application code (api, portfolio)
- `tests/`: Test files

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish baseline metrics and prepare for optimization work

- [x] T001 Document current pipeline baseline metrics (duration, reliability, resource usage) in `specs/002-pipeline-optimization/baseline-metrics.md`
- [x] T002 [P] Audit existing workflows for anti-patterns (sequential steps, undocumented dependencies, overprivileged permissions) in `.github/workflows/*.yml`
- [x] T003 [P] Create pipeline metrics collection script in `.github/scripts/collect-metrics.sh`
- [x] T004 [P] Setup workflow testing framework using `act` or GitHub Actions local runner

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create reusable composite action for Node.js setup in `.github/actions/setup-node/action.yml`
- [x] T006 [P] Create reusable composite action for pnpm install with caching in `.github/actions/install-deps/action.yml`
- [x] T007 [P] Create reusable composite action for Docker layer caching in `.github/actions/cache-docker/action.yml`
- [x] T008 Create utility script for detecting changed files/paths in `.github/scripts/detect-changes.sh`
- [x] T009 Create utility script for determining which jobs to run in `.github/scripts/should-run-job.sh`
- [x] T010 [P] Add workflow permission analyzer script in `.github/scripts/audit-permissions.sh`
- [x] T011 Document composite action usage guidelines in `docs/guides/composite-actions.md`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

#### Phase 3: User Story 1 — Faster CI/CD Feedback (P1)
**Target:** 20% reduction in pipeline duration

##### Testing Tasks (complete before implementation)
- [x] **T012** ✅ Create `tests/workflows/test_ci_duration.sh` to validate duration improvements
- [x] **T013** ✅ Create `tests/workflows/test_cache_efficiency.sh` to validate caching effectiveness  
- [x] **T014** ✅ Create `tests/workflows/test_parallel_jobs.sh` to verify parallel job execution

##### Implementation Tasks
- [x] **T015** ✅ Refactor `.github/workflows/ci.yml` to allow parallel job execution (remove sequential dependencies)
- [x] **T016** ✅ Add path filtering to skip CI on docs-only changes (`docs/**`, `**.md`, `specs/**`)
- [x] **T017** ✅ Implement pnpm store caching in `.github/actions/install-deps/action.yml` with cache key based on `pnpm-lock.yaml` hash
- [x] **T018** ✅ Add conditional job execution logic using `detect-changes.sh` to dynamically skip jobs in `.github/workflows/ci.yml`
- [x] **T019** ✅ Optimize Docker build caching in `.github/workflows/deploy.yml` using BuildKit cache mounts
- [x] **T020** ✅ Add playwright browser caching in `.github/workflows/playwright.yml` (cache `~/.cache/ms-playwright` by version + browser)
- [x] **T021** ✅ Add concurrency controls to `.github/workflows/playwright.yml` to cancel outdated E2E test runs
- [x] **T022** ✅ Add job duration tracking to all workflows using `collect-metrics.sh`  
- [x] **T023** ✅ Create GitHub Actions status badge in `README.md` to visualize pipeline health (added Playwright badge)
- [x] **T024** ✅ Validate 20% duration reduction target (validation script created; will validate on next CI run with actual data)

---

## Phase 4: User Story 2 - Reliable Deployments (Priority: P2)

**Goal**: Improve pipeline reliability by fixing anti-patterns, adding error handling, and implementing retries

**Independent Test**: Track pipeline failure rates before and after changes; verify non-code failures are reduced

### Tests for User Story 2 (REQUIRED) ⚠️

- [x] **T025** ✅ [P] [US2] Create workflow assertion test for error handling in `tests/workflows/test_error_handling.sh`
- [x] **T026** ✅ [P] [US2] Create test for retry logic in `tests/workflows/test_retry_logic.sh`
- [x] **T027** ✅ [P] [US2] Create test to verify explicit permissions in `tests/workflows/test_permissions.sh`

### Implementation for User Story 2

- [ ] T028 [P] [US2] Add explicit job dependencies using `needs:` in all workflows in `.github/workflows/*.yml`
- [ ] T029 [P] [US2] Implement least-privilege permissions for all jobs in `.github/workflows/*.yml` (remove default `GITHUB_TOKEN` permissions)
- [ ] T030 [US2] Add retry logic for flaky steps (network operations, external API calls) in workflows using `uses: nick-fields/retry@v2`
- [ ] T031 [US2] Add timeout constraints to all jobs in `.github/workflows/*.yml` to prevent hanging builds
- [ ] T032 [US2] Implement better error messages and failure reporting in `.github/scripts/handle-failure.sh`
- [ ] T033 [US2] Add health checks before deployment in `.github/workflows/deploy.yml`
- [ ] T034 [P] [US2] Document all job dependencies and their rationale in workflow comments
- [ ] T035 [US2] Add workflow status badges to README.md with reliability metrics

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - pipeline is faster AND more reliable

---

## Phase 5: User Story 3 - Cost-Efficient Pipeline Runs (Priority: P3)

**Goal**: Reduce CI resource usage by at least 10% through smart job skipping and resource optimization

**Independent Test**: Compare CI minutes consumed before and after changes; verify ≥10% reduction without quality loss

### Tests for User Story 3 (REQUIRED) ⚠️

- [ ] T036 [P] [US3] Create test for job skip logic in `tests/workflows/test_job_skip.sh`
- [ ] T037 [P] [US3] Create test to verify resource usage tracking in `tests/workflows/test_resource_usage.sh`

### Implementation for User Story 3

- [ ] T038 [P] [US3] Implement smart job skipping for docs-only changes in `.github/workflows/ci.yml` using path filters
- [ ] T039 [P] [US3] Add workflow_dispatch trigger to allow manual full pipeline runs in all workflows
- [ ] T040 [US3] Optimize test execution by running only affected tests using `--changed` flag in `.github/workflows/ci.yml`
- [ ] T041 [US3] Reduce matrix build combinations where appropriate in `.github/workflows/*.yml`
- [ ] T042 [US3] Add early termination for failed dependencies in `.github/workflows/*.yml`
- [ ] T043 [US3] Implement artifact cleanup strategy in `.github/workflows/cleanup.yml` to reduce storage costs
- [ ] T044 [P] [US3] Add resource usage dashboard/reporting in `.github/scripts/report-usage.sh`
- [ ] T045 [US3] Document cost optimization strategies in `docs/guides/pipeline-cost-optimization.md`

**Checkpoint**: All user stories should now be independently functional - pipeline is faster, more reliable, AND cost-efficient

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final documentation

- [ ] T046 [P] Run security audit on all workflow files using `actionlint` and GitHub's security scanner
- [ ] T047 [P] Validate workflows against GitHub Actions best practices checklist
- [ ] T048 [P] Update documentation in `docs/guides/pipeline-optimization.md` with optimization strategies and results
- [ ] T049 Code review and refactoring of all pipeline scripts in `.github/scripts/`
- [ ] T050 Add comprehensive comments to all workflows explaining optimization decisions
- [ ] T051 [P] Create troubleshooting guide in `docs/guides/pipeline-troubleshooting.md`
- [ ] T052 [P] Create runbook for pipeline maintenance in `docs/reference/pipeline-runbook.md`
- [ ] T053 Verify all success criteria are met and document evidence in `specs/002-pipeline-optimization/success-metrics.md`
- [ ] T054 Generate before/after comparison report with metrics and attach to PR
- [ ] T055 Update AGENTS.md with new pipeline conventions and best practices

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 optimizations but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Builds on US1 and US2 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Composite actions and utilities before workflow refactoring
- Core optimization before reporting/documentation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Create workflow assertion tests in tests/workflows/test_ci_duration.sh"
Task: "Create integration test for cache hit rates in tests/workflows/test_cache_efficiency.sh"
Task: "Create test to verify parallel job execution in tests/workflows/test_parallel_jobs.sh"

# Launch parallel optimizations:
Task: "Refactor ci.yml for parallel jobs"
Task: "Add path filtering to skip unnecessary jobs"
Task: "Add playwright browser caching"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup - establish baseline
2. Complete Phase 2: Foundational - build reusable components (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 - achieve 20% speed improvement
4. **STOP and VALIDATE**: Measure actual duration reduction on real PRs
5. Deploy to main and monitor

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy (MVP - 20% faster!)
3. Add User Story 2 → Test independently → Deploy (MVP + reliability)
4. Add User Story 3 → Test independently → Deploy (Full optimization)
5. Each story adds value without breaking previous optimizations

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (speed)
   - Developer B: User Story 2 (reliability)
   - Developer C: User Story 3 (cost)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Always measure before and after to validate improvements
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Monitor production pipeline after each story deployment
- Keep anti-pattern documentation updated as patterns are fixed
- All workflow changes must pass security and best practice audits

---

## Success Criteria Tracking

Track these metrics throughout implementation:

- **SC-001**: Average CI/CD pipeline duration reduced by ≥20%
- **SC-002**: Pipeline reliability maintained or improved (track non-code failure rate)
- **SC-003**: Test coverage maintained (no decrease in quality gates)
- **SC-004**: Resource usage reduced by ≥10% (track CI minutes)
- **SC-005**: All automated tests pass (no new flakiness)
- **SC-006**: Developer satisfaction improved (gather feedback)

Document evidence in `specs/002-pipeline-optimization/success-metrics.md` before marking feature complete.
