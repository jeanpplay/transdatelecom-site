import Link from "next/link"
import { Button } from "@/components/ui/button"
import { sanityClient } from "@/lib/sanity.client"
import {
  plansByCategoryQuery,
  siteSettingsQuery,
  homeQuery,
} from "@/lib/sanity.queries"

import { FullBleed } from "@/components/sections/FullBleed"
import { Split } from "@/components/sections/Split"
import { Features } from "@/components/sections/Features"
import { Hero } from "@/components/Hero"

export const revalidate = 60

export default async function Home() {
  const [home, settings, residencial] = await Promise.all([
    sanityClient.fetch(homeQuery).catch(() => null),
    sanityClient.fetch(siteSettingsQuery).catch(() => null),
    sanityClient.fetch(plansByCategoryQuery, { category: "residencial" }).catch(() => []),
  ])

  const top = Array.isArray(residencial) ? residencial.slice(0, 3) : []

  // Si la primera sección es full-bleed, úsala como HERO con imagen
  const first = home?.sections?.[0]
  const heroFromSections = first?._type === "fullBleedSection" ? first : null
  const restSections = heroFromSections ? home.sections.slice(1) : (home?.sections || [])

  return (
    <main className="text-white">
      {/* HERO */}
      {heroFromSections ? (
        <FullBleed
          data={{
            title: heroFromSections.title,
            subtitle: heroFromSections.subtitle,
            ctaLabel: (heroFromSections as any).ctaLabel ?? (heroFromSections as any).ctaText,
            ctaHref: (heroFromSections as any).ctaHref ?? (heroFromSections as any).ctaUrl,
            align: (heroFromSections as any).align,
            darken: (heroFromSections as any).darken ?? (heroFromSections as any).darkOverlay,
            asset:
              (heroFromSections as any).asset ?? {
                image: (heroFromSections as any).image,
                video: (heroFromSections as any).video,
                poster: (heroFromSections as any).poster,
              },
          }}
        />
      ) : (
        <div className="bg-hero">
          <Hero settings={settings ?? {}} />
        </div>
      )}

      {/* Secciones CMS (resto) */}
      {restSections.map((s: any, i: number) => {
        if (s._type === "fullBleedSection") {
          return (
            <FullBleed
              key={`fb-${i}`}
              data={{
                title: s.title,
                subtitle: s.subtitle,
                ctaLabel: s.ctaLabel ?? s.ctaText,
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
              key={`sp-${i}`}
              data={{
                title: s.title,
                text: s.text ?? s.body,
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
          return <Features key={`ft-${i}`} data={s} />
        }

        return null
      })}

      {/* Beneficios: solo si NO has cargado secciones en Home */}
      {!home?.sections?.length && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold mb-6">¿Por qué elegirnos?</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm text-zinc-300">
            <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">⚡ Baja latencia para Live, VOD y gaming.</li>
            <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">📍 Soporte local y respuesta rápida.</li>
            <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">🔒 Plataforma estable y segura.</li>
            <li className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">🚀 Despliegue ágil y multipantalla.</li>
          </ul>
        </section>
      )}

      {/* Planes destacados: SIEMPRE visibles si hay datos */}
      {top.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Planes destacados</h2>
            <Button asChild variant="outline" className="border-white/20">
              <Link href="/planes">Ver todos</Link>
            </Button>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {top.map((p: any) => (
              <li key={p._id} className="card-glass hover-ring p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {typeof p.price === "number" ? `₡${p.price.toLocaleString("es-CR")}/mes` : "Precio a consultar"}
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
        </section>
      )}
    </main>
  )
}
