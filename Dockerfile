FROM mhart/alpine-node:12.18.0 AS build-env
ADD bot /app
WORKDIR /app

RUN yarn install --frozen-lockfile

FROM gcr.io/distroless/nodejs

RUN npm i -g @babel/node

COPY --from=build-env /app /app
WORKDIR /app
CMD babel-node src/index.js
