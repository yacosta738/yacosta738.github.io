#!/usr/bin/env sh
pnpm i && pnpm run build
export revnumber=$1
echo "revnumber=$1" >> $GITHUB_ENV
