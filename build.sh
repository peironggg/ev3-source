#!/bin/sh

if [ ! -e brickstrap.sh ]; then
    >&2 echo 'Please download brickstrap.sh from https://raw.githubusercontent.com/ev3dev/brickstrap/master/src/brickstrap.sh (and verify its contents!).'
    exit 1
fi

TMPFILE=$(mktemp)
TMPIMG=$(mktemp)
docker build -t ev3-source .
sh ./brickstrap.sh create-tar ev3-source "$TMPFILE"
sh ./brickstrap.sh create-image "$TMPFILE" "$TMPIMG"
gzip -vc "$TMPIMG" > ./ev3-source.img.gz
rm "$TMPFILE" "$TMPIMG"
>&2 echo 'Image created at ./ev3-source.img.gz'
