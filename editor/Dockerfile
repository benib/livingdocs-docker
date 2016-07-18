# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten

FROM node:4
MAINTAINER Livingdocs <dev@livingdocs.io>

RUN apt-get update && apt-get upgrade -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --force-yes --no-install-recommends \
    jq nginx && \
    apt-get autoremove -y && apt-get clean && \
    rm -Rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy dumb-init to correctly handle signals sent to the main process
COPY docker/dumb-init /sbin/dumb-init

COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy files required for installing dependencies
WORKDIR /app
COPY package.json /app/package.json
COPY .npmrc /app/.npmrc

ENV NPM_CONFIG_LOGLEVEL silent
RUN npm install -g npm@"$(jq -r '.engines.npm' package.json)"
RUN npm install -g grunt-cli
RUN npm install
RUN npm cache clean

EXPOSE 9000

# The build can be skipped if you want to start the webpack
# dev server instead of serving static assets with nginx
ARG SKIP_BUILD=false
ARG ENVIRONMENT=local
ENV ENVIRONMENT ${ENVIRONMENT:-local}
ENV PATH /app/node_modules/.bin:$PATH

COPY ./ /app
RUN docker/build-app.sh

ENTRYPOINT  ["/sbin/dumb-init"]
CMD ["nginx"]
