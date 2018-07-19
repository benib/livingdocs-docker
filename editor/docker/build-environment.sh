#!/usr/bin/env bash

# This file is managed with https://github.com/livingdocsIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten

set -e

if [ "$SKIP_BUILD" == "true" ]; then
  echo "Skipping build..."
else
  echo "Building environment ${ENVIRONMENT}..."
  npm run build:environment
  exec "$@"
fi
