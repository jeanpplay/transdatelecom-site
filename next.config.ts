import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 🔐 Permitir exactamente los hosts que usamos en producción
    remotePatterns: [
      // Sanity CDN (imágenes y archivos)
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/files/**" },

      // (opcional) si usas imágenes externas como Unsplash, etc.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    // Para que logos SVG (si los subes como svg) funcionen con next/image
    dangerouslyAllowSVG: true,
    // Política laxa para imágenes remotas/inline
    contentSecurityPolicy:
      "default-src 'self'; img-src * data: blob:; media-src * data: blob:;",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
