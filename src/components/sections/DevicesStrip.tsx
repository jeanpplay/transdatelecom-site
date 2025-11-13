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
  speed = 40,       // px/seg para el auto-scroll continuo
}: {
  data: { title?: string; subtitle?: string; items: Array<DeviceItem> };
  speed?: number;
}) {
  if (!data?.items?.length) return null;

  // Duplicamos para tener loop perfecto (…ABCDABCD…)
  const items = [...data.items, ...data.items];

  const trackRef = useRef<HTMLUListElement | null>(null);
  const [paused, setPaused] = useState(false);

  // ---- CONTINUOUS AUTO-SCROLL (marquee) ------------------------------
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();

    const halfWidth = () => el.scrollWidth / 2; // porque duplicamos el contenido

    const tick = (now: number) => {
      const dt = (now - last) / 1000; // segundos
      last = now;

      if (!paused) {
        el.scrollLeft += speed * dt;

        // loop perfecto: cuando pasamos de la mitad, restamos la mitad
        if (el.scrollLeft >= halfWidth()) {
          el.scrollLeft -= halfWidth();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, speed]);

  // ---- DRAG-TO-SCROLL con pointer events ----------------------------
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e: PointerEvent) => {
      isDown = true;
      setPaused(true);
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = startLeft - dx;

      // si arrastramos más allá de la mitad, reajustamos (loop)
      const half = el.scrollWidth / 2;
      if (el.scrollLeft < 0) el.scrollLeft += half;
      else if (el.scrollLeft >= half) el.scrollLeft -= half;
    };
    const onUp = (e: PointerEvent) => {
      isDown = false;
      setPaused(false);
      try { el.releasePointerCapture(e.pointerId); } catch {}
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

  // ---- Botones: nudge manual una tarjeta (y pausar 1s) --------------
  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    setPaused(true);
    // ancho aprox de tarjeta + gap-6 (24px)
    const first = el.querySelector("li") as HTMLLIElement | null;
    const dist = (first?.clientWidth ?? 520) + 24;
    el.scrollBy({ left: dir * dist, behavior: "smooth" });

    // reanuda suave
    window.setTimeout(() => setPaused(false), 1000);
  };

  return (
    <section
      className="relative border-t border-white/5 bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        {data.title && <h3 className="text-3xl font-semibold mb-2">{data.title}</h3>}
        {data.subtitle && <p className="text-zinc-300 mb-6">{data.subtitle}</p>}

        <div className="relative">
          {/* Gradientes laterales */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />

          <ul
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-2
                       [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Dispositivos disponibles"
          >
            {items.map((it, i) => {
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
                  className="relative h-64 w-[85vw] max-w-[520px] shrink-0 overflow-clip rounded-2xl ring-1 ring-white/10 md:w-[520px]"
                >
                  <BackgroundMedia asset={asset} />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/20" />
                  {it.title && (
                    <div className="absolute bottom-3 left-4 z-20 text-sm font-medium">
                      {it.title}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Flechas */}
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => nudge(-1)}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/55 p-2 ring-1 ring-white/10 backdrop-blur
                       hover:bg-black/70 focus:outline-none focus-visible:ring-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-white/90">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => nudge(1)}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/55 p-2 ring-1 ring-white/10 backdrop-blur
                       hover:bg-black/70 focus:outline-none focus-visible:ring-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-white/90">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
