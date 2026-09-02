#!/bin/zsh
set -u
SLUG="$1"; URL="$2"
OUT="research/raw/${SLUG}.md"
if [ -s "$OUT" ] && [ "$(wc -c < "$OUT")" -gt 800 ]; then echo "CACHED $SLUG"; exit 0; fi
curl -sL --max-time 120 "https://r.jina.ai/${URL}" -o "/tmp/_j.$$" 2>/dev/null
if [ ! -s "/tmp/_j.$$" ]; then echo "FAIL $SLUG $URL"; rm -f "/tmp/_j.$$"; exit 1; fi
python3 research/clean.py "/tmp/_j.$$" "$OUT"
rm -f "/tmp/_j.$$"
echo "OK $SLUG ($(wc -c < "$OUT") bytes) $URL"
