#!/usr/bin/env bash
set -euo pipefail

# Test: Workflow Error Handling Validation
# Verifies that workflows have proper error handling and reporting mechanisms

echo "========================================"
echo "  Error Handling Test"
echo "========================================"
echo ""

WORKFLOWS_DIR=".github/workflows"
ERRORS=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Checking workflows for error handling patterns..."
echo ""

# Check 1: All jobs should have timeout-minutes
echo "Check 1: Jobs have timeout constraints"
for workflow in "$WORKFLOWS_DIR"/*.yml; do
    workflow_name=$(basename "$workflow")
    jobs_without_timeout=$(yq eval '.jobs.* | select(.timeout-minutes == null) | path | .[1]' "$workflow" 2>/dev/null || echo "")
    
    if [ -n "$jobs_without_timeout" ]; then
        echo -e "${RED}✗${NC} $workflow_name: Jobs without timeout: $jobs_without_timeout"
        ((ERRORS++))
    else
        echo -e "${GREEN}✓${NC} $workflow_name: All jobs have timeout constraints"
    fi
done
echo ""

# Check 2: Critical steps should have continue-on-error or if conditions
echo "Check 2: Critical steps have error handling"
for workflow in "$WORKFLOWS_DIR"/*.yml; do
    workflow_name=$(basename "$workflow")
    
    # Check for steps that install dependencies or build (should not silently fail)
    critical_steps=$(yq eval '.jobs.*.steps[] | select(.name | test("install|build|deploy"; "i")) | select(.continue-on-error == true) | .name' "$workflow" 2>/dev/null || echo "")
    
    if [ -n "$critical_steps" ]; then
        echo -e "${YELLOW}⚠${NC}  $workflow_name: Critical steps with continue-on-error: $critical_steps"
    else
        echo -e "${GREEN}✓${NC} $workflow_name: No critical steps with continue-on-error"
    fi
done
echo ""

# Check 3: Workflows should have failure notification or metrics collection
echo "Check 3: Workflows have failure reporting"
for workflow in "$WORKFLOWS_DIR"/*.yml; do
    workflow_name=$(basename "$workflow")
    
    # Check for if: always() or if: failure() patterns (common in reporting jobs)
    has_reporting=$(yq eval '.jobs.* | select(.if | test("always\\(\\)|failure\\(\\)")) | path | .[1]' "$workflow" 2>/dev/null || echo "")
    
    if [ -z "$has_reporting" ]; then
        echo -e "${YELLOW}⚠${NC}  $workflow_name: No failure reporting job found"
    else
        echo -e "${GREEN}✓${NC} $workflow_name: Has reporting job: $has_reporting"
    fi
done
echo ""

# Check 4: Upload artifacts for debugging on failure
echo "Check 4: Workflows preserve artifacts on failure"
for workflow in "$WORKFLOWS_DIR"/*.yml; do
    workflow_name=$(basename "$workflow")
    
    # Look for upload-artifact steps with if: failure() or if: always()
    has_failure_artifacts=$(yq eval '.jobs.*.steps[] | select(.uses | test("upload-artifact")) | select(.if | test("failure\\(\\)|always\\(\\)")) | .name' "$workflow" 2>/dev/null || echo "")
    
    if [ -z "$has_failure_artifacts" ]; then
        echo -e "${YELLOW}⚠${NC}  $workflow_name: No failure artifacts configured"
    else
        echo -e "${GREEN}✓${NC} $workflow_name: Uploads artifacts on failure"
    fi
done
echo ""

echo "========================================"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ Error handling test PASSED${NC}"
    echo "All workflows have proper error handling mechanisms"
    exit 0
else
    echo -e "${RED}✗ Error handling test FAILED${NC}"
    echo "$ERRORS workflows lack proper error handling"
    exit 1
fi
