import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
