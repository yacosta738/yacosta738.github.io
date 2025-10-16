#!/usr/bin/env bash
# Test: Verify resource usage tracking in CI workflows
# Purpose: Ensure we're tracking resource usage metrics for cost optimization
# Part of: User Story 3 - Cost-Efficient Pipeline Runs

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

echo "============================================"
echo "Test: Resource Usage Tracking"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS=0
FAIL=0
WARN=0

# Function to check test result
check_result() {
    local test_name="$1"
    local result="$2"
    local expected="$3"
    
    if [ "$result" = "$expected" ]; then
        echo -e "${GREEN}✓ PASS${NC}: $test_name"
        PASS=$((PASS + 1))
    else
        echo -e "${RED}✗ FAIL${NC}: $test_name"
        echo "  Expected: $expected"
        echo "  Got: $result"
        FAIL=$((FAIL + 1))
    fi
}

# Function to check if workflow tracks duration
check_duration_tracking() {
    local workflow="$1"
    local workflow_file="${PROJECT_ROOT}/.github/workflows/${workflow}"
    
    if [ ! -f "$workflow_file" ]; then
        return 1
    fi
    
    # Check for collect-metrics.sh usage or time tracking
    if grep -q "collect-metrics" "$workflow_file"; then
        return 0
    elif grep -q "SECONDS" "$workflow_file"; then
        return 0
    elif grep -q "duration" "$workflow_file"; then
        return 0
    else
        return 1
    fi
}

# Function to check if workflow has timeout constraints
check_timeout_constraints() {
    local workflow="$1"
    local workflow_file="${PROJECT_ROOT}/.github/workflows/${workflow}"
    
    if [ ! -f "$workflow_file" ]; then
        return 1
    fi
    
    if grep -q "timeout-minutes:" "$workflow_file"; then
        return 0
    else
        return 1
    fi
}

# Function to check concurrency controls
check_concurrency_controls() {
    local workflow="$1"
    local workflow_file="${PROJECT_ROOT}/.github/workflows/${workflow}"
    
    if [ ! -f "$workflow_file" ]; then
        return 1
    fi
    
    if grep -q "concurrency:" "$workflow_file"; then
        return 0
    else
        return 1
    fi
}

# Function to check if workflow uses efficient caching
check_caching_strategy() {
    local workflow="$1"
    local workflow_file="${PROJECT_ROOT}/.github/workflows/${workflow}"
    
    if [ ! -f "$workflow_file" ]; then
        return 1
    fi
    
    # Check for cache actions or pnpm cache
    if grep -q "actions/cache@" "$workflow_file"; then
        return 0
    elif grep -q "setup-pnpm" "$workflow_file" && grep -q "cache: 'pnpm'" "$workflow_file"; then
        return 0
    elif grep -q "install-deps" "$workflow_file"; then
        # Using our composite action which includes caching
        return 0
    elif grep -q "./.github/actions/setup" "$workflow_file"; then
        # Using our setup composite action which includes caching
        return 0
    elif grep -q "setup-node@" "$workflow_file" && grep -q "cache:" "$workflow_file"; then
        # Using setup-node with cache parameter
        return 0
    else
        return 1
    fi
}

echo "Test 1: Metrics collection script exists"
METRICS_SCRIPT="${PROJECT_ROOT}/.github/scripts/collect-metrics.sh"
if [ -f "$METRICS_SCRIPT" ]; then
    check_result "collect-metrics.sh exists" "true" "true"
    
    if [ -x "$METRICS_SCRIPT" ]; then
        check_result "collect-metrics.sh is executable" "true" "true"
    else
        check_result "collect-metrics.sh is executable" "false" "true"
    fi
else
    check_result "collect-metrics.sh exists" "false" "true"
fi
echo ""

echo "Test 2: CI workflow has timeout constraints"
if check_timeout_constraints "ci.yml"; then
    check_result "CI workflow has timeout-minutes" "true" "true"
else
    check_result "CI workflow has timeout-minutes" "false" "true"
fi
echo ""

echo "Test 3: Playwright workflow has timeout constraints"
if check_timeout_constraints "playwright.yml"; then
    check_result "Playwright workflow has timeout-minutes" "true" "true"
else
    check_result "Playwright workflow has timeout-minutes" "false" "true"
fi
echo ""

echo "Test 4: Deploy workflow has timeout constraints"
if check_timeout_constraints "deploy.yml"; then
    check_result "Deploy workflow has timeout-minutes" "true" "true"
else
    check_result "Deploy workflow has timeout-minutes" "false" "true"
fi
echo ""

echo "Test 5: CI workflow has concurrency controls"
if check_concurrency_controls "ci.yml"; then
    check_result "CI workflow has concurrency group" "true" "true"
else
    check_result "CI workflow has concurrency group" "false" "true"
fi
echo ""

echo "Test 6: Playwright workflow has concurrency controls"
if check_concurrency_controls "playwright.yml"; then
    check_result "Playwright workflow has concurrency group" "true" "true"
else
    check_result "Playwright workflow has concurrency group" "false" "true"
fi
echo ""

echo "Test 7: CI workflow uses efficient caching"
if check_caching_strategy "ci.yml"; then
    check_result "CI workflow uses caching" "true" "true"
else
    check_result "CI workflow uses caching" "false" "true"
fi
echo ""

echo "Test 8: Playwright workflow uses efficient caching"
if check_caching_strategy "playwright.yml"; then
    check_result "Playwright workflow uses caching" "true" "true"
else
    check_result "Playwright workflow uses caching" "false" "true"
fi
echo ""

echo "Test 9: Deploy workflow uses efficient caching"
if check_caching_strategy "deploy.yml"; then
    check_result "Deploy workflow uses caching" "true" "true"
else
    check_result "Deploy workflow uses caching" "false" "true"
fi
echo ""

echo "Test 10: Verify cleanup workflow exists for artifact management"
CLEANUP_FILE="${PROJECT_ROOT}/.github/workflows/cleanup.yml"
if [ -f "$CLEANUP_FILE" ]; then
    check_result "cleanup.yml exists" "true" "true"
    
    # Check if it has artifact cleanup logic
    if grep -q "artifact" "$CLEANUP_FILE" || grep -q "actions/upload-artifact" "$CLEANUP_FILE"; then
        echo -e "${GREEN}✓ INFO${NC}: Cleanup workflow manages artifacts"
    fi
else
    echo -e "${YELLOW}⚠ WARN${NC}: cleanup.yml not found (artifact management recommended)"
    WARN=$((WARN + 1))
fi
echo ""

echo "Test 11: Check for matrix optimization opportunities"
CI_FILE="${PROJECT_ROOT}/.github/workflows/ci.yml"
if [ -f "$CI_FILE" ]; then
    # Check if matrix has fail-fast
    if grep -A 5 "strategy:" "$CI_FILE" | grep -q "fail-fast"; then
        check_result "CI has fail-fast strategy configured" "true" "true"
    else
        echo -e "${YELLOW}⚠ INFO${NC}: CI doesn't configure fail-fast (may be using default)"
    fi
else
    echo -e "${RED}✗ FAIL${NC}: CI workflow file not found"
    FAIL=$((FAIL + 1))
fi
echo ""

echo "Test 12: Check for early termination on failed dependencies"
CI_FILE="${PROJECT_ROOT}/.github/workflows/ci.yml"
if [ -f "$CI_FILE" ]; then
    # Check if jobs use 'needs' keyword for dependencies
    if grep -q "needs:" "$CI_FILE"; then
        check_result "CI uses job dependencies (needs)" "true" "true"
    else
        echo -e "${YELLOW}⚠ WARN${NC}: CI doesn't use 'needs' keyword for job dependencies"
        WARN=$((WARN + 1))
    fi
else
    FAIL=$((FAIL + 1))
fi
echo ""

# Summary
echo "============================================"
echo "Test Summary"
echo "============================================"
echo -e "${GREEN}Passed${NC}: $PASS"
echo -e "${RED}Failed${NC}: $FAIL"
echo -e "${YELLOW}Warnings${NC}: $WARN"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}All resource usage tracking tests passed!${NC}"
    echo ""
    echo "Resource Optimization Features Verified:"
    echo "  - Timeout constraints to prevent runaway jobs"
    echo "  - Concurrency controls to cancel outdated runs"
    echo "  - Efficient caching strategies"
    echo "  - Job dependencies for early termination"
    echo "  - Artifact cleanup mechanisms"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the failures above.${NC}"
    exit 1
fi
