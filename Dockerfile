FROM node:lts-alpine as builder

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build


FROM node:lts-alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/package.json /app
COPY --from=builder /app/build /app/build

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "serve" ]
