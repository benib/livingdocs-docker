# This file is managed with https://github.com/upfrontIO/livingdocs-docker
# Local changes are discouraged as they might get overwritten
FROM node:8-alpine

# Workaround for `npm publish` issue where test directories
# are excluded from the published module in npm <v5.5
# We use yarn here as a workaround for some docker file system issue
RUN yarn global add npm@^5.5 && rm -Rf /usr/local/lib/node_modules/npm

RUN apk add --no-cache jq bash build-base git python imagemagick postgresql tini

# Copy files required for installing dependencies
WORKDIR /app
COPY package.json /app/package.json
COPY .npmrc /app/.npmrc

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH
ENV ENVIRONMENT local
EXPOSE 9090
COPY ./ /app

ENTRYPOINT ["/sbin/tini", "-g", "--"]
CMD ["node", "index.js"]
