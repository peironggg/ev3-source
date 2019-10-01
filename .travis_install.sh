#!/bin/sh

pushd babel-transpiler && yarn install && popd || exit 1
pushd sourcetoes5 && yarn install && popd || exit 1
curl -L https://raw.githubusercontent.com/ev3dev/brickstrap/master/src/brickstrap.sh > brickstrap.sh || exit 1
