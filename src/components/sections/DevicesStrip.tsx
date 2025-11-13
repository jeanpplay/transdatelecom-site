"use client";
import { useEffect, useRef, useState } from "react";
import BackgroundMedia from "@/components/BackgroundMedia";

type DeviceItem = {
  title?: string;
  asset?:
    | string
    | { image?: string; video?: string; poster?: string }
    | { url?: string; mimeType?: string };
  image?: string;
  video?: string;
  poster?: string;
  url?: string;
  mimeType?: string;
};

export function DevicesStrip({
  data,
  auto = true, // ← desactiva auto-scroll pasando auto={false}
  intervalMs = 2800, // ← tiempo entre “saltos” del auto-scroll
}: {
  data: { title?: string; subtitle?: string; items: Array<DeviceItem> };
  auto?: boolean;
  intervalMs?: number;
}) {
  if (!data?.items?.length) return null;

  const trackRef = useRef<HTMLUListElement | null>(null);
  const [paused, setPaused] = useState(false);

  // ancho de una tarjeta + gap (gap-6 = 24px)
  const cardWidth = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector("li") as HTMLLIElement | null;
    const gapPx = 24;
    return (first?.clientWidth ?? 0) + gapPx;
  };

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const dist = cardWidth();
    if (!dist) return;

    el.scrollBy({ left: dir * dist, behavior: "smooth" });

    // loop al final
    const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - dist / 2;
    if (dir === 1 && nearEnd) {
      setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 260);
    }
  };

  // auto-scroll
  useEffect(() => {
    if (!auto) return;
    const el = trackRef.current;
    if (!el) return;

    const id = setInterval(() => {
      if (!paused) scrollByCards(1);
    }, intervalMs);

    return () => clearInterval(id);
  }, [auto, paused, intervalMs]);

  // drag-to-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onDown = (e: PointerEvent) => {
      isDown = true;
      startX = e.clientX;
      scrollStart = el.scrollLeft;
      setPaused(true);
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = scrollStart - dx;
    };
    const onUp = (e: PointerEvent) => {
      isDown = false;
      setPaused(false);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section
      className="relative border-t border-[var(--border)] bg-[var(--card)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        {data.title && <h3 className="mb-2 text-3xl font-semibold">{data.title}</h3>}
        {data.subtitle && (
          <p className="mb-6 text-[var(--muted-foreground)]">{data.subtitle}</p>
        )}

        <div className="relative">
          {/* Gradientes laterales para insinuar scroll (con el color del card) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--card)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--card)] to-transparent" />

          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Dispositivos disponibles"
          >
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
                  className="relative h-64 w-[85vw] max-w-[520px] shrink-0 snap-start overflow-clip rounded-2xl ring-1 ring-[var(--border)] md:w-[520px]"
                >
                  <BackgroundMedia asset={asset} />
                  {/* Un poco más oscuro para integrar con el tema */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--background)]/70 via-[var(--background)]/30 to-[var(--background)]/25" />
                  {it.title && (
                    <div className="absolute bottom-3 left-4 z-20 text-sm font-medium">
                      {it.title}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Botones de navegación */}
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollByCards(-1)}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[var(--card)]/60 p-2 ring-1 ring-[var(--border)] backdrop-blur hover:bg-[var(--card)]/70 focus:outline-none focus-visible:ring-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-foreground/90">
              <path
                d="M15 6l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => scrollByCards(1)}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[var(--card)]/60 p-2 ring-1 ring-[var(--border)] backdrop-blur hover:bg-[var(--card)]/70 focus:outline-none focus-visible:ring-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-foreground/90">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
