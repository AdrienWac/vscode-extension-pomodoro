FROM node:18 as base

WORKDIR /home/node/app

USER root

RUN apt update && apt install sudo

COPY pomodorotimer/* .

FROM base as dev

RUN npm i -g npm && npm i -g yo generator-code

FROM base as build

RUN npm run compile

