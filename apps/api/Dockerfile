# Build context: monorepo root
FROM oven/bun:1 AS builder
WORKDIR /app
# nest CLI uses #!/usr/bin/env node; alias bun so that shebang resolves
RUN ln -sf $(which bun) /usr/local/bin/node
COPY . .
RUN bun install
RUN cd apps/api && bunx prisma generate
RUN cd apps/api && bun /app/node_modules/@nestjs/cli/bin/nest.js build

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
# Root node_modules (.bun/ store lives here) + workspace-local symlinks
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
# Built output and prisma schema
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
# Internal packages at their original paths (workspace symlinks point here)
COPY --from=builder /app/packages/shared ./packages/shared
COPY --from=builder /app/packages/financial-model ./packages/financial-model
COPY --from=builder /app/packages/sizing-engine ./packages/sizing-engine
COPY --from=builder /app/packages/zod-schemas ./packages/zod-schemas
WORKDIR /app/apps/api
EXPOSE 3001
CMD ["bun", "dist/main.js"]
