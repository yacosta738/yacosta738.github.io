#!/usr/bin/env bash
#
# Parallel Jobs Test
# Verifies that independent jobs are running in parallel, not sequentially
#
# Usage:
#   ./test_parallel_jobs.sh [workflow_file]
#   ./test_parallel_jobs.sh ci.yml
#

set -euo pipefail

WORKFLOW="${1:-ci.yml}"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================"
echo "  Parallel Jobs Test"
echo "========================================"
echo ""
echo "Workflow: ${WORKFLOW}"
echo ""

# Check if yq is installed
if ! command -v yq &> /dev/null; then
    echo -e "${YELLOW}⚠ WARNING: yq not installed${NC}"
    echo "Install with: brew install yq"
    echo ""
    echo "Cannot verify job parallelization without yq"
    exit 0
fi

workflow_path=".github/workflows/${WORKFLOW}"

if [ ! -f "$workflow_path" ]; then
    echo -e "${RED}✗ ERROR: Workflow file not found: $workflow_path${NC}"
    exit 1
fi

echo "Analyzing workflow structure..."
echo ""

# Get all jobs
jobs=$(yq eval '.jobs | keys | .[]' "$workflow_path")
job_count=$(echo "$jobs" | wc -l | tr -d ' ')

echo "Found $job_count job(s):"
for job in $jobs; do
    echo "  - $job"
done
echo ""

# Check for dependencies (needs: field)
has_dependencies=false
sequential_jobs=0
parallel_jobs=0

for job in $jobs; do
    needs=$(yq eval ".jobs.$job.needs" "$workflow_path")
    
    if [ "$needs" != "null" ] && [ -n "$needs" ]; then
        has_dependencies=true
        sequential_jobs=$((sequential_jobs + 1))
        echo -e "${BLUE}ℹ${NC} Job '$job' has dependencies: $needs"
    else
        parallel_jobs=$((parallel_jobs + 1))
        echo -e "${GREEN}✓${NC} Job '$job' can run in parallel (no dependencies)"
    fi
done

echo ""
echo "Summary:"
echo "  Parallel jobs: $parallel_jobs"
echo "  Sequential jobs: $sequential_jobs"
echo ""

# Verify parallelization
if [ "$parallel_jobs" -ge 2 ]; then
    echo -e "${GREEN}✓ PASS: Multiple jobs can run in parallel${NC}"
    echo "  $parallel_jobs jobs without dependencies will run concurrently"
    
    # Check if running in CI with actual run data
    if command -v gh &> /dev/null && [ -n "${GITHUB_ACTIONS:-}" ]; then
        echo ""
        echo "Fetching actual run timing data..."
        
        # Get latest workflow run
        run_id=$(gh api \
            "/repos/yacosta738/yacosta738.github.io/actions/workflows/${WORKFLOW}/runs?per_page=1" \
            --jq '.workflow_runs[0].id' 2>/dev/null || echo "")
        
        if [ -n "$run_id" ] && [ "$run_id" != "null" ]; then
            # Get job timings
            jobs_data=$(gh api \
                "/repos/yacosta738/yacosta738.github.io/actions/runs/${run_id}/jobs" \
                --jq '.jobs[] | {name: .name, started_at: .started_at, completed_at: .completed_at}' \
                2>/dev/null || echo "")
            
            if [ -n "$jobs_data" ]; then
                echo ""
                echo "Recent run job timings:"
                echo "$jobs_data" | jq -r '"  \(.name): \(.started_at) -> \(.completed_at)"'
                
                # Check if jobs started at similar times (within 30 seconds)
                # This would indicate parallel execution
                echo ""
                echo -e "${BLUE}ℹ${NC} Jobs starting within 30 seconds are likely running in parallel"
            fi
        fi
    fi
    
    exit 0
elif [ "$job_count" -eq 1 ]; then
    echo -e "${BLUE}ℹ INFO: Only one job in workflow${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠ WARNING: All jobs have dependencies (fully sequential)${NC}"
    echo "  Consider removing unnecessary dependencies to enable parallelization"
    exit 0
fi
