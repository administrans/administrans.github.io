#!/usr/bin/env bash

set -euET -o pipefail

echo "Hashing repository contents with IPFS..."

h="$(ipfs cid base32 "$(ipfs add --recursive --hidden --ignore-rules-path=.ipfsignore --quieter .)")"

echo "After pinning, the new homepage URL will be: https://$h.ipfs.dweb.link/"

# Wait for IPFS daemon to be ready
echo 'Starting IPFS daemon...'
tail -F /tmp/ipfs-daemon.logs -n +1 & pid=$!
ipfs daemon &>/tmp/ipfs-daemon.logs
while ! grep 'Daemon is ready' /tmp/ipfs-daemon.logs; do sleep 1; done
kill "$pid"

# Pin this hash
#(
  ipfs pin remote service add my-remote-pin "$IPFS_REMOTE_API_ENDPOINT" "$IPFS_REMOTE_TOKEN"
  ipfs swarm connect "$IPFS_SWARM_CONNECT_TO"
  ipfs pin remote add --service=my-remote-pin --name='site-trans-cec-'"$GITHUB_SHA" "$h"
  # Remove all logs to avoid leaking tokens and private URLs:
#) > /dev/null 2>&1

curl -L \
  -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $API_TOKEN_FOR_UPDATE_HOMEPAGE"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/trans-cec/trans-cec.github.io \
  -d '{"name":"trans-cec.gitlab.io", "homepage":"https://'"$h"'.ipfs.dweb.link/"}' > /dev/null
