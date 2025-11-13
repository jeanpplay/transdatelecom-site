"use client";
import BackgroundMedia from "@/components/BackgroundMedia";

type ItemFromGroq =
  | {
      title?: string;
      // cuando el GROQ devuelve campos planos:
      image?: string;
      poster?: string;
      video?: string;
      // o cuando guardaste todo en "asset":
      asset?: string | { image?: string; video?: string; poster?: string } | { url?: string };
    }
  | undefined;

export function DevicesStrip({
  data,
}: {
  data: {
    title?: string;
    subtitle?: string;
    items: ItemFromGroq[];
  };
}) {
  if (!data?.items?.length) return null;

  return (
    <section className="relative border-t border-white/5 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {data.title && <h3 className="mb-2 text-3xl font-semibold">{data.title}</h3>}
        {data.subtitle && <p className="mb-6 text-zinc-300">{data.subtitle}</p>}

        <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex snap-x snap-mandatory gap-6">
            {data.items.map((it, i) => {
              // 🔑 Unificamos forma del asset:
              const media =
                it?.asset ??
                (it?.image || it?.video || it?.poster
                  ? { image: it?.image, video: it?.video, poster: it?.poster }
                  : undefined);

              return (
                <li
                  key={i}
                  className="relative h-64 w-[420px] shrink-0 snap-start overflow-hidden rounded-2xl ring-1 ring-white/10"
                >
                  {/* padre relative (ya lo es) + hijo absolute en BackgroundMedia */}
                  <BackgroundMedia asset={media} alt={it?.title || ""} />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/20" />
                  {it?.title && (
                    <div className="absolute bottom-3 left-4 z-20 text-sm font-medium">
                      {it.title}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
