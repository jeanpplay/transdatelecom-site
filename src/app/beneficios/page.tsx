import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

const items = [
  { t: "Live & VOD", d: "Ingesta, transcodificación, DVR, subtítulos y empaquetado." },
  { t: "Monetización", d: "SVOD, TVOD, AVOD/ADS, cupones, bundles y paywalls." },
  { t: "FAST Channels", d: "Playout con EPG y programación dinámica." },
  { t: "Apps nativas", d: "iOS, Android, Android TV, tvOS, Fire TV, WebOS y Tizen." },
  { t: "DRM & Seguridad", d: "Widevine, FairPlay, PlayReady, watermarking y tokenization." },
  { t: "Escalabilidad & CDN", d: "Multi-CDN, edge, observabilidad y QoS." },
  { t: "Analytics", d: "QoE, consumo, cohortes, retención y churn." },
  { t: "Integraciones", d: "Billing, CRM, SSO/IdP, pasarelas locales y más." },
];

export const revalidate = 60;

export default function Page() {
  return (
    <main className="text-white">
      <PageHero
        title="Beneficios"
        subtitle="Baja latencia, resiliencia multi-CDN y apps listas para crecer."
        asset="/bg/benefits-hero.jpg"  // coloca una imagen en /public/bg/
        darken={0.5}
      />

      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => (
              <li key={i.t} className="card-glass hover-ring p-6">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-[var(--border)] bg-[var(--card)]/60">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-semibold">{i.t}</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{i.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
