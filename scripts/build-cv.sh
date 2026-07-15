#!/usr/bin/env bash
# Builds public/cv/Leonardo_Chiaramonti_CV.pdf from cv/cv.md.
# Requires: pandoc + Google Chrome.
#
# Notes: legacy headless mode produces blank pages on macOS, so we use
# --headless=new. That mode may not exit after printing, so we run Chrome
# in the background, wait for the PDF to appear, then kill it.
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="public/cv/Leonardo_Chiaramonti_CV.pdf"
TMP_HTML="$(mktemp -t cv).html"
PROFILE_DIR="$(mktemp -d -t cvchrome)"

cleanup() {
  if [ -n "${CHROME_PID:-}" ]; then
    kill "$CHROME_PID" 2>/dev/null || true
    wait "$CHROME_PID" 2>/dev/null || true
  fi
  rm -rf "$TMP_HTML" "$PROFILE_DIR" 2>/dev/null || true
}
trap cleanup EXIT

pandoc cv/cv.md \
  --standalone \
  --metadata pagetitle="Leonardo Chiaramonti — CV" \
  --css cv/cv.css \
  --embed-resources \
  -o "$TMP_HTML"

mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --user-data-dir="$PROFILE_DIR" \
  --print-to-pdf="$OUT" "file://$TMP_HTML" >/dev/null 2>&1 &
CHROME_PID=$!

for _ in $(seq 1 60); do
  if [ -s "$OUT" ]; then
    sleep 1 # let Chrome finish flushing the file
    break
  fi
  sleep 0.5
done

if [ ! -s "$OUT" ]; then
  echo "ERROR: Chrome did not produce $OUT" >&2
  exit 1
fi

echo "Wrote $OUT"
