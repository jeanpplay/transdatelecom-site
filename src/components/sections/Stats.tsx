"use client";
export function Stats({
  data,
}: { data: { items: { label: string; value: string }[] } }) {
  if (!data?.items?.length) return null;
  return (
    <section className="border-t border-white/5 bg-black">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 sm:grid-cols-4">
        {data.items.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10">
            <div className="text-2xl font-semibold">{s.value}</div>
            <div className="mt-1 text-sm text-zinc-400">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
