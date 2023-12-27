#!/usr/bin/env sh
cd ../..
pnpm run build
export revnumber=$1
echo "revnumber=$1" >> $GITHUB_ENV
