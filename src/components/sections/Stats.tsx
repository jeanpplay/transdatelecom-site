"use client";

export function Stats({
  data,
}: {
  data: { items: { label: string; value: string }[] };
}) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <section className="border-t border-[var(--border)] bg-[var(--card)]">
      {/* Centradas */}
      <div className="mx-auto grid max-w-6xl place-items-center gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <div key={i} className="tile w-full max-w-[380px] p-5 text-center">
            <div className="text-2xl font-semibold text-white">{s.value}</div>
            <div className="mt-1 text-sm text-[var(--muted-foreground)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Hover morado de las tarjetas */}
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
