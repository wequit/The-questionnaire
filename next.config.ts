import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ky/court/1',
        permanent: true,  
      },
    ];
  },
};

export default nextConfig;
