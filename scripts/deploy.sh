#!/usr/bin/env bash
# Builds the site and publishes dist/ to the gh-pages branch, which GitHub Pages serves.
# Usage: npm run deploy
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build

REMOTE=$(git remote get-url origin)
NAME=$(git config user.name); EMAIL=$(git config user.email)
STAMP=$(git rev-parse --short HEAD)

rm -rf .deploy && mkdir .deploy && cp -R dist/. .deploy/
# Pages runs Jekyll by default, which would skip Astro's _astro/ folder. This file turns that off.
touch .deploy/.nojekyll
cd .deploy
git init -q -b gh-pages
git add -A
git -c user.name="$NAME" -c user.email="$EMAIL" commit -q -m "Deploy site from $STAMP"
git push -q --force "$REMOTE" gh-pages
cd .. && rm -rf .deploy
echo "Published. GitHub Pages picks it up within a minute or two."
