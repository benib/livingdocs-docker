#!/usr/bin/env bash

# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten

set -e

if [ "$RUNBUILD" == "true" ]; then
  echo "Build app"
  npm run build
else
  echo "Not building app"
fi
