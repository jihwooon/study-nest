FROM node:22-alpine AS dependencies
ARG APP_NAME

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Build stage
FROM dependencies AS build

COPY . .
RUN APP_NAME=$APP_NAME npm run build

# Production stage
FROM node:22-alpine AS prod
ARG APP_NAME

WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN apk update
RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/_output/dist/${APP_NAME}/index.js /app/_output/dist/index.js

CMD ["node", "_output/dist/index.js"]
