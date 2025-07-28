FROM node:24-alpine AS builder
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* tsconfig.json ./
RUN pnpm install
COPY . .

RUN pnpm build

RUN pnpm prune --prod

FROM node:24-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "dist/index.js" ]