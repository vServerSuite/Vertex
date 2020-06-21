FROM mhart/alpine-node:12.18.0 AS build-env
ADD bot /vertex

WORKDIR /vertex

RUN cp /vertex/config/config.example.json /vertex/config.example.json
RUN cp /vertex/config/database.example.json /vertex/database.example.json

RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:12.18.0

RUN npm install -g sequelize-cli
COPY --from=build-env /vertex /vertex
WORKDIR /vertex

CMD ["sh", "/vertex/entrypoint.sh"]
