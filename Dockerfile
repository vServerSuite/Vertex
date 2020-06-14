FROM mhart/alpine-node:12.18.0 AS build-env
ADD bot /vertex
WORKDIR /vertex

RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:12.18.0
COPY --from=build-env /vertex /vertex
WORKDIR /vertex

RUN cp /vertex/config/config.example.json /vertex/config/config.json
RUN rm /vertex/config/config.example.json

CMD node src/index.js
