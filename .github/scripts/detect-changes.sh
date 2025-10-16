#!/usr/bin/env bash
#
# Detect Changed Files/Paths Script
# Determines which files or directories have changed in a PR or push
#
# Usage:
#   ./detect-changes.sh [base_ref] [head_ref]
#   ./detect-changes.sh                        # Uses github context
#   ./detect-changes.sh --pattern="apps/**"    # Check specific pattern
#

set -euo pipefail

# Default values from GitHub context
BASE_REF="${GITHUB_BASE_REF:-main}"
HEAD_REF="${GITHUB_HEAD_REF:-HEAD}"
PATTERN="${1:-}"

# Function to get changed files
get_changed_files() {
    local base="$1"
    local head="$2"
    
    if [ -n "$GITHUB_EVENT_NAME" ] && [ "$GITHUB_EVENT_NAME" = "pull_request" ]; then
        # In PR context, compare against base branch
        git fetch origin "$base" --depth=1 2>/dev/null || true
        git diff --name-only "origin/$base...$head"
    else
        # In push context, compare against previous commit
        git diff --name-only HEAD^ HEAD 2>/dev/null || echo ""
    fi
}

# Function to check if pattern matches any changed files
check_pattern() {
    local pattern="$1"
    local changed_files="$2"
    
    if [ -z "$changed_files" ]; then
        echo "false"
        return
    fi
    
    # Use grep to match pattern
    if echo "$changed_files" | grep -qE "$pattern"; then
        echo "true"
    else
        echo "false"
    fi
}

# Function to categorize changes
categorize_changes() {
    local changed_files="$1"
    
    local has_docs=false
    local has_code=false
    local has_tests=false
    local has_workflows=false
    local has_config=false
    
    while IFS= read -r file; do
        case "$file" in
            docs/*|*.md|specs/*)
                has_docs=true
                ;;
            .github/workflows/*|.github/actions/*)
                has_workflows=true
                ;;
            apps/*/src/*|apps/*/lib/*|src/*)
                has_code=true
                ;;
            apps/*/tests/*|tests/*|*.test.*|*.spec.*)
                has_tests=true
                ;;
            *.json|*.yaml|*.yml|*.toml|*.config.*)
                has_config=true
                ;;
        esac
    done <<< "$changed_files"
    
    # Output JSON
    cat <<EOF
{
  "has_docs": $has_docs,
  "has_code": $has_code,
  "has_tests": $has_tests,
  "has_workflows": $has_workflows,
  "has_config": $has_config,
  "docs_only": $([ "$has_docs" = true ] && [ "$has_code" = false ] && echo true || echo false),
  "tests_only": $([ "$has_tests" = true ] && [ "$has_code" = false ] && echo true || echo false)
}
EOF
}

# Main execution
main() {
    if [[ "$PATTERN" == --pattern=* ]]; then
        # Extract pattern
        PATTERN="${PATTERN#--pattern=}"
        
        # Get changed files
        changed_files=$(get_changed_files "$BASE_REF" "$HEAD_REF")
        
        # Check pattern
        result=$(check_pattern "$PATTERN" "$changed_files")
        echo "$result"
    else
        # Get changed files
        changed_files=$(get_changed_files "$BASE_REF" "$HEAD_REF")
        
        if [ -z "$changed_files" ]; then
            echo "{\"changed_files\": [], \"categories\": {}}"
            exit 0
        fi
        
        # Categorize changes
        categories=$(categorize_changes "$changed_files")
        
        # Output complete JSON
        cat <<EOF
{
  "changed_files": [
$(echo "$changed_files" | sed 's/^/    "/; s/$/",/' | sed '$ s/,$//')
  ],
  "categories": $categories
}
EOF
    fi
}

# Run main function
main "$@"
