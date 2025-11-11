"use client";

import { useEffect, useMemo, useState } from "react";

export default function CoberturaPage() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Prefill desde la URL: ?direccion=...&plan=...
  const params = useMemo(() => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""), []);
  const direccion = params.get("direccion") || "";
  const plan = params.get("plan") || "";

  useEffect(() => {
    // Solo como UX: si vino con ?direccion, la ponemos en el input
    const addr = document.querySelector<HTMLInputElement>('input[name="address"]');
    if (addr && direccion) addr.value = direccion;
    const planInput = document.querySelector<HTMLInputElement>('input[name="plan"]');
    if (planInput && plan) planInput.value = plan;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true); setOk(null); setErr(null);
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setSending(false);
    if (json.ok) {
      setOk("¡Gracias! Verificaremos tu dirección y te contactaremos pronto.");
      form.reset();
    } else {
      setErr(json.error || "Error enviando la solicitud. Intenta de nuevo.");
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-white">
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">Comprobar cobertura</h1>
      <p className="text-zinc-400 mb-8">
        Deja tus datos y verificamos tu dirección.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nombre completo"
          className="w-full rounded-md bg-white/5 px-4 py-3 outline-none"
          required
        />
        <input
          name="phone"
          placeholder="Teléfono"
          className="w-full rounded-md bg-white/5 px-4 py-3 outline-none"
          required
        />
        <input
          name="address"
          placeholder="Dirección exacta (barrio, distrito, cantón)"
          className="w-full rounded-md bg-white/5 px-4 py-3 outline-none"
          defaultValue={direccion}
        />
        <input
          name="plan"
          placeholder="Plan de interés (opcional)"
          className="w-full rounded-md bg-white/5 px-4 py-3 outline-none"
          defaultValue={plan}
        />
        <textarea
          name="note"
          placeholder="Referencia o indicaciones (opcional)"
          className="w-full rounded-md bg-white/5 px-4 py-3 outline-none"
          rows={3}
        />
        <button
          disabled={sending}
          className="rounded-lg border border-white/20 px-5 py-3 hover:bg-white/10"
        >
          {sending ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>

      {ok && <p className="mt-4 text-emerald-400">{ok}</p>}
      {err && <p className="mt-4 text-red-400">{err}</p>}

      <p className="mt-8 text-xs text-zinc-500">
        Al enviar aceptas ser contactado por nuestros canales oficiales.
      </p>
    </main>
  );
}
