FROM node:24-alpine
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD [ "node", "src/index.js" ]