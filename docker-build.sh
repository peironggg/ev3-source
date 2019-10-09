#!/bin/bash

if [ ! -e brickstrap.sh ]; then
    >&2 echo 'Please download brickstrap.sh from https://raw.githubusercontent.com/ev3dev/brickstrap/master/src/brickstrap.sh (and verify its contents!).'
    exit 1
fi

pushd sourcetoes5/jison
yarn install && yarn jison parser.jison || exit 1
popd
cp sourcetoes5/jison/parser.js node_modules/jison_parser.js || exit 1

pushd estree-transpiler
yarn install && yarn build || exit 1
popd
cp estree-transpiler/dist/estree-transpiler.js node_modules/estree_transpiler.js || exit 1

pushd babel-transpiler
yarn install && yarn build || exit 1
popd
cp babel-transpiler/dist/babel-transpiler.js node_modules/babel-transpiler.js || exit 1

docker build -t ev3-source . || exit 1
