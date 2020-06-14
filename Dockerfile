FROM mhart/alpine-node:12.18.0 AS build-env
ADD bot /vertex
WORKDIR /vertex

RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:12.18.0
COPY --from=build-env /vertex /vertex
WORKDIR /vertex
ADD config/config.example.json config/config.json
CMD node src/index.js
