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
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/next.config.ts ./apps/web/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/ui ./node_modules/@pricing-ai/ui
COPY --from=builder /app/packages/shared ./node_modules/@pricing-ai/shared
COPY --from=builder /app/packages/tokens ./node_modules/@pricing-ai/tokens
COPY --from=builder /app/packages/zod-schemas ./node_modules/@pricing-ai/zod-schemas
WORKDIR /app/apps/web
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["bun", "run", "start"]
