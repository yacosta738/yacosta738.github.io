#!/bin/bash
# Cloudflare Pages pre-deployment verification script for yap-portfolio

set -e

echo "🔍 Cloudflare Pages Pre-Deployment Check"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
REQUIRED_NODE_VERSION="22.22.2"
REQUIRED_PNPM_VERSION="10.33.0"

version_gte() {
    local current=$1
    local required=$2
    local current_major current_minor current_patch
    local required_major required_minor required_patch

    IFS='.' read -r current_major current_minor current_patch <<< "$current"
    IFS='.' read -r required_major required_minor required_patch <<< "$required"

    current_patch=${current_patch:-0}
    required_patch=${required_patch:-0}

    if (( current_major > required_major )); then
        return 0
    fi
    if (( current_major < required_major )); then
        return 1
    fi

    if (( current_minor > required_minor )); then
        return 0
    fi
    if (( current_minor < required_minor )); then
        return 1
    fi

    (( current_patch >= required_patch ))
}

# Check Node version
echo "📦 Checking Node version..."
NODE_VERSION=$(node -v)
NODE_VERSION_CLEAN=${NODE_VERSION#v}
if version_gte "$NODE_VERSION_CLEAN" "$REQUIRED_NODE_VERSION"; then
    echo -e "${GREEN}✓${NC} Node version: $NODE_VERSION (expected >= v${REQUIRED_NODE_VERSION})"
else
    echo -e "${RED}✗${NC} Node version: $NODE_VERSION (expected >= v${REQUIRED_NODE_VERSION})"
    echo -e "${YELLOW}⚠${NC}  Install or upgrade Node to at least v${REQUIRED_NODE_VERSION}: https://nodejs.org/"
    exit 1
fi
echo ""

# Check pnpm version
echo "📦 Checking pnpm version..."
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm -v)
    if [[ "$PNPM_VERSION" == "$REQUIRED_PNPM_VERSION" ]]; then
        echo -e "${GREEN}✓${NC} pnpm version: $PNPM_VERSION"
    else
        echo -e "${RED}✗${NC} pnpm version: $PNPM_VERSION (expected ${REQUIRED_PNPM_VERSION})"
        echo -e "${YELLOW}⚠${NC}  Install or upgrade pnpm: npm install -g pnpm@${REQUIRED_PNPM_VERSION}"
        exit 1
    fi
else
    echo -e "${RED}✗${NC} pnpm not found"
    echo -e "${YELLOW}⚠${NC}  Install pnpm: npm install -g pnpm@${REQUIRED_PNPM_VERSION}"
    exit 1
fi
echo ""

# Check required files
echo "📄 Checking required files..."
FILES=(
    "wrangler.toml"
    ".cfignore"
    "apps/portfolio/public/_headers"
    "apps/portfolio/public/_routes.json"
)

for file in "${FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (missing)"
    fi
done
echo ""

# Build test
echo "🔨 Testing yap-portfolio build..."
if pnpm run build:portfolio; then
    echo -e "${GREEN}✓${NC} Build successful"
else
    echo -e "${RED}✗${NC} Build failed"
    exit 1
fi
echo ""

# Check dist directory
echo "📂 Checking build output..."
if [[ -d "apps/portfolio/dist" ]]; then
    echo -e "${GREEN}✓${NC} apps/portfolio/dist directory exists"
    
    # Check if _headers and _routes.json are copied
    if [[ -f "apps/portfolio/dist/_headers" ]]; then
        echo -e "${GREEN}✓${NC} apps/portfolio/dist/_headers present"
    else
        echo -e "${RED}✗${NC} dist/_headers missing (check public/_headers)"
    fi
    
    if [[ -f "apps/portfolio/dist/_routes.json" ]]; then
        echo -e "${GREEN}✓${NC} apps/portfolio/dist/_routes.json present"
    else
        echo -e "${RED}✗${NC} dist/_routes.json missing (check public/_routes.json)"
    fi
    
    # Count files
    FILE_COUNT=$(find apps/portfolio/dist -type f | wc -l | tr -d ' ')
    echo -e "${GREEN}✓${NC} Total files in apps/portfolio/dist: $FILE_COUNT"
else
    echo -e "${RED}✗${NC} apps/portfolio/dist directory missing"
    exit 1
fi
echo ""

# Check for common issues
echo "🔍 Checking for common issues..."

# Check if using correct imports
if grep -r "text-green-[0-9]" apps/portfolio/src/ --include="*.astro" --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "node_modules" > /dev/null; then
    echo -e "${YELLOW}⚠${NC}  Found hardcoded text-green-* classes (should use text-brand-accent)"
    echo -e "    Run: ${YELLOW}grep -r 'text-green-' apps/portfolio/src/ --include='*.astro'${NC}"
else
    echo -e "${GREEN}✓${NC} No hardcoded green classes found"
fi

# Check for console.log in source
if grep -r "console.log" apps/portfolio/src/ --include="*.ts" --include="*.tsx" --include="*.astro" 2>/dev/null | grep -v "node_modules" > /dev/null; then
    echo -e "${YELLOW}⚠${NC}  Found console.log statements (will be removed by terser)"
else
    echo -e "${GREEN}✓${NC} No console.log statements found"
fi

echo ""

echo "========================================="
echo -e "${GREEN}✅ Pre-deployment check complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Inspect auth: pnpm run cloudflare:whoami"
echo "2. Deploy portfolio: pnpm run cloudflare:deploy:portfolio"
echo "3. Monitor build at: https://dash.cloudflare.com/"
echo ""
echo "📖 See docs/guides/cloudflare.md for project-specific setup instructions"
