#!/usr/bin/env bash

set -euET -o pipefail

h="$(ipfs cid base32 "$(ipfs add --recursive --hidden --progress --pin=false --ignore-rules-path=.ipfsignore --quieter .)")"
echo
echo "ipfs://$h"
