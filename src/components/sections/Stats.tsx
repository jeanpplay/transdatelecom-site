"use client";

export function Stats({
  data,
}: {
  data: { items: { label: string; value: string }[] };
}) {
  if (!data?.items?.length) return null;

  return (
    <section className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 sm:grid-cols-4">
        {data.items.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-[var(--border)]"
          >
            <div className="text-2xl font-semibold text-foreground">{s.value}</div>
            <div className="mt-1 text-sm text-[var(--muted-foreground)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
