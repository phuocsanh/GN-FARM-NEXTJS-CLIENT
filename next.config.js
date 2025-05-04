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
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bizweb.dktcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets2.htv.com.vn',
        port: '',
        pathname: '/Images/**',
      },
    ],
  },
  // Add React strict mode
  reactStrictMode: true,
  // Add TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
  // Add ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 