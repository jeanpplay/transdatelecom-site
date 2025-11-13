"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTABanner({
  data,
}: {
  data: { title: string; subtitle?: string; ctaLabel?: string; ctaHref?: string };
}) {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border)]">
      {/* Fondo azul más claro que el layout base */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            linear-gradient(
              180deg,
              color-mix(in oklab, var(--background) 70%, white 30%) 0%,
              color-mix(in oklab, var(--background) 80%, white 20%) 50%,
              color-mix(in oklab, var(--background) 90%, white 10%) 100%
            )
          `,
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h3 className="text-3xl font-semibold">{data.title}</h3>
        {data.subtitle && (
          <p className="mt-2 text-[var(--muted-foreground)]">{data.subtitle}</p>
        )}
        {data.ctaLabel && (
          <div className="mt-6">
            <Button asChild size="lg" className="btn-acc">
              <Link href={data.ctaHref || "/contacto"}>{data.ctaLabel}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
