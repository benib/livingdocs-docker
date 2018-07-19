# This file is managed with https://github.com/livingdocsIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten
FROM node:8-alpine

RUN apk add --no-cache jq bash git tini

# Copy files required for installing dependencies
WORKDIR /app
COPY package.json /app/package.json
COPY .npmrc /app/.npmrc

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH
ENV ENVIRONMENT local
EXPOSE 9999
COPY ./ /app

ENTRYPOINT ["/sbin/tini", "-g", "--"]
CMD ["npm", "start"]
