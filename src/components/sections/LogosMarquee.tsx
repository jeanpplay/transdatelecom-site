"use client";
import Image from "next/image";

export function LogosMarquee({
  data,
}: {
  data: { title?: string; logos: { url?: string; src?: string; alt?: string }[] };
}) {
  // Normaliza: acepta {url} o {src}
  const logos = (data?.logos ?? [])
    .map((l) => ({ src: l.url ?? l.src ?? "", alt: l.alt || "logo" }))
    .filter((l) => !!l.src);

  if (!logos.length) return null;

  return (
    <section className="relative border-t border-white/5 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {data.title && (
          <h3 className="mb-6 text-center text-sm font-medium text-zinc-400">
            {data.title}
          </h3>
        )}

        <div className="group relative overflow-hidden">
          {/* fades laterales */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />

          {/* carrusel infinito */}
          <div className="flex animate-[marquee_28s_linear_infinite] gap-12 will-change-transform hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((l, i) => (
              <div key={`${l.src}-${i}`} className="shrink-0 opacity-80 transition-opacity hover:opacity-100">
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={160}
                  height={40}
                  sizes="160px"
                  className="h-8 w-auto object-contain"
                  priority={i < 6}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
