#!/bin/sh

if [ ! -e brickstrap.sh ]; then
    >&2 echo 'Please download brickstrap.sh from https://raw.githubusercontent.com/ev3dev/brickstrap/master/src/brickstrap.sh (and verify its contents!).'
    exit 1
fi

pushd sourcetoes5
yarn install && yarn jison parser.jison || exit 1
popd
cp sourcetoes5/parser.js node_modules/parser.js || exit 1

pushd babel-transpiler
yarn install && yarn build || exit 1
popd
cp babel-transpiler/dist/babel-transpiler.js node_modules/babel-transpiler.js || exit 1

docker build -t ev3-source . || exit 1
