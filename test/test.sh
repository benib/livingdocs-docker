#!/usr/bin/env bash

set -e

cd "$(dirname "$0")"

# cleanup
rm -rf node_modules npm-shrinkwrap.json .npmrc

# prepare files required for docker build
npm i
npm shrinkwrap
touch .npmrc

# give the scripts a spin
li-docker server install
li-docker server build

li-docker editor install
li-docker editor build
