/** @type {import('next').NextConfig} */

import path from "path";
const __dirname = new URL(".", import.meta.url).pathname;

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./src"),
    };

    return config;
  },
};

export default nextConfig;
