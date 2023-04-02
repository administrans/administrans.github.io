#!/usr/bin/env bash

set -euET -o pipefail

convert favicon.png -resize 16x16 favicon.ico || true

h="$(ipfs cid base32 "$(ipfs add --recursive --hidden --progress --pin=false --ignore-rules-path=.ipfsignore --quieter .)")"
printf \\n
printf \\n
printf %s\\n 'Test with:'
printf \\n
printf "    ipfs://%s"\\n "$h"
printf \\n
printf %s\\n 'Pin with:'
printf \\n
printf "    ipfs pin add %s"\\n "$h"
printf \\n
