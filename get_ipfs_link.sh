#!/usr/bin/env bash

set -euET -o pipefail

h="$(ipfs cid base32 "$(ipfs add --recursive --hidden --progress --pin=false --ignore-rules-path=.ipfsignore --quieter .)")"
printf \\n
printf \\n
printf %s\\n 'Test with:'
printf \\n
printf "    ipfs://%s"\\n "$h"
printf \\n
printf %s\\n 'or:'
printf \\n
printf "    https://%s.ipfs.dweb.link/"\\n "$h"
printf \\n
printf %s\\n 'Pin with:'
printf \\n
printf "    ipfs pin add %s"\\n "$h"
printf \\n
