#!/usr/bin/env bash

set -e

URL=$1
STATE=$2

PARAMS="{\"ref\":\"$TRAVIS_BRANCH\",\"environment\":\"$TRAVIS_BRANCH\",\"required_contexts\":[],\"transient_environment\":true,\"auto_merge\":false}"
DEPLOYMENT_ID=$(curl -H "Accept: application/vnd.github.ant-man-preview+json" -H "Authorization: token $GH_TOKEN" -d $PARAMS "https://api.github.com/repos/$TRAVIS_REPO_SLUG/deployments" | jq ".id")
curl -H "Accept: application/vnd.github.ant-man-preview+json" -H "Authorization: token $GH_TOKEN" -d '{"state":"'$STATE'","environment_url":"'$URL'"}' "https://api.github.com/repos/$TRAVIS_REPO_SLUG/deployments/$DEPLOYMENT_ID/statuses"
