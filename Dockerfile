# ---------------------
# Base (PNPM + Node)
# ---------------------
FROM docker.arvancloud.ir/node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm@10.8.0

# ---------------------
# Dependencies
# ---------------------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------------------
# Builder
# ---------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true

RUN pnpm build

# ---------------------
# Runner
# ---------------------
FROM docker.arvancloud.ir/node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
