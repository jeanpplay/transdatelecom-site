import { PageHero } from "@/components/sections/PageHero";

export const revalidate = 60;

export default function Page() {
  return (
    <main className="text-white">
      <PageHero
        title="Nosotros"
        subtitle="Plataforma OTT de nueva generación con enfoque en rendimiento y soporte cercano."
        asset="/bg/about-hero.jpg"
        darken={0.5}
      />

      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Spott es una plataforma OTT de nueva generación. Ayudamos a operadores, marcas y
            creadores a lanzar servicios Live, VOD y FAST con calidad operadora, apps
            multiplataforma y analítica en tiempo real.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card-glass hover-ring p-6">
              <h3 className="font-semibold">Visión</h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Democratizar la distribución de video con tecnología robusta y simple.
              </p>
            </div>
            <div className="card-glass hover-ring p-6">
              <h3 className="font-semibold">Qué hacemos</h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Ingesta, transcodificación, CDN, DRM, apps y monetización (SVOD, AVOD, FAST).
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
