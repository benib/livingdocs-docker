#!/bin/bash

set -e

semantic-release pre

# Release new version
npm shrinkwrap
npm publish
semantic-release post

# Tell greenkeeper about it
greenkeeper-postpublish
