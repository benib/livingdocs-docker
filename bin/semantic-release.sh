#!/bin/bash

set -e

semantic-release pre

# Work around shrinkwrapping issues
npm prune --production
npm install -g semantic-release greenkeeper-postpublish

# Release new version
npm shrinkwrap
npm publish
semantic-release post

# Tell greenkeeper about it
greenkeeper-postpublish
