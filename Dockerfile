ARG NODE_IMAGE_VERSION=13-alpine

FROM node:$NODE_IMAGE_VERSION

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile && npm test

WORKDIR /integration-tests

RUN npm install && npm run compile

RUN adduser -u 2004 -D docker
RUN mv /integration-tests/docs /  && chown -R docker:docker /docs

WORKDIR /src

CMD ["node", "/integration-tests/dist/index.js"]
