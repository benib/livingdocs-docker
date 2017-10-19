#!/usr/bin/env bash

# Fix permissions on the given directory to allow group read/write of
# regular files and execute of directories.
DIRECTORIES="${1:-/app /var/lib/nginx /var/log/nginx /var/tmp/nginx}"

chown -R www-data:www-data $DIRECTORIES
chmod -R g+rw $DIRECTORIES
chmod -R +x /app/bin
find /app -type d -exec chmod g+x {} +
