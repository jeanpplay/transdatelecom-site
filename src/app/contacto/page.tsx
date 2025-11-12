"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <main className="mx-auto max-w-2xl px-6 py-16 text-white">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Hablemos</h1>
      <p className="text-zinc-400 mb-8">
        Cuéntanos qué quieres lanzar: Live, VOD, FAST, apps, monetización. Te respondemos en menos de 24 h.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input name="name" placeholder="Nombre" required />
        <Input name="email" placeholder="Email" type="email" required />
        <Input name="company" placeholder="Empresa" />
        <Textarea name="message" placeholder="¿Qué necesitas?" rows={5} />
        <Button disabled={loading} className="bg-[#7C3AED] hover:bg-[#6D28D9]">
          {loading ? "Enviando…" : "Enviar"}
        </Button>
        {ok && <p className="text-sm text-emerald-400">¡Gracias! Te contactamos pronto.</p>}
      </form>
    </main>
  );
}
