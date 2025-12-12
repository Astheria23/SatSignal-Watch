import type { NextConfig } from "next";

const repositoryName = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "");
const assetBasePath = repositoryName ? `/${repositoryName}` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(assetBasePath
    ? {
        basePath: assetBasePath,
        assetPrefix: assetBasePath,
      }
    : {}),
};

export default nextConfig;
