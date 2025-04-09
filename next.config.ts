import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverRuntimeConfig: {
    maxDuration: 20,
  }
};

export default nextConfig;
