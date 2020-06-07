FROM node:12.18.0 AS build-env
ADD ./bot /bot
WORKDIR /bot

RUN npm ci --only=production

FROM gcr.io/distroless/nodejs
COPY --from=build-env /bot /bot
WORKDIR /bot
CMD ["index.js"]