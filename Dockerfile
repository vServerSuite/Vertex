FROM mhart/alpine-node:12.18.0 AS build-env
ADD bot /vertex

WORKDIR /vertex

RUN cp config/config.example.json ../config.example.json

RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:12.18.0
COPY --from=build-env /vertex /vertex
WORKDIR /vertex

CMD ["sh", "/vertex/entrypoint.sh"]
