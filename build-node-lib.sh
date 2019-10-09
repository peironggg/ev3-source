#!/bin/bash

mkdir -p node_modules

pushd sourcetoes5/jison
yarn install && yarn jison parser.jison || exit 1
popd
cp sourcetoes5/jison/parser.js node_modules/jison-transpiler.js || exit 1

pushd estree-transpiler
yarn install && yarn build || exit 1
popd
cp estree-transpiler/dist/estree-transpiler.js node_modules/estree-transpiler.js || exit 1

pushd babel-transpiler
yarn install && yarn build || exit 1
popd
cp babel-transpiler/dist/babel-transpiler.js node_modules/babel-transpiler.js || exit 1

pushd stdlib
yarn install && yarn build || exit 1
popd
cp stdlib/dist/stdlib.js node_modules/stdlib.js || exit 1
