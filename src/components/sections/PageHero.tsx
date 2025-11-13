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
  darken = 0.32, // un poco más claro
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
        <div
          className="
            absolute inset-0 z-0
            [&>img]:absolute [&>img]:inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover
            [&>video]:absolute [&>video]:inset-0 [&>video]:h-full [&>video]:w-full [&>video]:object-cover
          "
        >
          <BackgroundMedia asset={media} />
        </div>
      )}

      {/* Overlay principal (ligeramente más claro) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(180deg,
            rgba(5,10,18,${Math.min(darken + 0.10, 0.85)}) 0%,
            rgba(5,10,18,${darken}) 45%,
            rgba(5,10,18,${darken}) 100%)`,
        }}
      />

      {/* Glow morado sutil */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(60%_28%_at_50%_0%,rgba(124,58,237,.18),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className={center === "center" ? "text-center" : "max-w-2xl"}>
          <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-lg text-[var(--muted-foreground)]">
              {subtitle}
            </p>
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
