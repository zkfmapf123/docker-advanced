## Build Stage
FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install && npm install -g typescript
COPY . .

RUN npm run build

## Runner Stage
FROM node:16-alpine as runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json .
RUN npm instal --omit=dev
COPY --from=builder /usr/src/app/dist/ ./dist

RUN ls -al

EXPOSE 3000

## Read to Start Mysql
ENTRYPOINT [ "sh", "-c", "sleep 10 && node dist/index.js"]