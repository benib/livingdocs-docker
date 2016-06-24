FROM node:4
MAINTAINER Livingdocs <dev@livingdocs.io>

RUN apt-get update && apt-get upgrade -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --force-yes --no-install-recommends \
    jq nginx && \
    apt-get autoremove -y && apt-get clean && \
    rm -Rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Add dumb-init to correctly handle signals sent to the main process
ADD node_modules/@livingdocs/docker/editor/bin/dumb-init /sbin/dumb-init

COPY node_modules/@livingdocs/docker/editor/nginx.conf /etc/nginx/nginx.conf

# Add files required for installing dependencies
WORKDIR /app
ADD package.json /app/package.json
ADD npm-shrinkwrap.json /app/npm-shrinkwrap.json
ADD .npmrc /app/.npmrc

RUN npm install -s -g npm@"$(jq -r '.engines.npm' package.json)"
RUN npm install -s -g grunt-cli
RUN npm -s cache clean

EXPOSE 9000

# Run build when requested
ARG RUNBUILD=false
ARG ENVIRONMENT=local
ENV ENVIRONMENT ${ENVIRONMENT:-local}

ADD ./ /app
RUN /app/node_modules/@livingdocs/docker/editor/bin/build-app.sh

ENTRYPOINT  ["/sbin/dumb-init"]
CMD ["npm", "start"]
