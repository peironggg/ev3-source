#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
source "$DIR/docker-build.sh"

docker run --rm -it ev3-source su -l robot
