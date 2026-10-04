#!/bin/sh
# Mirror site/ to https://ruzzoli.de/games/ (nginx serves it, *.wasm.gz via gzip_static).
# Pass -n for a dry run.
set -e
cd "$(dirname "$0")"
rsync -rltzi --delete --chmod=D755,F644 "$@" site/ ruzzoli.de:/var/www/ruzzoli.de/games/
