FROM node:13

MAINTAINER Daniel Tiringer

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 5000

CMD ["npm", "start"]
