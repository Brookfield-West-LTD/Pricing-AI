import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@pricing-ai/ui',
    '@pricing-ai/shared',
    '@pricing-ai/sizing-engine',
    '@pricing-ai/financial-model',
    '@pricing-ai/zod-schemas',
    '@pricing-ai/tokens',
  ],
}

export default nextConfig
