"use client";
import { motion } from "framer-motion";

export function Features({
  data,
}: {
  data: { title?: string; items?: { title: string; text: string }[] };
}) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {data.title && (
        <h3 className="mb-8 text-center text-2xl font-semibold">{data.title}</h3>
      )}

      {/* Centradas y con hover morado */}
      <ul className="flex flex-wrap items-stretch justify-center gap-4 text-sm text-[var(--muted-foreground)]">
        {items.map((it, i) => (
          <motion.li
            key={i}
            className="tile min-w-[240px] max-w-[360px] flex-1 basis-[260px] p-4 text-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="font-medium text-white">{it.title}</p>
            <p className="mt-1">{it.text}</p>
          </motion.li>
        ))}
      </ul>

      {/* Estilos locales para la “pill” con hover morado */}
      <style jsx>{`
        .tile {
          background: color-mix(in oklab, var(--background) 90%, white 10%);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          transition: background-color 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease, transform 0.18s ease;
        }
        .tile:hover {
          background: color-mix(in oklab, var(--primary) 18%, var(--card));
          border-color: color-mix(in oklab, var(--primary) 50%, var(--border));
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
