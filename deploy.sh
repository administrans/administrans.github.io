#!/usr/bin/env bash

set -euET -o pipefail

convert favicon.png -resize 16x16 favicon.ico || true

h="$(ipfs cid base32 "$(ipfs add --recursive --hidden --progress --pin=false --ignore-rules-path=.ipfsignore --quieter .)")"
echo
echo "ipfs://$h"
