ARG BUN_VERSION=1.2.11
ARG NODE_VERSION=22

################################################################################
# Use node image for base image for all stages.

FROM imbios/bun-node:${BUN_VERSION}-${NODE_VERSION}-slim AS base
 
# Set working directory for all build stages.
WORKDIR /usr/src/app

FROM oven/bun:${BUN_VERSION} AS releasebase

# RUN apt-get update -qq \
#     && apt-get install -qq --no-install-recommends nginx \
#     && apt-get clean

################################################################################
# install dependencies into temp directory
# this will cache them and speed up future builds

FROM base AS install

ARG GITLAB_NPM_TOKEN

RUN mkdir -p /temp/dev
COPY package.json bun.lock bunfig.toml /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile --ignore-scripts

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock bunfig.toml /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production --ignore-scripts

################################################################################
# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ARG ORIGIN
ARG AUTH_SECRET
ARG AUTH_ADAPTER_AUTHENTIK_CLIENT_ID
ARG AUTH_ADAPTER_AUTHENTIK_CLIENT_SECRET
ARG AUTH_ADAPTER_AUTHENTIK_URL_AUTHORIZATION
ARG AUTH_ADAPTER_AUTHENTIK_URL_ISSUER
ARG AUTH_ADAPTER_AUTHENTIK_URL_ENDSESSION
ARG AUTH_ADAPTER_AUTHENTIK_URL_WELLKNOWN
ARG AUTH_ADAPTER_LDAP_URL
ARG IRIS_URL_GRAPHQL
ARG IRIS_URL_PDF

RUN bun run prisma db push

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build
 
################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.

FROM releasebase AS release

WORKDIR /usr/src/app

# Use production node environment by default.
ENV NODE_ENV=production
 
# Run the application as a non-root user.
# USER bun

# Copy package.json so that package manager commands can be used.
COPY package.json .
 
# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
# COPY --from=install /temp/prod/node_modules ./node_modules
COPY --from=install /temp/dev/node_modules ./node_modules
COPY --from=prerelease /usr/src/app/dist ./dist
COPY --from=prerelease /usr/src/app/server ./server
COPY --from=prerelease /usr/src/app/prisma ./prisma

RUN bun run prisma db push

# Expose the port that the application listens on.
EXPOSE 8080

STOPSIGNAL SIGQUIT
 
# Run the application.
CMD [ "bun", "run", "server/entry.bun.js" ]
