#!/bin/sh

if [ ! -e brickstrap.sh ]; then
    >&2 echo 'Please download brickstrap.sh from https://raw.githubusercontent.com/ev3dev/brickstrap/master/src/brickstrap.sh (and verify its contents!).'
    exit 1
fi

pushd sourcetoes5
yarn install && yarn jison parser.jison
popd
cp sourcetoes5/parser.js node_modules/parser.js

pushd babel-transpiler
yarn install && yarn build
popd
cp babel-transpiler/dist/babel-transpiler.js node_modules/babel-transpiler.js

TMPFILE=$(mktemp)
TMPIMG=$(mktemp)
docker build -t ev3-source .
