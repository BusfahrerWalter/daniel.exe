# =========================================================================================
#                                          Builder
# =========================================================================================
FROM node:alpine AS builder

ARG LINKEDIN_API_KEY
ENV LINKEDIN_API_KEY=${LINKEDIN_API_KEY}

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

COPY --from=builder /app/dist .

CMD ["node", "index.js"]