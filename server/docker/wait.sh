#!/usr/bin/env bash

# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten

while [[ "$#" > 1 ]]; do case $1 in
    -p|--port) PORT="$2";;
    -h|--host) HOST="$2";;
    -t|--timeout) TIMEOUT=$2;;
    -m|--message) echo -n $2;;
    *);;
  esac; shift
done

TIMEOUT=${TIMEOUT:-300}
while ! nc -zw 1 $HOST $PORT 2>/dev/null
do
  let TIMEOUT=$TIMEOUT-1
  if (( $TIMEOUT < 0 )); then echo -n 'timeout' && exit 1; fi
  echo -n .
  sleep 1
done
echo
