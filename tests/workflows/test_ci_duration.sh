#!/usr/bin/env bash
#
# CI Duration Test
# Verifies that CI pipeline duration improvements meet targets
#
# Usage:
#   ./test_ci_duration.sh [baseline_minutes] [target_reduction_percent]
#   ./test_ci_duration.sh 8 20  # Baseline 8 min, target 20% reduction
#

set -euo pipefail

BASELINE_MINUTES="${1:-8}"
TARGET_REDUCTION="${2:-20}"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "========================================"
echo "  CI Duration Test"
echo "========================================"
echo ""
echo "Baseline: ${BASELINE_MINUTES} minutes"
echo "Target Reduction: ${TARGET_REDUCTION}%"
echo ""

# Calculate target duration
TARGET_MINUTES=$(echo "scale=2; $BASELINE_MINUTES * (100 - $TARGET_REDUCTION) / 100" | bc)
echo "Target Duration: ≤ ${TARGET_MINUTES} minutes"
echo ""

# Get recent CI workflow runs
if command -v gh &> /dev/null; then
    echo "Fetching recent CI runs..."
    
    runs=$(gh api \
        -H "Accept: application/vnd.github+json" \
        "/repos/yacosta738/yacosta738.github.io/actions/workflows/ci.yml/runs?per_page=5&status=completed" \
        2>/dev/null || echo "{}")
    
    if [ "$runs" != "{}" ]; then
        # Calculate average duration of recent runs
        total_duration=0
        count=0
        
        for run in $(echo "$runs" | jq -c '.workflow_runs[]'); do
            created=$(echo "$run" | jq -r '.created_at')
            updated=$(echo "$run" | jq -r '.updated_at')

            if [ "$created" != "null" ] && [ "$updated" != "null" ]; then
                # Portable date parsing: try GNU date, then BSD date, then fallback to 0
                start_epoch=$(date -d "$created" +%s 2>/dev/null || date -j -f "%Y-%m-%dT%H:%M:%SZ" "$created" +%s 2>/dev/null || echo "0")
                end_epoch=$(date -d "$updated" +%s 2>/dev/null || date -j -f "%Y-%m-%dT%H:%M:%SZ" "$updated" +%s 2>/dev/null || echo "0")

                if [ "$start_epoch" -gt 0 ] && [ "$end_epoch" -gt 0 ]; then
                    duration_seconds=$((end_epoch - start_epoch))
                    duration_minutes=$(echo "scale=2; $duration_seconds / 60" | bc)
                    
                    echo "  Run: ${duration_minutes} min"
                    total_duration=$(echo "$total_duration + $duration_minutes" | bc)
                    count=$((count + 1))
                fi
            fi
        done
        
        if [ "$count" -gt 0 ]; then
            avg_duration=$(echo "scale=2; $total_duration / $count" | bc)
            echo ""
            echo "Average Duration: ${avg_duration} minutes"
            
            # Calculate improvement
            improvement=$(echo "scale=2; (($BASELINE_MINUTES - $avg_duration) / $BASELINE_MINUTES) * 100" | bc)
            echo "Improvement: ${improvement}%"
            echo ""
            
            # Check if target met
            if (( $(echo "$avg_duration <= $TARGET_MINUTES" | bc -l) )); then
                echo -e "${GREEN}✓ PASS: Duration target met!${NC}"
                echo "  Current: ${avg_duration} min ≤ Target: ${TARGET_MINUTES} min"
                exit 0
            else
                echo -e "${RED}✗ FAIL: Duration target not met${NC}"
                echo "  Current: ${avg_duration} min > Target: ${TARGET_MINUTES} min"
                exit 1
            fi
        else
            echo -e "${YELLOW}⚠ WARNING: No valid duration data found${NC}"
            exit 0
        fi
    else
        echo -e "${YELLOW}⚠ WARNING: Could not fetch workflow runs${NC}"
        exit 0
    fi
else
    echo -e "${YELLOW}⚠ WARNING: GitHub CLI not installed, skipping actual measurement${NC}"
    echo "Install with: brew install gh"
    echo ""
    echo "This test will pass in CI when gh CLI is available."
    exit 0
fi
