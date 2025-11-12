import { Check } from "lucide-react";

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
    <main className="mx-auto max-w-6xl px-6 py-16 text-white">
      <h1 className="text-3xl md:text-4xl font-semibold mb-10">Beneficios</h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li key={i.t} className="rounded-xl border border-white/10 bg-white/3 p-6">
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10">
              <Check className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-semibold">{i.t}</h3>
            <p className="mt-1 text-sm text-zinc-400">{i.d}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
