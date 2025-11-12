export const revalidate = 60;

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold">Nosotros</h1>
      <p className="text-zinc-400 mt-4 leading-relaxed">
        Spott es una plataforma OTT de nueva generación. Ayudamos a
        operadores, marcas y creadores a lanzar servicios Live, VOD y FAST
        con calidad operadora, apps multiplataforma y analítica en tiempo real.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-6 bg-white/3">
          <h3 className="font-semibold">Visión</h3>
          <p className="text-sm text-zinc-400 mt-1">
            Democratizar la distribución de video con tecnología robusta y simple.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 p-6 bg-white/3">
          <h3 className="font-semibold">Qué hacemos</h3>
          <p className="text-sm text-zinc-400 mt-1">
            Ingesta, transcodificación, CDN, DRM, apps y monetización (SVOD, AVOD, FAST).
          </p>
        </div>
      </div>
    </main>
  );
}
