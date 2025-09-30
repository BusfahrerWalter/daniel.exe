# =========================================================================================
#                                          Builder
# =========================================================================================
FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN [ -f package-lock.json ] && npm ci || npm i
RUN npm run build

# =========================================================================================
#                                          Runner
# =========================================================================================
FROM node:alpine as runner

WORKDIR /app
EXPOSE 3000

COPY --from=builder /app/dist .
COPY --from=builder /app/.env .

CMD ["node", "index.js"]