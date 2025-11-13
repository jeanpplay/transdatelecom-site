import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Solo lo que realmente usamos (Sanity CDN)
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/files/**" },
    ],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src * data: blob:; media-src * data: blob:;",
  },
};

export default nextConfig;
