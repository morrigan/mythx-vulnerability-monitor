FROM node:carbon-alpine

WORKDIR /usr/app

# Install node dependencies - done in a separate step so Docker can cache it.
COPY yarn.lock .
COPY package.json .

RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn run compile

RUN chown -R node: .

USER node
