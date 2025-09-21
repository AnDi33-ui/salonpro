/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disabling on production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Attenzione: Solo per build rapidi, non per produzione ideale
    ignoreBuildErrors: false,
  },
  
  // Performance optimizations
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Vercel-specific optimizations
  output: 'standalone',
  
  experimental: {
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],
      },
    },
  },
}

module.exports = nextConfig