"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundMedia from "@/components/BackgroundMedia";
import { Button } from "@/components/ui/button";

export function Split({ data }: {
  data: {
    title?: string; text?: string; ctaLabel?: string; ctaHref?: string;
    imageSide?: "left"|"right"; darken?: number;
    asset?: { url?: string; mimeType?: string };
  }
}) {
  const left = data.imageSide === "left";
  return (
    <section className="relative bg-black">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8 px-6 py-20">
        <div className={`relative min-h-[360px] rounded-2xl overflow-clip ring-1 ring-white/10 order-2 ${left ? "md:order-1" : ""}`}>
          <BackgroundMedia asset={data.asset} />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <motion.div
          className={`flex flex-col justify-center gap-4 order-1 ${left ? "md:order-2" : ""}`}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}
        >
          {data.title && <h3 className="text-3xl font-semibold">{data.title}</h3>}
          {data.text && <p className="text-zinc-300">{data.text}</p>}
          {data.ctaLabel && (
            <div className="pt-2">
              <Button asChild variant="outline"><Link href={data.ctaHref || "/contacto"}>{data.ctaLabel}</Link></Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
