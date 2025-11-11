"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Settings = {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
};

export function Hero({ settings }: { settings: Settings }) {
  const [direccion, setDireccion] = React.useState("");
  const router = useRouter();

  function onCheck() {
    const q = direccion.trim();
    router.push(q ? `/cobertura?direccion=${encodeURIComponent(q)}` : "/cobertura");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onCheck();
  }

  return (
    <section className="min-h-[88svh] grid place-items-center bg-black text-white">
      <div className="relative w-full max-w-3xl px-6 text-center space-y-6">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background:radial-gradient(60%_40%_at_50%_30%,rgba(99,102,241,.35),transparent_70%)]" />
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {settings.heroTitle || "Internet de alta velocidad y baja latencia"}
        </h1>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          {settings.heroSubtitle || "Conectividad confiable para hogar y negocio. Instalación rápida, soporte local y cobertura en zonas donde otros no llegan."}
        </p>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="sm:w-auto" onClick={onCheck}>
            {settings.ctaLabel || "Comprobar cobertura"}
          </Button>
          <Input
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ej: Grecia, Alajuela"
            className="h-11 bg-white text-black placeholder:text-zinc-500 sm:w-[320px]"
          />
        </div>
        <p className="text-xs text-zinc-600">
          Fibra óptica y soluciones empresariales. Instalación disponible hoy.
        </p>
      </div>
    </section>
  );
}
