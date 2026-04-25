# Build context: monorepo root
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY packages/financial-model/package.json ./packages/financial-model/
COPY packages/shared/package.json ./packages/shared/
COPY packages/sizing-engine/package.json ./packages/sizing-engine/
COPY packages/tokens/package.json ./packages/tokens/
COPY packages/zod-schemas/package.json ./packages/zod-schemas/
RUN bun install

FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN cd apps/api && /app/node_modules/.bin/nest build

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
# Place workspace packages directly in node_modules to avoid symlink issues
COPY --from=builder /app/packages/shared ./node_modules/@pricing-ai/shared
COPY --from=builder /app/packages/financial-model ./node_modules/@pricing-ai/financial-model
COPY --from=builder /app/packages/sizing-engine ./node_modules/@pricing-ai/sizing-engine
COPY --from=builder /app/packages/zod-schemas ./node_modules/@pricing-ai/zod-schemas
COPY --from=builder /app/apps/api/prisma ./prisma
EXPOSE 3001
CMD ["bun", "dist/main.js"]
