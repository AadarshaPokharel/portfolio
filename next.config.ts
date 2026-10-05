import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a minimal self-contained server in .next/standalone,
  // which keeps the Docker image small (see Dockerfile).
  output: "standalone",
};

export default nextConfig;
