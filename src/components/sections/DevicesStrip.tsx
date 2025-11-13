"use client";
import BackgroundMedia from "@/components/BackgroundMedia";

export function DevicesStrip({
  data,
}: {
  data: {
    title?: string;
    subtitle?: string;
    items: Array<
      {
        title?: string;
        // puede venir como asset o como campos sueltos
        asset?: string | { image?: string; video?: string; poster?: string } | { url?: string; mimeType?: string };
        image?: string;
        video?: string;
        poster?: string;
        url?: string;
        mimeType?: string;
      }
    >;
  };
}) {
  if (!data?.items?.length) return null;

  return (
    <section className="relative border-t border-white/5 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {data.title && <h3 className="text-3xl font-semibold mb-2">{data.title}</h3>}
        {data.subtitle && <p className="text-zinc-300 mb-6">{data.subtitle}</p>}

        <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex snap-x snap-mandatory gap-6">
            {data.items.map((it, i) => {
              const asset =
                it.asset ??
                (it.image || it.video || it.poster
                  ? { image: it.image, video: it.video, poster: it.poster }
                  : it.url
                  ? { url: it.url, mimeType: it.mimeType }
                  : undefined);

              return (
                <li
                  key={i}
                  className="relative h-64 w-[420px] shrink-0 snap-start overflow-clip rounded-2xl ring-1 ring-white/10"
                >
                  <BackgroundMedia asset={asset} />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/20" />
                  {it.title && <div className="absolute bottom-3 left-4 z-20 text-sm font-medium">{it.title}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
