#!/usr/bin/env bash
# Failure Handler Script
# Provides better error messages and failure reporting for GitHub Actions

set -uo pipefail

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
WORKFLOW_NAME="${GITHUB_WORKFLOW:-Unknown Workflow}"
JOB_NAME="${GITHUB_JOB:-Unknown Job}"
RUN_ID="${GITHUB_RUN_ID:-unknown}"
RUN_URL="${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY:-}/actions/runs/${RUN_ID}"
FAILURE_TYPE="${1:-unknown}"
FAILURE_MESSAGE="${2:-No error message provided}"

# Function to print section header
print_header() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}  ❌ BUILD FAILURE DETECTED${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Function to print failure details
print_failure_details() {
    echo -e "${YELLOW}Workflow:${NC} $WORKFLOW_NAME"
    echo -e "${YELLOW}Job:${NC} $JOB_NAME"
    echo -e "${YELLOW}Run ID:${NC} $RUN_ID"
    echo -e "${YELLOW}Failure Type:${NC} $FAILURE_TYPE"
    echo ""
    echo -e "${YELLOW}Error Message:${NC}"
    echo -e "${RED}$FAILURE_MESSAGE${NC}"
    echo ""
}

# Function to provide context-specific troubleshooting
print_troubleshooting() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}  🔍 Troubleshooting Steps${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    case "$FAILURE_TYPE" in
        "test")
            echo "Test Failure Troubleshooting:"
            echo "  1. Check test logs above for specific test failures"
            echo "  2. Run tests locally: pnpm test"
            echo "  3. Check for race conditions or timing issues"
            echo "  4. Verify test fixtures and mock data"
            echo "  5. Review recent code changes that might affect tests"
            ;;
        "lint")
            echo "Lint Failure Troubleshooting:"
            echo "  1. Run locally: pnpm run check"
            echo "  2. Auto-fix issues: pnpm run format"
            echo "  3. Check .eslintrc and biome.json configuration"
            echo "  4. Review files changed in this commit"
            ;;
        "build")
            echo "Build Failure Troubleshooting:"
            echo "  1. Clear cache: rm -rf node_modules .astro dist"
            echo "  2. Reinstall dependencies: pnpm install"
            echo "  3. Run build locally: pnpm run build"
            echo "  4. Check for TypeScript errors: pnpm run typecheck"
            echo "  5. Verify all imports and module paths"
            ;;
        "deploy")
            echo "Deployment Failure Troubleshooting:"
            echo "  1. Check if build artifacts exist"
            echo "  2. Verify deployment credentials/tokens"
            echo "  3. Check network connectivity to deployment target"
            echo "  4. Review deployment logs for specific errors"
            echo "  5. Verify deployment configuration"
            ;;
        "network")
            echo "Network Failure Troubleshooting:"
            echo "  1. This may be a transient network issue - retry the workflow"
            echo "  2. Check GitHub Status: https://www.githubstatus.com/"
            echo "  3. Verify external service availability"
            echo "  4. Consider adding retry logic for network operations"
            ;;
        "dependency")
            echo "Dependency Failure Troubleshooting:"
            echo "  1. Check pnpm-lock.yaml for lock conflicts"
            echo "  2. Verify package.json versions are correct"
            echo "  3. Check for deprecated or removed packages"
            echo "  4. Try: pnpm install --frozen-lockfile"
            echo "  5. Review npm registry availability"
            ;;
        "timeout")
            echo "Timeout Failure Troubleshooting:"
            echo "  1. Check if job is hanging or genuinely slow"
            echo "  2. Review timeout-minutes setting in workflow"
            echo "  3. Look for infinite loops or blocked operations"
            echo "  4. Check for deadlocks in concurrent operations"
            echo "  5. Consider splitting job into smaller tasks"
            ;;
        *)
            echo "General Troubleshooting:"
            echo "  1. Check the full logs at: $RUN_URL"
            echo "  2. Review recent commits for potential issues"
            echo "  3. Try running the workflow again (may be transient)"
            echo "  4. Check GitHub Actions status page"
            echo "  5. Review workflow configuration for errors"
            ;;
    esac
    echo ""
}

# Function to print helpful links
print_links() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}  📚 Helpful Links${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "  • Full Run Logs: $RUN_URL"
    echo "  • GitHub Status: https://www.githubstatus.com/"
    echo "  • Project Docs: ./docs/"
    echo "  • Contributing Guide: ./CONTRIBUTING.md"
    echo ""
}

# Function to create GitHub Actions annotation
create_annotation() {
    if [ -n "${GITHUB_ACTIONS:-}" ]; then
        echo "::error::$FAILURE_TYPE failure in $JOB_NAME: $FAILURE_MESSAGE"
    fi
}

# Function to collect diagnostic information
collect_diagnostics() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}  📊 Diagnostic Information${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    if command -v node &> /dev/null; then
        echo "Node.js: $(node --version)"
    fi
    
    if command -v pnpm &> /dev/null; then
        echo "pnpm: $(pnpm --version)"
    fi
    
    if [ -n "${RUNNER_OS:-}" ]; then
        echo "Runner OS: $RUNNER_OS"
    fi
    
    if [ -n "${RUNNER_ARCH:-}" ]; then
        echo "Runner Arch: $RUNNER_ARCH"
    fi
    
    echo "Git SHA: ${GITHUB_SHA:-unknown}"
    echo "Git Ref: ${GITHUB_REF:-unknown}"
    echo ""
}

# Main execution
main() {
    print_header
    print_failure_details
    collect_diagnostics
    print_troubleshooting
    print_links
    create_annotation
    
    # Exit with failure code
    exit 1
}

# Run main function
main
