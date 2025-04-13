import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zfpit09ze7.ufs.sh",
      }
    ]
  }
};

export default nextConfig;
