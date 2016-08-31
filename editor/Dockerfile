# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten

FROM mhart/alpine-node:4
MAINTAINER Livingdocs <dev@livingdocs.io>

RUN apk add --no-cache jq bash build-base git python nginx curl
RUN curl -Ls "https://github.com/dustinblackman/phantomized/releases/download/2.1.1/dockerized-phantomjs.tar.gz" | tar xz -C /

RUN addgroup -g 82 -S www-data
RUN adduser -u 82 -D -S -G www-data www-data

# Copy dumb-init to correctly handle signals sent to the main process
COPY docker/dumb-init /sbin/dumb-init

COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy files required for installing dependencies
WORKDIR /app
COPY package.json /app/package.json
COPY .npmrc /app/.npmrc

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install -g npm@"$(jq -r '.engines.npm' package.json)"
RUN npm install -g grunt-cli
RUN npm install
RUN npm cache clean

EXPOSE 9000

COPY ./ /app
RUN docker/build-app.sh

# The build can be skipped if you want to start the webpack
# dev server instead of serving static assets with nginx
ARG SKIP_BUILD=false
ENV ENVIRONMENT local
ENV PATH /app/node_modules/.bin:$PATH

ENTRYPOINT  ["/sbin/dumb-init"]
CMD ["./docker/build-environment.sh", "nginx"]
