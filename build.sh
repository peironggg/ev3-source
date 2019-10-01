#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/docker-build.sh"

TMPDIR=$(mktemp -d)

TARFILE="$TMPDIR/ev3-source.tar"
IMGFILE="$TMPDIR/ev3-source.img"

bash ./brickstrap.sh create-tar ev3-source "$TARFILE" || exit 1
export BRICKSTRAP_IMAGE_FILE_SIZE=$(echo $(($(du -m "$TARFILE" | cut -f1)*5/4)) | cut -d. -f1)M
echo 'Using BRICKSTRAP_IMAGE_FILE_SIZE='$BRICKSTRAP_IMAGE_FILE_SIZE
bash ./brickstrap.sh create-image "$TARFILE" "$IMGFILE" || exit 1
pushd "$TMPDIR"
zip -v9 ev3-source.img.zip ev3-source.img
popd
cp "$TMPDIR/ev3-source.img.zip" .
rm -rf "$TMPDIR"
>&2 echo 'Image created at ./ev3-source.img.zip'
