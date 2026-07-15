#!/usr/bin/env bash
# Builds public/cv/Leonardo_Chiaramonti_CV.pdf from cv/cv.md.
# Requires: pandoc + Google Chrome (headless print).
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="public/cv/Leonardo_Chiaramonti_CV.pdf"
TMP_HTML="$(mktemp -t cv).html"

pandoc cv/cv.md \
  --standalone \
  --metadata pagetitle="Leonardo Chiaramonti — CV" \
  --css cv/cv.css \
  --embed-resources \
  -o "$TMP_HTML"

mkdir -p "$(dirname "$OUT")"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$TMP_HTML"

rm -f "$TMP_HTML"
echo "Wrote $OUT"
