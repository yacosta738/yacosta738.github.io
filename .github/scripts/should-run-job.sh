#!/usr/bin/env bash
#
# Should Run Job Script
# Determines whether a specific job should run based on changed files
#
# Usage:
#   ./should-run-job.sh JOB_NAME
#   Examples:
#     ./should-run-job.sh lint      # Check if lint should run
#     ./should-run-job.sh test      # Check if tests should run
#     ./should-run-job.sh e2e       # Check if E2E tests should run
#     ./should-run-job.sh deploy    # Check if deployment should run
#

set -euo pipefail

JOB_NAME="${1:-unknown}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get change categories
CHANGES=$("$SCRIPT_DIR/detect-changes.sh")

# Extract boolean values from JSON
HAS_DOCS=$(echo "$CHANGES" | jq -r '.categories.has_docs // false')
HAS_CODE=$(echo "$CHANGES" | jq -r '.categories.has_code // false')
HAS_TESTS=$(echo "$CHANGES" | jq -r '.categories.has_tests // false')
HAS_WORKFLOWS=$(echo "$CHANGES" | jq -r '.categories.has_workflows // false')
HAS_CONFIG=$(echo "$CHANGES" | jq -r '.categories.has_config // false')
DOCS_ONLY=$(echo "$CHANGES" | jq -r '.categories.docs_only // false')
TESTS_ONLY=$(echo "$CHANGES" | jq -r '.categories.tests_only // false')

# Determine if job should run based on job name
should_run() {
    local job="$1"
    
    case "$job" in
        lint|check|format)
            # Run lint for any code, config, or workflow changes
            if [ "$HAS_CODE" = "true" ] || [ "$HAS_CONFIG" = "true" ] || [ "$HAS_WORKFLOWS" = "true" ]; then
                echo "true"
            else
                echo "false"
            fi
            ;;
        
        test|unit|integration)
            # Run tests for code or test changes
            if [ "$HAS_CODE" = "true" ] || [ "$HAS_TESTS" = "true" ]; then
                echo "true"
            else
                echo "false"
            fi
            ;;
        
        e2e|playwright|cypress)
            # Run E2E only for significant code changes (not test-only or docs-only)
            if [ "$HAS_CODE" = "true" ] && [ "$DOCS_ONLY" = "false" ]; then
                echo "true"
            else
                echo "false"
            fi
            ;;
        
        build)
            # Run build for code or config changes
            if [ "$HAS_CODE" = "true" ] || [ "$HAS_CONFIG" = "true" ]; then
                echo "true"
            else
                echo "false"
            fi
            ;;
        
        deploy)
            # Run deploy only for code changes on main branch
            if [ "$HAS_CODE" = "true" ] && [ "$DOCS_ONLY" = "false" ]; then
                if [ "${GITHUB_REF:-}" = "refs/heads/main" ] || [ "${GITHUB_BASE_REF:-}" = "main" ]; then
                    echo "true"
                else
                    echo "false"
                fi
            else
                echo "false"
            fi
            ;;
        
        docs|documentation)
            # Run docs jobs only for docs changes
            if [ "$HAS_DOCS" = "true" ]; then
                echo "true"
            else
                echo "false"
            fi
            ;;
        
        security|audit)
            # Run security checks for code or config changes
            if [ "$HAS_CODE" = "true" ] || [ "$HAS_CONFIG" = "true" ]; then
                echo "true"
            else
                echo "false"
            fi
            ;;
        
        *)
            # Unknown job - run by default to be safe
            echo "true"
            ;;
    esac
}

# Main execution
SHOULD_RUN=$(should_run "$JOB_NAME")

# Output result
cat <<EOF
{
  "job": "$JOB_NAME",
  "should_run": $SHOULD_RUN,
  "reason": "$([ "$SHOULD_RUN" = "true" ] && echo "Required changes detected" || echo "No relevant changes")",
  "changes": {
    "has_code": $HAS_CODE,
    "has_docs": $HAS_DOCS,
    "has_tests": $HAS_TESTS,
    "has_workflows": $HAS_WORKFLOWS,
    "docs_only": $DOCS_ONLY
  }
}
EOF

# Exit with appropriate code
if [ "$SHOULD_RUN" = "true" ]; then
    exit 0
else
    exit 1
fi
