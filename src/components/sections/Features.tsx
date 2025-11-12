"use client";
import { motion } from "framer-motion";

export function Features({ data }: { data: { title?: string; items?: {title:string; text:string}[] } }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {data.title && <h3 className="mb-6 text-2xl font-semibold">{data.title}</h3>}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm text-zinc-300">
        {(data.items || []).map((it, i) => (
          <motion.li key={i}
            className="rounded-xl bg-white/3 ring-1 ring-white/10 p-4"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.05 }}
          >
            <p className="font-medium text-white">{it.title}</p>
            <p className="mt-1">{it.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
