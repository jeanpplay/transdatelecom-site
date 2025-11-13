"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/sections/PageHero";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch("/api/lead", { method: "POST", body: JSON.stringify(body) });
    setOk(res.ok);
    setLoading(false);
    if (res.ok) (e.currentTarget as any).reset();
  }

  return (
    <main className="text-white">
      <PageHero
        title="Hablemos"
        subtitle="Cuéntanos qué quieres lanzar: Live, VOD, FAST, apps, monetización. Te respondemos en menos de 24 h."
        asset="/bg/contact-hero.jpg"
        darken={0.55}
        center="left"
      />

      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <form onSubmit={onSubmit} className="space-y-4">
            <Input name="name" placeholder="Nombre" required className="card-glass p-3" />
            <Input name="email" placeholder="Email" type="email" required className="card-glass p-3" />
            <Input name="company" placeholder="Empresa" className="card-glass p-3" />
            <Textarea name="message" placeholder="¿Qué necesitas?" rows={5} className="card-glass p-3" />
            <Button disabled={loading} className="btn-acc">
              {loading ? "Enviando…" : "Enviar"}
            </Button>
            {ok && <p className="text-sm text-emerald-400">¡Gracias! Te contactamos pronto.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
