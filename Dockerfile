FROM mhart/alpine-node:12.18.0 AS build-env
ADD bot /app
WORKDIR /app

RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:12.18.0
COPY --from=build-env /app /app
WORKDIR /app
CMD node src/index.js
