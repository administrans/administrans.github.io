#!/usr/bin/env bash

set -euET -o pipefail

ipfs add --recursive --hidden --progress --pin=false -n --ignore-rules-path=.ipfsignore --quieter .
