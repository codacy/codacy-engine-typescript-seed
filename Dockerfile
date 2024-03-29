FROM node:16-alpine

WORKDIR /workdir

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile && npm test && npm pack

WORKDIR /workdir/integration-tests

RUN npm install && npm run compile

RUN adduser -u 2004 -D docker
RUN mv docs /  && chown -R docker:docker /docs

WORKDIR /src

CMD ["node", "/workdir/integration-tests/dist/index.js"]
