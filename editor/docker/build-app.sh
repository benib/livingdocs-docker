#!/usr/bin/env bash

set

if [ "$RUNBUILD" == "true" ]; then
  echo "Build app"
  npm run build
else
  echo "Not building app"
fi
