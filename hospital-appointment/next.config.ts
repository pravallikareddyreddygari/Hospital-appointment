import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
};

export default nextConfig;
