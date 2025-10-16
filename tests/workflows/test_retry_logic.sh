#!/usr/bin/env bash
# Test: Retry Logic Validation
# Validates that workflows have retry logic for flaky operations

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "  Retry Logic Test"
echo "========================================"
echo ""

FAILED=0
WORKFLOWS_DIR=".github/workflows"

# Check if workflows directory exists
if [ ! -d "$WORKFLOWS_DIR" ]; then
    echo -e "${RED}✗ FAIL: Workflows directory not found${NC}"
    exit 1
fi

echo "Checking retry logic in workflows..."
echo ""

# Test 1: Check for retry action usage
echo "Test 1: Retry action usage (nick-fields/retry)"
WORKFLOWS_WITH_RETRY=0
TOTAL_RETRY_STEPS=0

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if grep -q "nick-fields/retry@" "$workflow" || grep -q "uses: retry@" "$workflow"; then
        WORKFLOWS_WITH_RETRY=$((WORKFLOWS_WITH_RETRY + 1))
        COUNT=$(grep -c "nick-fields/retry@\|uses: retry@" "$workflow" || true)
        TOTAL_RETRY_STEPS=$((TOTAL_RETRY_STEPS + COUNT))
    fi
done

if [ $TOTAL_RETRY_STEPS -gt 0 ]; then
    echo -e "${GREEN}  ✓ Found $TOTAL_RETRY_STEPS retry step(s) across $WORKFLOWS_WITH_RETRY workflow(s)${NC}"
else
    echo -e "${YELLOW}  ⚠ No retry actions found (recommended for network operations)${NC}"
fi
echo ""

# Test 2: Identify flaky operations that should have retries
echo "Test 2: Flaky operation patterns (should have retries)"
FLAKY_PATTERNS=(
    "npm install"
    "pnpm install"
    "yarn install"
    "docker pull"
    "docker push"
    "apt-get update"
    "apt-get install"
    "curl"
    "wget"
    "gh api"
    "git clone"
)

FLAKY_WITHOUT_RETRY=0
for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    for pattern in "${FLAKY_PATTERNS[@]}"; do
        if grep -q "$pattern" "$workflow"; then
            # Check if this step has retry (within 5 lines)
            LINE_NUM=$(grep -n "$pattern" "$workflow" | head -1 | cut -d: -f1)
            
            if [ ! -z "$LINE_NUM" ]; then
                START=$((LINE_NUM > 5 ? LINE_NUM - 5 : 1))
                END=$((LINE_NUM + 5))
                
                if ! sed -n "${START},${END}p" "$workflow" | grep -q "nick-fields/retry@\|uses: retry@"; then
                    echo -e "${YELLOW}  ⚠ $(basename "$workflow"): '$pattern' without retry logic${NC}"
                    FLAKY_WITHOUT_RETRY=$((FLAKY_WITHOUT_RETRY + 1))
                    FAILED=$((FAILED + 1))
                fi
            fi
        fi
    done
done

if [ $FLAKY_WITHOUT_RETRY -eq 0 ]; then
    echo -e "${GREEN}  ✓ All flaky operations have retry logic or are considered stable${NC}"
else
    echo -e "${YELLOW}  ⚠ Found $FLAKY_WITHOUT_RETRY flaky operation(s) without retry logic${NC}"
    echo -e "${YELLOW}    Consider adding retry logic for network operations${NC}"
    FAILED=$((FAILED + FLAKY_WITHOUT_RETRY))
fi
echo ""

# Test 3: Check retry configuration parameters
echo "Test 3: Retry configuration validation"
HAS_PROPER_CONFIG=true

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if grep -q "nick-fields/retry@" "$workflow"; then
        # Check for timeout_minutes or max_attempts
        if ! grep -A 5 "nick-fields/retry@" "$workflow" | grep -q "max_attempts:\|timeout_minutes:"; then
            echo -e "${YELLOW}  ⚠ $(basename "$workflow"): retry without explicit max_attempts/timeout${NC}"
            HAS_PROPER_CONFIG=false
            FAILED=$((FAILED + 1))
        fi
    fi
done

if [ "$HAS_PROPER_CONFIG" = true ]; then
    echo -e "${GREEN}  ✓ All retry actions have proper configuration${NC}"
else
    echo -e "${YELLOW}  ⚠ Some retry actions missing explicit configuration${NC}"
fi
echo ""

# Test 4: Check for exponential backoff
echo "Test 4: Exponential backoff configuration"
HAS_BACKOFF=false

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if grep -q "retry_wait_seconds:" "$workflow" || grep -q "backoff:" "$workflow"; then
        HAS_BACKOFF=true
        echo -e "${GREEN}  ✓ Found backoff/wait configuration${NC}"
        break
    fi
done

if [ "$HAS_BACKOFF" = false ]; then
    echo -e "${YELLOW}  ⚠ No exponential backoff configuration found${NC}"
    echo -e "${YELLOW}    Consider adding retry_wait_seconds for better reliability${NC}"
    FAILED=$((FAILED + 1))
fi
echo ""

# Test 5: Check for on_retry_command hooks
echo "Test 5: Retry hooks (on_retry_command)"
HAS_RETRY_HOOKS=false

for workflow in "$WORKFLOWS_DIR"/*.yml "$WORKFLOWS_DIR"/*.yaml; do
    [ -e "$workflow" ] || continue
    
    if grep -q "on_retry_command:" "$workflow"; then
        HAS_RETRY_HOOKS=true
        echo -e "${GREEN}  ✓ Found retry hooks for cleanup/logging${NC}"
        break
    fi
done

if [ "$HAS_RETRY_HOOKS" = false ]; then
    echo -e "${YELLOW}  ⚠ No retry hooks found (optional)${NC}"
    FAILED=$((FAILED + 1))
fi
echo ""

# Summary
echo "========================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ PASS: Retry logic validation passed${NC}"
    echo ""
    echo "Recommendations:"
    echo "  - Add retry logic for network operations (npm/pnpm install, docker operations)"
    echo "  - Configure max_attempts (2-3) and timeout_minutes (5-10)"
    echo "  - Consider exponential backoff for external API calls"
    exit 0
else
    echo -e "${RED}✗ FAIL: $FAILED retry logic issue(s) found${NC}"
    exit 1
fi
