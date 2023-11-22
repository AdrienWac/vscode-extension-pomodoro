FROM node:18 as base

WORKDIR /home/node/app

USER root

RUN apt update && apt install sudo

COPY package*.json ./

COPY . .