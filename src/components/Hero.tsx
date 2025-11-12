"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Settings = {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
};

export function Hero({ settings }: { settings: Settings }) {
  return (
    <section
      className="
        relative grid min-h-[88svh] place-items-center overflow-hidden
        bg-black text-white
      "
    >
      {/* Radial + noise “Starlink-like” */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60
        [background:radial-gradient(60%_40%_at_50%_30%,rgba(124,58,237,.25),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10]
        [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%223%22 height=%223%22><circle cx=%221.5%22 cy=%221.5%22 r=%220.5%22 fill=%22white%22/></svg>')]" />

      <div className="w-full max-w-3xl px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {settings.heroTitle || "Plataforma OTT de Nueva Generación"}
        </h1>
        <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
          {settings.heroSubtitle ||
            "Lanza y monetiza tu servicio de streaming con calidad operadora: Live, VOD, FAST, apps multiplataforma y analítica en tiempo real."}
        </p>

        <div className="flex justify-center">
          <Link href="/contacto">
            <Button size="lg" className="bg-[#7C3AED] hover:bg-[#6D28D9]">
              {settings.ctaLabel || "Contactar"}
            </Button>
          </Link>
        </div>

        <p className="text-xs text-zinc-500">
          Integraciones con billing/CRM, DRM multi-vendor y multi-CDN.
        </p>
      </div>
    </section>
  );
}
