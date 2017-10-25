# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten
FROM node:8-alpine

RUN apk add --no-cache jq bash build-base git python nginx curl chromium

RUN adduser -s /bin/sh -u 82 -D -S -G www-data www-data
COPY docker/fix-permissions.sh /usr/local/bin/fix-permissions.sh
COPY docker/dumb-init /sbin/dumb-init
COPY docker/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app
COPY ./bin /app/bin
RUN /usr/local/bin/fix-permissions.sh /app

USER www-data
EXPOSE 9000
ENV PATH /app/node_modules/.bin:$PATH
ENV NPM_CONFIG_LOGLEVEL warn

# Copy files required for installing dependencies
COPY package.json /app/package.json
COPY .npmrc /app/.npmrc

RUN npm install

USER root
COPY ./ /app
RUN /usr/local/bin/fix-permissions.sh
USER www-data

# The build can be skipped if you want to start the webpack
# dev server instead of serving static assets with nginx
ARG SKIP_BUILD=false
RUN docker/build-app.sh

ENV ENVIRONMENT local

ENTRYPOINT  ["/sbin/dumb-init"]
CMD ["./docker/build-environment.sh", "nginx"]
