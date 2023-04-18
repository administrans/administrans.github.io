#!/usr/bin/env bash

set -euET -o pipefail

convert favicon.png -resize 16x16 favicon.ico || true

(
  cd extra-packages
  for i in *.tds.zip; do
    (
      d="$(mktemp -d)"
      ii="$PWD/$i"
      (cd "$d"; unzip "$ii")
      cp -a "$d/tex" ../texlive.js/texlive/texmf-dist/
    )
  done
)

#sed -i -e 's/\\ProvidesClass{lettre}\[/\\ProvidesClass{lettre}%[/' texlive.js/texlive/texmf-dist/tex/latex/lettre/lettre.cls

(
  cd texlive.js
  find texlive -type d -exec echo {}/. \; | sed 's/^texlive//g' >texlive.lst
  find texlive -type f | sed 's/^texlive//g' >>texlive.lst
  for i in texmf-config texmf-dist texmf-var; do
    (
      cd texlive/"$i"/
      ls -R -1 > ls-R
    )
  done
)

if test $# -ge 1 && test "x$1" == "x--no-ipfs"; then
  :
else
  ./get_ipfs_link.sh
fi
