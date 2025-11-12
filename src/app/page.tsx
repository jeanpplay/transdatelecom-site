import Link from "next/link"
import { Button } from "@/components/ui/button"
import { sanityClient } from "@/lib/sanity.client"
import {
  plansByCategoryQuery,
  siteSettingsQuery,
  homeQuery,            // ⬅️ usar homeQuery
} from "@/lib/sanity.queries"

import { FullBleed } from "@/components/sections/FullBleed"
import { Split } from "@/components/sections/Split"
import { Features } from "@/components/sections/Features"
import { Hero } from "@/components/Hero"

export const revalidate = 60

export default async function Home() {
  const [home, settings, residencial] = await Promise.all([
    sanityClient.fetch(homeQuery).catch(() => null),                    // ⬅️ homeQuery
    sanityClient.fetch(siteSettingsQuery).catch(() => null),
    sanityClient
      .fetch(plansByCategoryQuery, { category: "residencial" })
      .catch(() => []),
  ])

  const top = Array.isArray(residencial) ? residencial.slice(0, 3) : []

  return (
    <main className="text-white">
      {/* HERO: si la Home trae hero, úsalo; si no, usa el Hero por defecto */}
      {home?.hero ? (
        <FullBleed
          data={{
            title: home.hero.title,
            subtitle: home.hero.subtitle,
            ctaLabel: home.hero.ctaLabel,
            ctaHref: home.hero.ctaHref ?? home.hero.ctaUrl,
            align: home.hero.align,
            darken: home.hero.darken,
            asset: home.hero.asset,
          }}
        />
      ) : (
        <div className="bg-hero">
          <Hero settings={settings ?? {}} />
        </div>
      )}

      {/* Secciones Starlink-like desde Sanity */}
      {(home?.sections || []).map((s: any, i: number) => {
        if (s._type === "fullBleedSection") {
          return (
            <FullBleed
              key={i}
              data={{
                title: s.title,
                subtitle: s.subtitle,
                ctaLabel: s.ctaLabel,
                ctaHref: s.ctaHref ?? s.ctaUrl,
                align: s.align,
                darken: s.darken ?? s.darkOverlay,
                asset: s.asset ?? { image: s.image, video: s.video, poster: s.poster },
              }}
            />
          )
        }

        if (s._type === "splitSection") {
          return (
            <Split
              key={i}
              data={{
                title: s.title,
                text: s.text ?? s.body, // ⬅️ Split espera "text"
                ctaLabel: s.ctaLabel ?? s.ctaText,
                ctaHref: s.ctaHref ?? s.ctaUrl,
                imageSide: s.imageSide,
                darken: s.darken,
                asset: s.asset ?? { image: s.image, video: s.video, poster: s.poster },
              }}
            />
          )
        }

        if (s._type === "featuresSection") {
          return <Features key={i} data={s} />
        }

        return null
      })}

      {/* Fallback si aún no hay secciones en Home */}
      {!home?.sections?.length && (
        <>
          <section className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold mb-6">¿Por qué elegirnos?</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm text-zinc-300">
              <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                ⚡ Baja latencia para Live, VOD y gaming.
              </li>
              <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                📍 Soporte local y respuesta rápida.
              </li>
              <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                🔒 Plataforma estable y segura.
              </li>
              <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                🚀 Despliegue ágil y multipantalla.
              </li>
            </ul>
          </section>

          <section className="mx-auto max-w-6xl px-6 pb-16">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-semibold">Planes destacados</h2>
              <Button asChild variant="outline" className="border-white/20">
                <Link href="/planes">Ver todos</Link>
              </Button>
            </div>

            {top.length ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {top.map((p: any) => (
                  <li key={p._id} className="card-glass hover-ring p-6">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {typeof p.price === "number"
                        ? `₡${p.price.toLocaleString("es-CR")}/mes`
                        : "Precio a consultar"}
                    </p>
                    <p className="mt-2 text-sm">
                      {p.down}↓ / {p.up}↑ Mbps
                    </p>
                    <ul className="mt-4 space-y-1 text-sm text-zinc-300">
                      {p.features?.slice(0, 3).map((f: string, i: number) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <Button asChild className="w-full btn-acc">
                        <Link href="/cobertura">Comprobar cobertura</Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-400">Pronto publicaremos nuestros mejores planes.</p>
            )}
          </section>
        </>
      )}
    </main>
  )
}
