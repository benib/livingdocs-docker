#!/usr/bin/env bash

set -e

cd "$(dirname "$0")"

# cleanup
rm -rf node_modules npm-shrinkwrap.json .npmrc

# prepare files required for docker build
npm install ../
echo "{}" > npm-shrinkwrap.json
touch .npmrc

# give the scripts a spin
li-docker server install
docker build .

li-docker editor install
docker build .
