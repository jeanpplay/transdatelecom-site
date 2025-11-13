"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTABanner({
  data,
}: { data: { title: string; subtitle?: string; ctaLabel?: string; ctaHref?: string } }) {
  return (
    <section className="relative border-y border-white/5 bg-gradient-to-t from-white/[0.02] to-transparent">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h3 className="text-3xl font-semibold">{data.title}</h3>
        {data.subtitle && <p className="mt-2 text-zinc-300">{data.subtitle}</p>}
        {data.ctaLabel && (
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href={data.ctaHref || "/contacto"}>{data.ctaLabel}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
