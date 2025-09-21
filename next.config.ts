/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['media1.giphy.com', 'media3.giphy.com'],
  },
  output: 'export',
  distDir: 'out'
}

module.exports = nextConfig