FROM node:alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global \
    PATH=$PATH:/home/node/.npm-global/bin \
    NODE_PATH=/home/node/.npm-global/lib/node_modules/

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3000
ENV API_KEY=''

EXPOSE 3000

ENTRYPOINT ['node', '--input-type=module', 'server.js']