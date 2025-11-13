import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite cargar imágenes de Sanity (CDN)
    remotePatterns: [{ protocol: "https", hostname: "**.sanity.io" }],
  },
};

export default nextConfig;
