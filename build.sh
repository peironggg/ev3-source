#!/bin/sh

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/docker-build.sh"

sh ./brickstrap.sh create-tar ev3-source "$TMPFILE"
sh ./brickstrap.sh create-image "$TMPFILE" "$TMPIMG"
gzip -vc "$TMPIMG" > ./ev3-source.img.gz
rm "$TMPFILE" "$TMPIMG"
>&2 echo 'Image created at ./ev3-source.img.gz'
