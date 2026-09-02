#!/bin/zsh
# run_fetch.sh <tsvfile> <parallel>
TSV="$1"; P="${2:-4}"
i=0
while IFS=$'\t' read -r slug url; do
  [ -z "$slug" ] && continue
  ./research/fetch.sh "$slug" "$url" &
  i=$((i+1))
  if [ $((i % P)) -eq 0 ]; then wait; sleep 2; fi
done < "$TSV"
wait
echo "=== DONE $TSV ==="
