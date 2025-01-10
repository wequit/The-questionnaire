import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Оставляем строгий режим React
  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ошибки ESLint при сборке
  },
  typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки TypeScript при сборке
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
