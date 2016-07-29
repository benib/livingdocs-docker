# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten

FROM mhart/alpine-node:4
MAINTAINER Livingdocs <dev@livingdocs.io>

RUN apk add --no-cache jq bash build-base python imagemagick postgresql

# Copy dumb-init to correctly handle signals sent to the main process
COPY docker/dumb-init /sbin/dumb-init

# Copy files required for installing dependencies
WORKDIR /app
COPY package.json /app/package.json
COPY .npmrc /app/.npmrc

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g npm@"$(jq -r '.engines.npm' package.json)"
RUN npm install -g grunt-cli
RUN npm install
RUN npm cache clean

ENV PATH /app/node_modules/.bin:$PATH
ENV ENVIRONMENT local
EXPOSE 9090
COPY ./ /app

ENTRYPOINT ["/sbin/dumb-init"]
CMD ["node", "index.js"]
