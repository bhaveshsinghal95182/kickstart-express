FROM node:24-alpine AS base
WORKDIR /usr/src/app

RUN npm install -g pnpm


FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod


FROM base AS production
ENV NODE_ENV=production

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD [ "node", "src/index.js" ]