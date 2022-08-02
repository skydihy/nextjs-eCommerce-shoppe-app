# ----------------- STAGE 1
FROM node:alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR "/app"
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ----------------- STAGE 2
FROM node:alpine AS builder
WORKDIR "/app"
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

# ----------------- STAGE 3
FROM node:alpine AS runner
WORKDIR "/app"

ENV NODE_ENV development

COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]