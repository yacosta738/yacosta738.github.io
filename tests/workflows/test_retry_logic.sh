#!/usr/bin/env bash
set -euo pipefail

# Test: Workflow Retry Logic Validation
# Verifies that flaky operations (network, external APIs) have retry mechanisms

echo "========================================"
echo "  Retry Logic Test"
echo "========================================"
echo ""

WORKFLOWS_DIR=".github/workflows"
WARNINGS=0
PASSES=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "Checking workflows for retry logic on flaky operations..."
echo ""

# Define patterns that indicate flaky operations requiring retries
FLAKY_PATTERNS=(
    "docker.*pull"
    "docker.*push"
    "npm.*install"
    "pnpm.*install"
    "yarn.*install"
    "pip.*install"
    "apt-get"
    "curl"
    "wget"
    "git.*clone"
    "playwright.*install"
)

# Check each workflow
for workflow in "$WORKFLOWS_DIR"/*.yml; do
    workflow_name=$(basename "$workflow")
    echo -e "${BLUE}Analyzing: $workflow_name${NC}"
    
    # Extract all run commands
    run_commands=$(yq eval '.jobs.*.steps[].run' "$workflow" 2>/dev/null | grep -v "^null$" || echo "")
    
    # Check for retry action usage
    has_retry_action=$(yq eval '.jobs.*.steps[] | select(.uses | test("retry")) | .uses' "$workflow" 2>/dev/null || echo "")
    
    if [ -n "$has_retry_action" ]; then
        echo -e "${GREEN}  ✓ Uses retry action: $has_retry_action${NC}"
        ((PASSES++))
    fi
    
    # Check for potentially flaky operations without retries
    for pattern in "${FLAKY_PATTERNS[@]}"; do
        matching_lines=$(echo "$run_commands" | grep -iE "$pattern" || echo "")
        
        if [ -n "$matching_lines" ]; then
            # Check if this step has a retry wrapper
            if [ -z "$has_retry_action" ]; then
                echo -e "${YELLOW}  ⚠  Found flaky operation without retry: $pattern${NC}"
                ((WARNINGS++))
            fi
        fi
    done
    
    # Check for manual retry logic (loops, while statements)
    has_manual_retry=$(echo "$run_commands" | grep -iE "for.*in.*seq|while.*retry|until.*success" || echo "")
    if [ -n "$has_manual_retry" ]; then
        echo -e "${GREEN}  ✓ Has manual retry logic${NC}"
        ((PASSES++))
    fi
    
    echo ""
done

echo "========================================"
echo "Summary:"
echo -e "  ${GREEN}Workflows with retry logic: $PASSES${NC}"
echo -e "  ${YELLOW}Potential flaky operations: $WARNINGS${NC}"
echo ""

if [ $WARNINGS -gt 5 ]; then
    echo -e "${RED}✗ Retry logic test FAILED${NC}"
    echo "Too many flaky operations without retry mechanisms ($WARNINGS found)"
    echo "Consider adding retry logic using nick-fields/retry@v2 action"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠ Retry logic test PASSED with warnings${NC}"
    echo "Found $WARNINGS potentially flaky operations"
    echo "Consider adding retry logic for improved reliability"
    exit 0
else
    echo -e "${GREEN}✓ Retry logic test PASSED${NC}"
    echo "All flaky operations have appropriate retry mechanisms"
    exit 0
fi
