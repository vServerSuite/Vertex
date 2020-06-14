FROM mhart/alpine-node:12.18.0 AS build-env
ADD bot /vertex
WORKDIR /vertex

RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:12.18.0
COPY --from=build-env /vertex /vertex
WORKDIR /vertex

RUN cp config/config.example.json config/config.json
RUN rm config/config.example.json

CMD node src/index.js
