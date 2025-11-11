import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sanityClient } from "@/lib/sanity.client";
import { plansByCategoryQuery, siteSettingsQuery } from "@/lib/sanity.queries";

export const revalidate = 60;

async function getData() {
  const [residencial, empresarial, settings] = await Promise.all([
    sanityClient.fetch(plansByCategoryQuery, { category: "residencial" }),
    sanityClient.fetch(plansByCategoryQuery, { category: "empresarial" }),
    sanityClient.fetch(siteSettingsQuery).catch(() => null),
  ]);

  const waDigits = (settings?.whatsapp || "").replace(/\D/g, "");
  const waBase = waDigits ? `https://wa.me/${waDigits}` : "";

  const waLink = (title: string, price?: number) => {
    if (!waBase) return "#";
    const msg = `Hola, quiero contratar el plan "${title}"${
      typeof price === "number" ? ` por ₡${price.toLocaleString("es-CR")}/mes` : ""
    }.`;
    return `${waBase}?text=${encodeURIComponent(msg)}`;
  };

  return { residencial, empresarial, waBase, waLink };
}

export default async function Page() {
  const { residencial, empresarial, waBase, waLink } = await getData();

  const PlanGrid = ({ items }: { items: any[] }) =>
    items?.length ? (
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p: any) => (
          <li
            key={p._id}
            className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/3"
          >
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">
              {typeof p.price === "number"
                ? `₡${p.price.toLocaleString("es-CR")}/mes`
                : "Precio a consultar"}
            </p>
            <p className="mt-2 text-sm">
              {p.down}↓ / {p.up}↑ Mbps
            </p>

            <ul className="mt-4 space-y-1 text-sm text-zinc-300">
              {p.features?.map((f: string, i: number) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <div className="mt-5">
              {waBase ? (
                <Button asChild className="w-full">
                  <a href={waLink(p.title, p.price)} target="_blank" rel="noreferrer">
                    Contratar por WhatsApp
                  </a>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full border-white/20">
                  <Link href="/soporte">Solicitar este plan</Link>
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-zinc-400">No hay planes publicados en esta categoría.</p>
    );

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 text-white">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8">Planes</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Residencial</h2>
        <PlanGrid items={residencial} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Empresarial</h2>
        <PlanGrid items={empresarial} />
      </section>
    </main>
  );
}
