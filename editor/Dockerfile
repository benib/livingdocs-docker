# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten
FROM node:8-alpine

RUN apk add --no-cache jq bash build-base git python nginx curl
RUN curl -Ls "https://github.com/dustinblackman/phantomized/releases/download/2.1.1/dockerized-phantomjs.tar.gz" | tar xz -C /

COPY docker/fix-permissions.sh /usr/libexec/fix-permissions.sh

RUN addgroup -g 82 -S www-data && \
    adduser -u 82 -D -S -G www-data www-data && \
    /usr/libexec/fix-permissions.sh /var/lib/nginx/ && \
    /usr/libexec/fix-permissions.sh /var/log/nginx/

# Copy dumb-init to correctly handle signals sent to the main process
COPY docker/dumb-init /sbin/dumb-init

COPY docker/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

# Copy files required for installing dependencies
COPY package.json /app/package.json
COPY .npmrc /app/.npmrc

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 9000

COPY ./ /app
RUN /usr/libexec/fix-permissions.sh /app

USER www-data

# The build can be skipped if you want to start the webpack
# dev server instead of serving static assets with nginx
ARG SKIP_BUILD=false
RUN docker/build-app.sh

ENV ENVIRONMENT local


ENTRYPOINT  ["/sbin/dumb-init"]
CMD ["./docker/build-environment.sh", "nginx"]
