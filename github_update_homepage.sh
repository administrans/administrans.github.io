#!/usr/bin/env bash

set -euET -o pipefail

h="$(ipfs cid base32 "$(ipfs add --recursive --pin=false --ignore-rules-path=.ipfsignore --quieter .)")"
curl -L \
  -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $API_TOKEN_FOR_UPDATE_HOMEPAGE"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/trans-cec/trans-cec.github.io \
  -d '{"name":"trans-cec.gitlab.io", "homepage":"https://'"$h"'.ipfs.dweb.link/"}' > /dev/null
