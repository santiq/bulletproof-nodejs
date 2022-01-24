FROM node:lts-alpine as builder

COPY . /app

RUN yarn install

RUN yarn build

FROM node:lts-alpine

ENV NODE_ENV production
COPY --from=builder /app/ /app

RUN yarn install

CMD [ "yarn", "start" ]
