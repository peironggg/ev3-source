#!/bin/bash

if [ ! -e brickstrap.sh ]; then
    >&2 echo 'Please download brickstrap.sh from https://raw.githubusercontent.com/ev3dev/brickstrap/master/src/brickstrap.sh (and verify its contents!).'
    exit 1
fi

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/build-node-lib.sh"

docker build -t ev3-source . || exit 1
