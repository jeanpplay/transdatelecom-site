// components/sections/CTABanner.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTABanner({
  data,
}: {
  data: { title: string; subtitle?: string; ctaLabel?: string; ctaHref?: string };
}) {
  return (
    <section className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--card)]">
      {/* velos sutiles para profundidad, manteniendo el mismo azul del sitio */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/[0.03] via-transparent to-white/[0.02]" />
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
