FROM mhart/alpine-node:12.18.0 AS build-env
RUN mkdir /app
ADD bot/ /app
WORKDIR /app

RUN yarn install --frozen-lockfile

FROM gcr.io/distroless/nodejs
COPY --from=build-env /app /app
WORKDIR /app
CMD ["index.js"]
