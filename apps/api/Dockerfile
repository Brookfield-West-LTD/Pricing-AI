# Build context: monorepo root
FROM oven/bun:1 AS builder
WORKDIR /app
# nest CLI uses #!/usr/bin/env node; alias bun so that shebang resolves
RUN ln -sf $(which bun) /usr/local/bin/node
COPY . .
RUN bun install
RUN cd apps/api && /app/node_modules/.bin/nest build

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
# Place workspace packages directly in node_modules (avoids symlink issues)
COPY --from=builder /app/packages/shared ./node_modules/@pricing-ai/shared
COPY --from=builder /app/packages/financial-model ./node_modules/@pricing-ai/financial-model
COPY --from=builder /app/packages/sizing-engine ./node_modules/@pricing-ai/sizing-engine
COPY --from=builder /app/packages/zod-schemas ./node_modules/@pricing-ai/zod-schemas
COPY --from=builder /app/apps/api/prisma ./prisma
EXPOSE 3001
CMD ["bun", "dist/main.js"]
