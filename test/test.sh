#!/usr/bin/env bash

set -e

cd "$(dirname "$0")"

for PROJECT in 'server' 'editor'
do
  cd $PROJECT

  # cleanup
  rm -rf node_modules

  # prepare files required for docker build
  npm install ../../
  echo "{}" > npm-shrinkwrap.json
  touch .npmrc

  # give the scripts a spin
  li-docker install
  li-docker build

  cd ..
done
