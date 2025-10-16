#!/usr/bin/env bash
#
# Pipeline Metrics Collection Script
# Collects and reports CI/CD pipeline performance metrics
#
# Usage:
#   ./collect-metrics.sh [--workflow=WORKFLOW_NAME] [--days=N] [--format=json|table]
#

set -euo pipefail

# Default values
WORKFLOW_NAME="${1:-}"
DAYS="${2:-7}"
FORMAT="${3:-table}"
REPO_OWNER="yacosta738"
REPO_NAME="yacosta738.github.io"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

print_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

# Function to check if gh CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        print_error "GitHub CLI (gh) is not installed"
        print_info "Install it from: https://cli.github.com/"
        exit 1
    fi
    
    # Check if authenticated
    if ! gh auth status &> /dev/null; then
        print_error "Not authenticated with GitHub CLI"
        print_info "Run: gh auth login"
        exit 1
    fi
}

# Function to get workflow runs
get_workflow_runs() {
    local workflow="$1"
    local limit="${2:-30}"
    
    print_info "Fetching workflow runs for: ${workflow}"
    
    gh api \
        -H "Accept: application/vnd.github+json" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        "/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${workflow}/runs" \
        --jq ".workflow_runs[0:${limit}] | .[] | {
            id: .id,
            name: .name,
            status: .status,
            conclusion: .conclusion,
            created_at: .created_at,
            updated_at: .updated_at,
            run_started_at: .run_started_at
        }"
}

# Function to calculate duration in minutes
calculate_duration() {
    local start="$1"
    local end="$2"
    
    if [[ -z "$start" || -z "$end" ]]; then
        echo "0"
        return
    fi
    
    local start_epoch=$(date -j -f "%Y-%m-%dT%H:%M:%SZ" "$start" "+%s" 2>/dev/null || echo "0")
    local end_epoch=$(date -j -f "%Y-%m-%dT%H:%M:%SZ" "$end" "+%s" 2>/dev/null || echo "0")
    
    if [[ "$start_epoch" -eq 0 || "$end_epoch" -eq 0 ]]; then
        echo "0"
        return
    fi
    
    local duration_seconds=$((end_epoch - start_epoch))
    local duration_minutes=$((duration_seconds / 60))
    
    echo "$duration_minutes"
}

# Function to collect metrics for a workflow
collect_workflow_metrics() {
    local workflow="$1"
    
    print_info "Collecting metrics for workflow: ${workflow}"
    
    local runs=$(gh api \
        -H "Accept: application/vnd.github+json" \
        "/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${workflow}/runs?per_page=30" \
        2>/dev/null || echo "{}")
    
    if [[ "$runs" == "{}" ]]; then
        print_warning "No runs found for workflow: ${workflow}"
        return 1
    fi
    
    local total_runs=$(echo "$runs" | jq '.workflow_runs | length')
    local successful_runs=$(echo "$runs" | jq '[.workflow_runs[] | select(.conclusion == "success")] | length')
    local failed_runs=$(echo "$runs" | jq '[.workflow_runs[] | select(.conclusion == "failure")] | length')
    
    print_success "Found ${total_runs} runs (${successful_runs} successful, ${failed_runs} failed)"
    
    # Calculate average duration
    local total_duration=0
    local count=0
    
    for run in $(echo "$runs" | jq -r '.workflow_runs[] | @base64'); do
        _jq() {
            echo "${run}" | base64 --decode | jq -r "${1}"
        }
        
        local created=$(_jq '.created_at')
        local updated=$(_jq '.updated_at')
        local duration=$(calculate_duration "$created" "$updated")
        
        if [[ "$duration" -gt 0 ]]; then
            total_duration=$((total_duration + duration))
            count=$((count + 1))
        fi
    done
    
    local avg_duration=0
    if [[ "$count" -gt 0 ]]; then
        avg_duration=$((total_duration / count))
    fi
    
    local success_rate=0
    if [[ "$total_runs" -gt 0 ]]; then
        success_rate=$(echo "scale=2; ($successful_runs * 100) / $total_runs" | bc)
    fi
    
    # Output results
    if [[ "$FORMAT" == "json" ]]; then
        cat <<EOF
{
  "workflow": "${workflow}",
  "total_runs": ${total_runs},
  "successful_runs": ${successful_runs},
  "failed_runs": ${failed_runs},
  "success_rate": ${success_rate},
  "average_duration_minutes": ${avg_duration}
}
EOF
    else
        echo ""
        echo "Workflow: ${workflow}"
        echo "----------------------------------------"
        echo "Total Runs:        ${total_runs}"
        echo "Successful Runs:   ${successful_runs}"
        echo "Failed Runs:       ${failed_runs}"
        echo "Success Rate:      ${success_rate}%"
        echo "Avg Duration:      ${avg_duration} minutes"
        echo "----------------------------------------"
    fi
}

# Function to list all workflows
list_workflows() {
    print_info "Listing all workflows..."
    
    gh api \
        -H "Accept: application/vnd.github+json" \
        "/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows" \
        --jq '.workflows[] | {id: .id, name: .name, path: .path, state: .state}'
}

# Main execution
main() {
    print_info "Pipeline Metrics Collection Tool"
    echo ""
    
    check_gh_cli
    
    if [[ -z "$WORKFLOW_NAME" ]]; then
        print_info "No workflow specified, collecting metrics for all workflows"
        
        # Get all workflows
        workflows=$(gh api \
            -H "Accept: application/vnd.github+json" \
            "/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows" \
            --jq '.workflows[].path' 2>/dev/null || echo "")
        
        if [[ -z "$workflows" ]]; then
            print_error "No workflows found"
            exit 1
        fi
        
        for workflow in $workflows; do
            workflow_file=$(basename "$workflow")
            collect_workflow_metrics "$workflow_file" || true
            echo ""
        done
    else
        collect_workflow_metrics "$WORKFLOW_NAME"
    fi
    
    print_success "Metrics collection complete"
}

# Run main function
main "$@"
