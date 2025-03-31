/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable service worker
  experimental: {
    workerThreads: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 