#!/usr/bin/env bash

# Fix permissions on the given directory to allow group read/write of
# regular files and execute of directories.

chown -R www-data "$1"
chgrp -R 0 "$1"
chmod -R g+rw "$1"
find "$1" -type d -exec chmod g+x {} +
