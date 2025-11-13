"use client";
import BackgroundMedia from "@/components/BackgroundMedia";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Asset =
  | string
  | { image?: string; video?: string; poster?: string }
  | { url?: string; mimeType?: string };

export function PageHero({
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/contacto",
  asset,
  darken = 0.45, // oscurecido sutil controlable
  center = "center", // "center" | "left"
}: {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  asset?: Asset;
  darken?: number;
  center?: "center" | "left";
}) {
  const media = typeof asset === "string" ? { url: asset } : asset;

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      {/* Fondo full-bleed */}
      {asset && (
        <div className="absolute inset-0 -z-10">
          <BackgroundMedia asset={media} />
        </div>
      )}

      {/* Veil: baja ligeramente la intensidad de la imagen */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `rgb(0 0 0 / ${Math.min(Math.max(darken * 0.5, 0), 0.6)})`,
        }}
      />

      {/* Overlay principal en tonos del tema (var(--background)) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            linear-gradient(
              180deg,
              color-mix(in oklab, var(--background) 82%, black 18%) 0%,
              color-mix(in oklab, var(--background) 90%, black 10%) 48%,
              color-mix(in oklab, var(--background) 96%, black 4%) 100%
            )
          `,
        }}
      />

      {/* Glow superior morado sutil */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_30%_at_50%_0%,rgba(124,58,237,.22),transparent_60%)]" />

      {/* Fades laterales para dar profundidad */}
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-24 bg-gradient-to-r from-[var(--background)]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-24 bg-gradient-to-l from-[var(--background)]/50 to-transparent" />

      {/* Contenido */}
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className={center === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
          <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-lg text-[var(--muted-foreground)]">{subtitle}</p>
          )}
          {ctaLabel && (
            <div className={center === "center" ? "mt-8 flex justify-center" : "mt-8"}>
              <Button asChild className="btn-acc">
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
