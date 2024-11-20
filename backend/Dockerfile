# Development
FROM node:22-alpine AS dev

RUN apk add --no-cache libc6-compat
RUN apk update
RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

USER root
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY package*.json ./
RUN npm ci

USER nestjs

# Production Build
FROM node:22-alpine AS build

RUN apk add --no-cache libc6-compat
RUN apk update
RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

USER root
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --chown=node:node --from=dev /app/node_modules /app/node_modules

COPY --chown=node:node . .

RUN npm run build && \
    npm ci --omit=dev && \
    npm cache clean --force

USER nestjs

# Production Server
FROM node:22-alpine AS prod

RUN apk add --no-cache libc6-compat
RUN apk update
RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

USER root
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --chown=nestjs:nodejs --from=build /app/_output /app/_output
COPY --chown=nestjs:nodejs --from=build /app/node_modules /app/node_modules

USER nestjs

CMD [ "node", "_output/main.js" ]
