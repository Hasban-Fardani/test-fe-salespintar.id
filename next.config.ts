import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://images.unsplash.com/**"),
      new URL("https://s3.sellerpintar.com/**"),
      new URL("https://placehold.co/**")
    ]
  }
};

export default nextConfig;
