#!/usr/bin/env bash
# Test: Workflow Error Handling
# Validates that workflows have proper error handling and failure reporting

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "  Workflow Error Handling Test"
echo "========================================"
echo ""

FAILED=0
WORKFLOWS_DIR=".github/workflows"

# Check if workflows directory exists
if [ ! -d "$WORKFLOWS_DIR" ]; then
    echo -e "${RED}✗ FAIL: Workflows directory not found${NC}"
    exit 1
fi

echo "Checking error handling in workflows..."
echo ""

# Test 1: Check for timeout constraints
echo "Test 1: Timeout constraints"
WORKFLOWS_WITHOUT_TIMEOUT=0
for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if ! grep -q "timeout-minutes:" "$workflow"; then
        echo -e "${YELLOW}  Warning: $workflow has no timeout-minutes${NC}"
        WORKFLOWS_WITHOUT_TIMEOUT=$((WORKFLOWS_WITHOUT_TIMEOUT + 1))
    fi
done

if [ $WORKFLOWS_WITHOUT_TIMEOUT -eq 0 ]; then
    echo -e "${GREEN}  ✓ All workflows have timeout constraints${NC}"
else
    echo -e "${RED}  ✗ $WORKFLOWS_WITHOUT_TIMEOUT workflow(s) missing timeout-minutes${NC}"
    FAILED=$((FAILED + 1))
fi
echo ""

# Test 2: Check for explicit failure handling
echo "Test 2: Failure handling steps"
HAS_FAILURE_HANDLING=0
for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if grep -q "if:.*failure()" "$workflow" || grep -q "if:.*always()" "$workflow"; then
        HAS_FAILURE_HANDLING=$((HAS_FAILURE_HANDLING + 1))
    fi
done

if [ $HAS_FAILURE_HANDLING -gt 0 ]; then
    echo -e "${GREEN}  ✓ Found failure handling in $HAS_FAILURE_HANDLING workflow(s)${NC}"
else
    echo -e "${YELLOW}  ⚠ No explicit failure handling found (optional but recommended)${NC}"
fi
echo ""

# Test 3: Check for error message scripts
echo "Test 3: Error reporting infrastructure"
if [ -f ".github/scripts/handle-failure.sh" ]; then
    echo -e "${GREEN}  ✓ Error handling script exists${NC}"
    
    # Check if it's executable
    if [ -x ".github/scripts/handle-failure.sh" ]; then
        echo -e "${GREEN}  ✓ Error handling script is executable${NC}"
    else
        echo -e "${RED}  ✗ Error handling script is not executable${NC}"
        FAILED=$((FAILED + 1))
    fi
else
    echo -e "${YELLOW}  ⚠ Error handling script not found (will be created)${NC}"
fi
echo ""

# Test 4: Check for continue-on-error usage
echo "Test 4: Continue-on-error patterns"
CONTINUE_ON_ERROR_COUNT=0
for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    COUNT=$(grep -c "continue-on-error:" "$workflow" || true)
    CONTINUE_ON_ERROR_COUNT=$((CONTINUE_ON_ERROR_COUNT + COUNT))
done

if [ $CONTINUE_ON_ERROR_COUNT -gt 0 ]; then
    echo -e "${GREEN}  ✓ Found $CONTINUE_ON_ERROR_COUNT continue-on-error usage(s)${NC}"
    echo -e "${YELLOW}  ⚠ Verify these are intentional (non-critical steps)${NC}"
else
    echo -e "${GREEN}  ✓ No continue-on-error found (strict failure mode)${NC}"
fi
echo ""

# Test 5: Check for fail-fast in matrix jobs
echo "Test 5: Matrix job fail-fast configuration"
MATRIX_JOBS=0
FAIL_FAST_DISABLED=0
for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if grep -q "matrix:" "$workflow"; then
        MATRIX_JOBS=$((MATRIX_JOBS + 1))
        
        if grep -q "fail-fast: false" "$workflow"; then
            FAIL_FAST_DISABLED=$((FAIL_FAST_DISABLED + 1))
        fi
    fi
done

if [ $MATRIX_JOBS -eq 0 ]; then
    echo -e "${YELLOW}  ⚠ No matrix jobs found${NC}"
elif [ $FAIL_FAST_DISABLED -gt 0 ]; then
    echo -e "${GREEN}  ✓ Matrix jobs have fail-fast: false (runs all configurations)${NC}"
else
    echo -e "${YELLOW}  ⚠ Matrix jobs use default fail-fast: true${NC}"
fi
echo ""

# Summary
echo "========================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ PASS: Error handling validation passed${NC}"
    exit 0
else
    echo -e "${RED}✗ FAIL: $FAILED error handling issue(s) found${NC}"
    exit 1
fi
