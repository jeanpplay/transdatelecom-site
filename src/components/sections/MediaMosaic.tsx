"use client";
import BackgroundMedia from "@/components/BackgroundMedia";

export function MediaMosaic({
  data,
}: {
  data: { items: { asset?: any }[]; darken?: number; title?: string; subtitle?: string };
}) {
  const items = (data?.items || []).slice(0, 4);
  if (!items.length) return null;
  const overlay = typeof data.darken === "number" ? data.darken : 0.25;

  return (
    <section className="relative bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {data.title && <h3 className="text-3xl font-semibold mb-2">{data.title}</h3>}
        {data.subtitle && <p className="text-zinc-300 mb-6">{data.subtitle}</p>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((it, i) => (
            <div key={i} className="relative aspect-[16/10] overflow-clip rounded-2xl ring-1 ring-white/10">
              <BackgroundMedia asset={it.asset} />
              <div
                className="absolute inset-0 z-[1]"
                style={{ background: `linear-gradient(180deg, rgba(0,0,0,${overlay}) 0%, rgba(0,0,0,${overlay+0.05}) 100%)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
