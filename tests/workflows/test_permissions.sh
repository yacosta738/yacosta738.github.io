#!/usr/bin/env bash
# Test: Workflow Permissions Validation
# Validates that workflows use explicit least-privilege permissions

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "  Workflow Permissions Test"
echo "========================================"
echo ""

FAILED=0
WORKFLOWS_DIR=".github/workflows"

# Check if workflows directory exists
if [ ! -d "$WORKFLOWS_DIR" ]; then
    echo -e "${RED}✗ FAIL: Workflows directory not found${NC}"
    exit 1
fi

# Require yq for YAML parsing
if ! command -v yq &> /dev/null; then
    echo -e "${YELLOW}⚠ yq not installed, using grep-based validation${NC}"
    USE_YQ=false
else
    USE_YQ=true
fi
echo ""

echo "Checking permissions in workflows..."
echo ""

# Test 1: Check for explicit permissions at workflow level
echo "Test 1: Explicit workflow-level permissions"
WORKFLOWS_WITHOUT_PERMISSIONS=0

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    WORKFLOW_NAME=$(basename "$workflow")
    
    if ! grep -q "^permissions:" "$workflow"; then
        echo -e "${YELLOW}  ⚠ $WORKFLOW_NAME: No workflow-level permissions (using defaults)${NC}"
        WORKFLOWS_WITHOUT_PERMISSIONS=$((WORKFLOWS_WITHOUT_PERMISSIONS + 1))
    else
        echo -e "${GREEN}  ✓ $WORKFLOW_NAME: Has explicit workflow permissions${NC}"
    fi
done

if [ $WORKFLOWS_WITHOUT_PERMISSIONS -gt 0 ]; then
    echo -e "${YELLOW}  ⚠ $WORKFLOWS_WITHOUT_PERMISSIONS workflow(s) without explicit permissions${NC}"
else
    echo -e "${GREEN}  ✓ All workflows have explicit permissions${NC}"
fi
echo ""

# Test 2: Check for job-level permissions
echo "Test 2: Job-level permissions"
JOBS_WITH_PERMISSIONS=0
TOTAL_JOBS=0

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if [ "$USE_YQ" = true ]; then
        JOB_COUNT=$(yq '.jobs | length' "$workflow" 2>/dev/null || echo "0")
        TOTAL_JOBS=$((TOTAL_JOBS + JOB_COUNT))
        
        PERM_COUNT=$(yq '.jobs.*.permissions | select(. != null) | length' "$workflow" 2>/dev/null | wc -l)
        JOBS_WITH_PERMISSIONS=$((JOBS_WITH_PERMISSIONS + PERM_COUNT))
    else
        # Fallback grep-based counting
        JOB_COUNT=$(grep -c "^  [a-zA-Z_-]*:" "$workflow" 2>/dev/null || echo "0")
        TOTAL_JOBS=$((TOTAL_JOBS + JOB_COUNT))
        
        PERM_COUNT=$(grep -c "^    permissions:" "$workflow" 2>/dev/null || echo "0")
        JOBS_WITH_PERMISSIONS=$((JOBS_WITH_PERMISSIONS + PERM_COUNT))
    fi
done

if [ $TOTAL_JOBS -gt 0 ]; then
    PERM_PERCENTAGE=$((JOBS_WITH_PERMISSIONS * 100 / TOTAL_JOBS))
    echo -e "${GREEN}  ✓ $JOBS_WITH_PERMISSIONS/$TOTAL_JOBS jobs ($PERM_PERCENTAGE%) have explicit permissions${NC}"
    
    if [ $PERM_PERCENTAGE -lt 80 ]; then
        echo -e "${YELLOW}  ⚠ Consider adding explicit permissions to more jobs${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠ No jobs found${NC}"
fi
echo ""

# Test 3: Check for overprivileged permissions
echo "Test 3: Overprivileged permissions detection"
OVERPRIVILEGED=0

DANGEROUS_PERMISSIONS=(
    "permissions: write-all"
    "contents: write"
    "packages: write"
    "deployments: write"
    "issues: write"
    "pull-requests: write"
)

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    WORKFLOW_NAME=$(basename "$workflow")
    
    for perm in "${DANGEROUS_PERMISSIONS[@]}"; do
        if grep -q "$perm" "$workflow"; then
            echo -e "${YELLOW}  ⚠ $WORKFLOW_NAME: Found '$perm' (verify necessity)${NC}"
            OVERPRIVILEGED=$((OVERPRIVILEGED + 1))
        fi
    done
done

if [ $OVERPRIVILEGED -eq 0 ]; then
    echo -e "${GREEN}  ✓ No overprivileged permissions detected${NC}"
else
    echo -e "${YELLOW}  ⚠ Found $OVERPRIVILEGED potentially overprivileged permission(s)${NC}"
    echo -e "${YELLOW}    Verify these are necessary for the workflow${NC}"
fi
echo ""

# Test 4: Check for read-only defaults
echo "Test 4: Read-only permissions pattern"
READONLY_WORKFLOWS=0

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if grep -q "contents: read" "$workflow" && ! grep -q "contents: write" "$workflow"; then
        READONLY_WORKFLOWS=$((READONLY_WORKFLOWS + 1))
    fi
done

if [ $READONLY_WORKFLOWS -gt 0 ]; then
    echo -e "${GREEN}  ✓ $READONLY_WORKFLOWS workflow(s) use read-only permissions${NC}"
else
    echo -e "${YELLOW}  ⚠ No read-only patterns found${NC}"
fi
echo ""

# Test 5: Check for GITHUB_TOKEN usage
echo "Test 5: GITHUB_TOKEN usage validation"
TOKEN_USAGE=0

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    WORKFLOW_NAME=$(basename "$workflow")
    
    if grep -q "GITHUB_TOKEN" "$workflow"; then
        TOKEN_USAGE=$((TOKEN_USAGE + 1))
        
        # Check if workflow has explicit permissions when using GITHUB_TOKEN
        if ! grep -q "^permissions:" "$workflow" && ! grep -q "^    permissions:" "$workflow"; then
            echo -e "${RED}  ✗ $WORKFLOW_NAME: Uses GITHUB_TOKEN without explicit permissions${NC}"
            FAILED=$((FAILED + 1))
        else
            echo -e "${GREEN}  ✓ $WORKFLOW_NAME: GITHUB_TOKEN with explicit permissions${NC}"
        fi
    fi
done

if [ $TOKEN_USAGE -eq 0 ]; then
    echo -e "${GREEN}  ✓ No GITHUB_TOKEN usage detected${NC}"
fi
echo ""

# Test 6: Security best practices
echo "Test 6: Security best practices"
SECURITY_ISSUES=0

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    WORKFLOW_NAME=$(basename "$workflow")
    
    # Check for pull_request_target without permissions
    if grep -q "pull_request_target:" "$workflow"; then
        if ! grep -q "^permissions:" "$workflow"; then
            echo -e "${RED}  ✗ $WORKFLOW_NAME: pull_request_target without explicit permissions (SECURITY RISK)${NC}"
            SECURITY_ISSUES=$((SECURITY_ISSUES + 1))
            FAILED=$((FAILED + 1))
        fi
    fi
    
    # Check for workflow_run without permissions
    if grep -q "workflow_run:" "$workflow"; then
        if ! grep -q "^permissions:" "$workflow"; then
            echo -e "${YELLOW}  ⚠ $WORKFLOW_NAME: workflow_run without explicit permissions${NC}"
            SECURITY_ISSUES=$((SECURITY_ISSUES + 1))
        fi
    fi
done

if [ $SECURITY_ISSUES -eq 0 ]; then
    echo -e "${GREEN}  ✓ No security issues detected${NC}"
else
    echo -e "${RED}  ✗ Found $SECURITY_ISSUES security issue(s)${NC}"
fi
echo ""

# Summary
echo "========================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ PASS: Permissions validation passed${NC}"
    echo ""
    echo "Best Practices:"
    echo "  ✓ Use explicit permissions at workflow or job level"
    echo "  ✓ Default to 'contents: read' for read-only operations"
    echo "  ✓ Grant write permissions only when necessary"
    echo "  ✓ Avoid 'permissions: write-all'"
    exit 0
else
    echo -e "${RED}✗ FAIL: $FAILED permission issue(s) found${NC}"
    echo ""
    echo "Required actions:"
    echo "  • Add explicit permissions to workflows using GITHUB_TOKEN"
    echo "  • Add permissions to pull_request_target workflows (security critical)"
    echo "  • Follow least-privilege principle"
    exit 1
fi
