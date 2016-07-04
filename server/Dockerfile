FROM node:4
MAINTAINER Livingdocs <dev@livingdocs.io>

RUN apt-get update && apt-get upgrade -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --force-yes --no-install-recommends \
    curl git vim nano wget netcat-openbsd build-essential ca-certificates lsb-release python-all rlwrap \
    jq imagemagick postgresql-client \
    && apt-get autoremove -y && apt-get clean && \
    rm -Rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Add dumb-init to correctly handle signals sent to the main process
ADD docker/bin/dumb-init /sbin/dumb-init

# Add files required for installing dependencies
WORKDIR /app
ADD package.json /app/package.json
ADD .npmrc /app/.npmrc

RUN npm install -s -g npm@"$(jq -r '.engines.npm' package.json)"
RUN npm install -s -g grunt-cli
RUN npm install -s
RUN npm cache clean -s

ENV ENVIRONMENT local
EXPOSE 9090
ADD ./ /app

ENTRYPOINT ["/sbin/dumb-init"]
CMD ["node", "index.js"]
