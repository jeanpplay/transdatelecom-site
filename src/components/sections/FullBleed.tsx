"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BackgroundMedia from "@/components/BackgroundMedia";

// Tipos
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
    darken?: number | boolean; // ← puede venir boolean en Sanity
    asset?: Asset;             // ← {image, video, poster} o string/url
  };
}) {
  const align = data.align ?? "center";

  // Si viene boolean, lo convertimos a un valor razonable
  const baseDarken =
    typeof data.darken === "number" ? data.darken : data.darken ? 0.35 : 0.28;

  // Limitar para que nunca “mate” la foto
  const top = Math.min(baseDarken + 0.15, 0.45);
  const mid = Math.max(baseDarken - 0.10, 0.10);
  const bot = Math.min(baseDarken + 0.25, 0.65);

  const alignClasses =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  // Normalizar asset: si es string -> { url }
  const media: Asset | undefined =
    typeof data.asset === "string" ? { url: data.asset } : data.asset;

  return (
    <section className="relative min-h-[88svh] overflow-clip">
      {/* Fondo (queda por debajo) */}
      <div className="absolute inset-0 z-0">
        <BackgroundMedia asset={media} priority />
      </div>

      {/* Overlay: que NO bloquee interacciones y no tape por completo */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(0,0,0,${top}) 0%,
            rgba(0,0,0,${mid}) 50%,
            rgba(0,0,0,${bot}) 100%
          )`,
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
