# Build context: monorepo root
FROM oven/bun:1 AS builder
WORKDIR /app
COPY . .
RUN bun install
ARG NEXT_PUBLIC_APP_URL=https://pricingai.metcoredigitech.com
ARG NEXT_PUBLIC_API_URL=https://pricingai.metcoredigitech.com/nest
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN cd apps/web && bun run build

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Root node_modules (.bun/ store lives here) + workspace-local symlinks
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
# Built output and config
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/next.config.ts ./apps/web/
# Internal packages at their original paths (workspace symlinks point here)
COPY --from=builder /app/packages/ui ./packages/ui
COPY --from=builder /app/packages/shared ./packages/shared
COPY --from=builder /app/packages/tokens ./packages/tokens
COPY --from=builder /app/packages/zod-schemas ./packages/zod-schemas
WORKDIR /app/apps/web
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["bun", "run", "start"]
