import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Use the OS trust store for HTTPS so Turbopack can fetch Google Fonts
  // through corporate proxies / AV that inject their own root CA.
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },

  // Image domain whitelist (for future OG images hosted on CDN)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloneos.io',
      },
    ],
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
