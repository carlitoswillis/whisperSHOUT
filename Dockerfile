FROM node:latest

WORKDIR usr/src/app
COPY package*.json ./

RUN  npm install
RUN  npm install nodemon
RUN  npm install -g grunt-cli
RUN  apt update
RUN  apt install nano

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["grunt"]
