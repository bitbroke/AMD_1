import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone",
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
} satisfies Record<string, unknown>;

export default nextConfig as NextConfig;
