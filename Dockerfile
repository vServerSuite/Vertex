FROM mhart/alpine-node:12.18.0 AS build-env
ADD . /
WORKDIR /bot

RUN yarn install --frozen-lockfile

FROM gcr.io/distroless/nodejs
COPY --from=build-env /bot /bot
WORKDIR /bot
CMD ["index.js"]