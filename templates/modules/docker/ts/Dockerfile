FROM node:24-alpine
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* tsconfig.json ./
RUN pnpm install

COPY . .
RUN pnpm build

ENV NODE_ENV=production
EXPOSE 3000

CMD [ "node", "dist/index.js" ]