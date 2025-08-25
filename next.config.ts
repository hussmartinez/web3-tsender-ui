import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: false
  },
  basePath: "",
  assetPrefix: "./",
  trailingSlash: true
};

export default nextConfig;
