import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.netlify.app'
      ]
    }
  }
};

export default nextConfig;
