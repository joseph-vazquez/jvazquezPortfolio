/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['media1.giphy.com', 'media3.giphy.com'],
  },
  output: 'export',
  distDir: 'dist',
  assetPrefix: '',
  // For Firebase hosting
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig