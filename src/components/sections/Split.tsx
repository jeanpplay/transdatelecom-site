"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundMedia from "@/components/BackgroundMedia";
import { Button } from "@/components/ui/button";

type FileMedia = {
  url?: string;
  mimeType?: string;
  metadata?: { dimensions?: { width: number; height: number } };
};
type StarlinkMedia = {
  image?: string;
  video?: string;
  poster?: string;
};
type Asset = string | FileMedia | StarlinkMedia;

export function Split({
  data,
}: {
  data: {
    title?: string;
    text?: string;
    ctaLabel?: string;
    ctaHref?: string;
    imageSide?: "left" | "right";
    darken?: number;
    /** Puede venir como URL, objeto Sanity (url/mimeType) o {image,video,poster} */
    asset?: Asset;
  };
}) {
  const left = data.imageSide === "left";

  const media: Asset | undefined =
    typeof data.asset === "string" ? { url: data.asset } : data.asset;

  return (
    <section className="relative border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-2">
        {/* Tarjeta de media */}
        <div
          className={`relative order-2 min-h-[360px] overflow-clip rounded-2xl ring-1 ring-[var(--border)] ${
            left ? "md:order-1" : ""
          }`}
        >
          {/* Fondo en z-0 */}
          <BackgroundMedia asset={media} />
          {/* Overlay sobre la imagen/video (con tokens del tema) */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--background)]/60 via-[var(--background)]/20 to-[var(--background)]/10" />
        </div>

        {/* Texto */}
        <motion.div
          className={`order-1 flex flex-col justify-center gap-4 ${
            left ? "md:order-2" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {data.title && <h3 className="text-3xl font-semibold">{data.title}</h3>}
          {data.text && <p className="text-[var(--muted-foreground)]">{data.text}</p>}
          {data.ctaLabel && (
            <div className="pt-2">
              <Button asChild variant="outline">
                <Link href={data.ctaHref || "/contacto"}>{data.ctaLabel}</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
