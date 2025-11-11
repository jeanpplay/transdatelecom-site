import { sanityClient } from "@/lib/sanity.client";
import { allFaqsQuery } from "@/lib/sanity.queries";

export const revalidate = 60;

export default async function Page() {
  const faqs = await sanityClient.fetch(allFaqsQuery);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-white">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8">Soporte</h1>
      {faqs?.length ? (
        <div className="space-y-4">
          {faqs.map((f: any) => (
            <details key={f._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer select-none text-lg font-medium">{f.question}</summary>
              <p className="mt-3 text-zinc-300">{f.answer}</p>
            </details>
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">Aún no hay preguntas frecuentes publicadas.</p>
      )}
    </main>
  );
}
