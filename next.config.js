/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com', 'images.unsplash.com'],
  },
  // Enable experimental app directory if needed
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;