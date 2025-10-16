#!/usr/bin/env bash
# Test: Verify job skip logic in CI workflows
# Purpose: Ensure smart job skipping works correctly for docs-only changes
# Part of: User Story 3 - Cost-Efficient Pipeline Runs

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

echo "============================================"
echo "Test: Job Skip Logic"
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

# Function to check if workflow has path filters
check_path_filters() {
    local workflow="$1"
    local workflow_file="${PROJECT_ROOT}/.github/workflows/${workflow}"
    
    if [ ! -f "$workflow_file" ]; then
        echo -e "${YELLOW}⚠ WARN${NC}: Workflow file not found: $workflow"
        WARN=$((WARN + 1))
        return 1
    fi
    
    if grep -q "paths-ignore:" "$workflow_file"; then
        return 0
    elif grep -q "paths:" "$workflow_file"; then
        return 0
    else
        return 1
    fi
}

# Function to verify path-ignore patterns
check_docs_ignore_pattern() {
    local workflow="$1"
    local workflow_file="${PROJECT_ROOT}/.github/workflows/${workflow}"
    
    if [ ! -f "$workflow_file" ]; then
        return 1
    fi
    
    # Check for docs/** in paths-ignore (match with or without quotes)
    if grep -A 5 "paths-ignore:" "$workflow_file" | grep -q "docs/"; then
        return 0
    else
        return 1
    fi
}

# Function to check workflow_dispatch trigger
check_manual_trigger() {
    local workflow="$1"
    local workflow_file="${PROJECT_ROOT}/.github/workflows/${workflow}"
    
    if [ ! -f "$workflow_file" ]; then
        return 1
    fi
    
    if grep -q "workflow_dispatch:" "$workflow_file"; then
        return 0
    else
        return 1
    fi
}

echo "Test 1: CI workflow has path filtering"
check_path_filters "ci.yml" && result="true" || result="false"
check_result "CI workflow has path filters" "$result" "true"
echo ""

echo "Test 2: CI workflow ignores docs changes"
check_docs_ignore_pattern "ci.yml" && result="true" || result="false"
check_result "CI workflow ignores docs/**" "$result" "true"
echo ""

echo "Test 3: Playwright workflow has path filtering"
check_path_filters "playwright.yml" && result="true" || result="false"
check_result "Playwright workflow has path filters" "$result" "true"
echo ""

echo "Test 4: Deploy workflow has manual trigger capability"
check_manual_trigger "deploy.yml" && result="true" || result="false"
check_result "Deploy workflow has workflow_dispatch" "$result" "true"
echo ""

echo "Test 5: CI workflow has manual trigger capability"
if check_manual_trigger "ci.yml"; then
    check_result "CI workflow has workflow_dispatch" "true" "true"
else
    # This is optional, so just a warning
    echo -e "${YELLOW}⚠ INFO${NC}: CI workflow doesn't have workflow_dispatch (optional)"
fi
echo ""

echo "Test 6: Verify paths-ignore includes common non-code files"
CI_FILE="${PROJECT_ROOT}/.github/workflows/ci.yml"
if [ -f "$CI_FILE" ]; then
    has_md=false
    has_specs=false
    
    (grep -A 10 "paths-ignore:" "$CI_FILE" | grep -q "\.md") && has_md=true || has_md=false
    (grep -A 10 "paths-ignore:" "$CI_FILE" | grep -q "specs/") && has_specs=true || has_specs=false
    
    if [ "$has_md" = true ] && [ "$has_specs" = true ]; then
        check_result "CI ignores markdown and specs" "true" "true"
    else
        check_result "CI ignores markdown and specs" "false" "true"
        [ "$has_md" = false ] && echo "  Missing: **.md pattern"
        [ "$has_specs" = false ] && echo "  Missing: specs/** pattern"
    fi
else
    echo -e "${RED}✗ FAIL${NC}: CI workflow file not found"
    FAIL=$((FAIL + 1))
fi
echo ""

echo "Test 7: Detect-changes script exists"
DETECT_SCRIPT="${PROJECT_ROOT}/.github/scripts/detect-changes.sh"
if [ -f "$DETECT_SCRIPT" ]; then
    check_result "detect-changes.sh exists" "true" "true"
    
    # Check if it's executable
    if [ -x "$DETECT_SCRIPT" ]; then
        check_result "detect-changes.sh is executable" "true" "true"
    else
        check_result "detect-changes.sh is executable" "false" "true"
    fi
else
    check_result "detect-changes.sh exists" "false" "true"
fi
echo ""

echo "Test 8: Should-run-job script exists"
SHOULD_RUN_SCRIPT="${PROJECT_ROOT}/.github/scripts/should-run-job.sh"
if [ -f "$SHOULD_RUN_SCRIPT" ]; then
    check_result "should-run-job.sh exists" "true" "true"
    
    # Check if it's executable
    if [ -x "$SHOULD_RUN_SCRIPT" ]; then
        check_result "should-run-job.sh is executable" "true" "true"
    else
        check_result "should-run-job.sh is executable" "false" "true"
    fi
else
    check_result "should-run-job.sh exists" "false" "true"
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
    echo -e "${GREEN}All job skip logic tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the failures above.${NC}"
    exit 1
fi
