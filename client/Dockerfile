# =========================================================================================
#                                          Builder
# =========================================================================================
FROM node:alpine AS builder

ARG API_URL
ENV API_URL=${API_URL}

WORKDIR /app

COPY . .

RUN [ -f package-lock.json ] && npm ci || npm i
RUN npm run build

# =========================================================================================
#                                          Runner
# =========================================================================================
FROM node:alpine AS runner

WORKDIR /app
EXPOSE 3000

COPY --from=builder /app/.output ./.output

CMD ["node", ".output/server/index.mjs"]