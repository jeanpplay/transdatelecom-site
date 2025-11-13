import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Habilita los dominios de Sanity (CDN nuevo y antiguo)
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.sanitycdn.com" },
    ],
    // Para que los logos/medios en SVG se muestren
    dangerouslyAllowSVG: true,
    // Evita descargas forzadas de SVG y otros; render inline
    contentDispositionType: "inline",
    // (opcional) mejores formatos cuando sí se optimiza
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
