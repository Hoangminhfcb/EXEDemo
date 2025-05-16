import type { NextConfig } from "next";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7168",
        pathname: "/api/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
