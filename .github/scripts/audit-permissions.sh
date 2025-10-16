#!/usr/bin/env bash
#
# Workflow Permission Analyzer
# Audits GitHub Actions workflows for security best practices
#
# Usage:
#   ./audit-permissions.sh [workflow_file]
#   ./audit-permissions.sh                    # Audit all workflows
#   ./audit-permissions.sh ci.yml             # Audit specific workflow
#

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
TOTAL_WORKFLOWS=0
ISSUES_FOUND=0

print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  GitHub Actions Workflow Permission Audit${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_pass() {
    echo -e "${GREEN}✓${NC} $1"
}

print_fail() {
    echo -e "${RED}✗${NC} $1"
    ((ISSUES_FOUND++))
}

print_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if yq is installed (for YAML parsing)
check_dependencies() {
    if ! command -v yq &> /dev/null; then
        print_fail "yq is not installed. Install it to parse YAML files."
        print_info "macOS: brew install yq"
        print_info "Linux: sudo snap install yq"
        exit 1
    fi
}

# Check workflow for security issues
audit_workflow() {
    local workflow_file="$1"
    local workflow_name=$(basename "$workflow_file")
    
    echo ""
    echo -e "${BLUE}═══ Auditing: $workflow_name ═══${NC}"
    echo ""
    
    ((TOTAL_WORKFLOWS++))
    
    # Check 1: Explicit permissions defined
    if yq eval '.permissions' "$workflow_file" | grep -q "null"; then
        print_fail "No explicit permissions defined (using defaults)"
        print_info "  Add 'permissions:' block to restrict access"
    else
        print_pass "Explicit permissions defined"
    fi
    
    # Check 2: Check for write-all permissions
    if yq eval '.permissions' "$workflow_file" | grep -q "write-all"; then
        print_fail "Using 'write-all' permissions (overprivileged)"
        print_info "  Use specific permissions instead"
    fi
    
    # Check 3: Check for timeout
    local has_timeout=false
    for job in $(yq eval '.jobs | keys | .[]' "$workflow_file"); do
        if yq eval ".jobs.$job.timeout-minutes" "$workflow_file" | grep -qv "null"; then
            has_timeout=true
            break
        fi
    done
    
    if [ "$has_timeout" = false ]; then
        print_warn "No timeout-minutes set for jobs"
        print_info "  Add 'timeout-minutes: N' to prevent hanging builds"
    else
        print_pass "Timeout configured for jobs"
    fi
    
    # Check 4: Check for concurrency controls
    if yq eval '.concurrency' "$workflow_file" | grep -q "null"; then
        print_warn "No concurrency controls defined"
        print_info "  Add 'concurrency:' to cancel outdated runs"
    else
        print_pass "Concurrency controls configured"
    fi
    
    # Check 5: Check for pinned actions (not using @v1 tags)
    local unpinned_actions=$(yq eval '.. | select(has("uses")) | .uses' "$workflow_file" 2>/dev/null | grep -v "^\./" | grep "@" || echo "")
    
    if [ -n "$unpinned_actions" ]; then
        local has_unpinned=false
        while IFS= read -r action; do
            if [[ "$action" =~ @v[0-9]+ ]]; then
                has_unpinned=true
                print_warn "Action not pinned to SHA: $action"
            fi
        done <<< "$unpinned_actions"
        
        if [ "$has_unpinned" = true ]; then
            print_info "  Consider pinning to commit SHA for security"
        fi
    fi
    
    # Check 6: Check for dangerous patterns
    if grep -q '\${{.*github\.event\.issue\.title.*}}' "$workflow_file" 2>/dev/null; then
        print_fail "Dangerous: Using untrusted input in workflow"
        print_info "  github.event.issue.title and similar can be exploited"
    fi
    
    if grep -q '\${{.*github\.event\.comment\.body.*}}' "$workflow_file" 2>/dev/null; then
        print_fail "Dangerous: Using untrusted input in workflow"
        print_info "  github.event.comment.body can be exploited"
    fi
    
    # Check 7: Check for path filters (optional but recommended)
    if yq eval '.on' "$workflow_file" | grep -q "paths"; then
        print_pass "Path filtering configured"
    else
        print_info "No path filtering (optional optimization)"
    fi
    
    # Check 8: Check for explicit job dependencies
    local has_needs=false
    for job in $(yq eval '.jobs | keys | .[]' "$workflow_file"); do
        if yq eval ".jobs.$job.needs" "$workflow_file" | grep -qv "null"; then
            has_needs=true
            break
        fi
    done
    
    if [ "$has_needs" = true ]; then
        print_pass "Job dependencies explicitly declared"
    else
        print_info "No explicit job dependencies (may be intentional for parallel jobs)"
    fi
}

# Main execution
main() {
    print_header
    check_dependencies
    
    local workflow_pattern="${1:-.github/workflows/*.yml}"
    
    if [ -f "$workflow_pattern" ]; then
        # Single file
        audit_workflow "$workflow_pattern"
    else
        # Multiple files
        for workflow in .github/workflows/*.yml .github/workflows/*.yaml; do
            if [ -f "$workflow" ]; then
                audit_workflow "$workflow"
            fi
        done
    fi
    
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "  Audited $TOTAL_WORKFLOWS workflow(s)"
    
    if [ $ISSUES_FOUND -eq 0 ]; then
        echo -e "${GREEN}  No critical issues found!${NC}"
    else
        echo -e "${RED}  Found $ISSUES_FOUND issue(s) that should be addressed${NC}"
    fi
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # Exit with error code if issues found
    [ $ISSUES_FOUND -eq 0 ]
}

# Run main
main "$@"
