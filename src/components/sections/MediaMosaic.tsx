"use client";
import BackgroundMedia from "@/components/BackgroundMedia";

export function MediaMosaic({
  data,
}: {
  data: {
    title?: string;
    subtitle?: string;
    darken?: number;
    items: Array<{
      asset?: any;
      image?: string;
      video?: string;
      poster?: string;
      url?: string;
      mimeType?: string;
    }>;
  };
}) {
  if (!data?.items?.length) return null;

  const overlay = typeof data.darken === "number" ? data.darken : 0.15;

  return (
    <section className="relative bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {data.title && <h3 className="text-3xl font-semibold mb-2">{data.title}</h3>}
        {data.subtitle && <p className="text-zinc-300 mb-6">{data.subtitle}</p>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.items.map((it, i) => {
            const asset =
              it.asset ??
              (it.image || it.video || it.poster
                ? { image: it.image, video: it.video, poster: it.poster }
                : it.url
                ? { url: it.url, mimeType: it.mimeType }
                : undefined);

            return (
              <div key={i} className="relative aspect-[16/10] overflow-clip rounded-2xl ring-1 ring-white/10">
                <BackgroundMedia asset={asset} />
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,${overlay}) 0%, rgba(0,0,0,0.2) 100%)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
