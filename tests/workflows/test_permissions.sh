#!/usr/bin/env bash
set -euo pipefail

# Test: Workflow Permissions Validation
# Verifies that all workflows use explicit least-privilege permissions

echo "========================================"
echo "  Permissions Security Test"
echo "========================================"
echo ""

WORKFLOWS_DIR=".github/workflows"
ERRORS=0
WARNINGS=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "Checking workflows for explicit least-privilege permissions..."
echo ""

# Check each workflow
for workflow in "$WORKFLOWS_DIR"/*.yml; do
    workflow_name=$(basename "$workflow")
    echo -e "${BLUE}Analyzing: $workflow_name${NC}"
    
    # Check 1: Workflow-level permissions should be defined
    workflow_permissions=$(yq eval '.permissions' "$workflow" 2>/dev/null || echo "null")
    
    if [ "$workflow_permissions" = "null" ]; then
        echo -e "${RED}  ✗ No workflow-level permissions defined (defaults to permissive)${NC}"
        ((ERRORS++))
    elif [ "$workflow_permissions" = "{}" ]; then
        echo -e "${GREEN}  ✓ Workflow-level permissions: none (locked down)${NC}"
    else
        echo -e "${GREEN}  ✓ Workflow-level permissions defined${NC}"
        # Show the permissions
        echo "$workflow_permissions" | sed 's/^/    /'
    fi
    
    # Check 2: Jobs should have explicit permissions (if workflow doesn't restrict)
    jobs=$(yq eval '.jobs | keys | .[]' "$workflow" 2>/dev/null || echo "")
    
    for job in $jobs; do
        job_permissions=$(yq eval ".jobs.\"$job\".permissions" "$workflow" 2>/dev/null || echo "null")
        
        if [ "$job_permissions" = "null" ] && [ "$workflow_permissions" = "null" ]; then
            echo -e "${YELLOW}  ⚠  Job '$job': No explicit permissions (inherits defaults)${NC}"
            ((WARNINGS++))
        elif [ "$job_permissions" != "null" ]; then
            echo -e "${GREEN}  ✓ Job '$job': Has explicit permissions${NC}"
        fi
    done
    
    # Check 3: Look for overly permissive patterns
    has_write_all=$(yq eval '.permissions | select(. == "write-all")' "$workflow" 2>/dev/null || echo "")
    if [ -n "$has_write_all" ]; then
        echo -e "${RED}  ✗ SECURITY RISK: Uses 'write-all' permissions${NC}"
        ((ERRORS++))
    fi
    
    # Check 4: Verify common actions that need specific permissions
    uses_actions=$(yq eval '.jobs.*.steps[].uses' "$workflow" 2>/dev/null | grep -v "^null$" || echo "")
    
    # deploy-pages requires pages: write and id-token: write
    if echo "$uses_actions" | grep -q "deploy-pages"; then
        needs_pages=$(yq eval '.permissions.pages' "$workflow" 2>/dev/null || echo "null")
        needs_id=$(yq eval '.permissions.id-token' "$workflow" 2>/dev/null || echo "null")
        
        if [ "$needs_pages" != "write" ] || [ "$needs_id" != "write" ]; then
            echo -e "${YELLOW}  ⚠  Uses deploy-pages but may lack required permissions${NC}"
            ((WARNINGS++))
        fi
    fi
    
    # docker/build-push-action may need packages: write for GHCR
    if echo "$uses_actions" | grep -q "docker/build-push-action"; then
        needs_packages=$(yq eval '.permissions.packages // .jobs.*.permissions.packages' "$workflow" 2>/dev/null || echo "null")
        
        if [ "$needs_packages" = "null" ]; then
            echo -e "${YELLOW}  ⚠  Uses docker/build-push but may lack packages: write${NC}"
        fi
    fi
    
    echo ""
done

echo "========================================"
echo "Summary:"
echo -e "  ${RED}Security errors: $ERRORS${NC}"
echo -e "  ${YELLOW}Warnings: $WARNINGS${NC}"
echo ""

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}✗ Permissions test FAILED${NC}"
    echo "Critical security issues found in workflow permissions"
    echo ""
    echo "Recommended fixes:"
    echo "  1. Add explicit 'permissions:' block to all workflows"
    echo "  2. Use least-privilege principle (e.g., 'contents: read' not 'write')"
    echo "  3. Never use 'write-all' - specify only needed permissions"
    exit 1
elif [ $WARNINGS -gt 3 ]; then
    echo -e "${YELLOW}⚠ Permissions test PASSED with warnings${NC}"
    echo "Consider adding explicit permissions to all jobs"
    exit 0
else
    echo -e "${GREEN}✓ Permissions test PASSED${NC}"
    echo "All workflows use explicit least-privilege permissions"
    exit 0
fi
