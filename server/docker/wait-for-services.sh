#!/usr/bin/env bash

# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten

set -e
DIR="$(cd "$(dirname "$0")" && pwd)"

$DIR/wait.sh -h elasticsearch -p 9200 -m "waiting for TCP connection to Elasticsearch..."
$DIR/wait.sh -h postgres -p 5432 -m "waiting for TCP connection to PostgreSQL..."


echo "Running command ..."
exec "$@"
