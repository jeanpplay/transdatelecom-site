"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BackgroundMedia from "@/components/BackgroundMedia";

type FileMedia = {
  url?: string;
  mimeType?: string;
  metadata?: { dimensions?: { width: number; height: number } };
};
type StarlinkMedia = { image?: string; video?: string; poster?: string };
type Asset = string | FileMedia | StarlinkMedia;

export function FullBleed({
  data,
}: {
  data: {
    title?: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaHref?: string;
    align?: "left" | "center" | "right";
    darken?: number;
    /** cualquiera de estas dos formas puede venir desde Sanity */
    asset?: Asset;
    image?: string;
    video?: string;
    poster?: string;
  };
}) {
  const align = data.align ?? "center";
  const overlay = typeof data.darken === "number" ? data.darken : 0.35;

  const alignClasses =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  // 🔧 Normalizamos: si no viene `asset`, armamos uno con image/video/poster
  let media: Asset | undefined;
  if (data.asset) {
    media = typeof data.asset === "string" ? { url: data.asset } : data.asset;
  } else if (data.image || data.video || data.poster) {
    media = { image: data.image, video: data.video, poster: data.poster };
  }

  return (
    <section className="relative min-h-[88svh] overflow-clip">
      {/* Fondo */}
      {media && <BackgroundMedia asset={media} priority />}

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(180deg,
            rgba(0,0,0,${overlay + 0.2}) 0%,
            rgba(0,0,0,${overlay}) 50%,
            rgba(0,0,0,${overlay + 0.3}) 100%)`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-[2] mx-auto grid max-w-6xl px-6 py-28">
        <motion.div
          className={`flex w-full flex-col gap-4 ${alignClasses}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {data.title && (
            <h2 className="text-4xl md:text-5xl font-semibold">{data.title}</h2>
          )}
          {data.subtitle && (
            <p className="max-w-3xl text-zinc-300 md:text-lg">
              {data.subtitle}
            </p>
          )}
          {data.ctaLabel && (
            <div className="mt-4">
              <Button asChild size="lg">
                <Link href={data.ctaHref || "/contacto"}>{data.ctaLabel}</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
