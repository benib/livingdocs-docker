#!/usr/bin/env bash

# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten

set -e

if [ "$SKIP_BUILD" == "true" ]; then
  echo "Skipping build..."
else
  echo "Building app..."
  npm run build
fi