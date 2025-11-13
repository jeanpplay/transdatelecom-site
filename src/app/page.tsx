// app/page.tsx
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

// Nuevas secciones
import { LogosMarquee } from "@/components/sections/LogosMarquee"
import { DevicesStrip } from "@/components/sections/DevicesStrip"
import { Stats } from "@/components/sections/Stats"
import { CTABanner } from "@/components/sections/CTABanner"
import { MediaMosaic } from "@/components/sections/MediaMosaic"

export const revalidate = 60

export default async function Home() {
  const [home, settings, residencial] = await Promise.all([
    sanityClient.fetch(homeQuery).catch(() => null),
    sanityClient.fetch(siteSettingsQuery).catch(() => null),
    sanityClient
      .fetch(plansByCategoryQuery, { category: "residencial" })
      .catch(() => []),
  ])

  const top = Array.isArray(residencial) ? residencial.slice(0, 3) : []

  // Si la primera sección es full-bleed, úsala como HERO con media
  const first = home?.sections?.[0]
  const heroFromSections = first?._type === "fullBleedSection" ? first : null
  const restSections = heroFromSections
    ? home.sections.slice(1)
    : (home?.sections || [])

  return (
    <main className="text-white">
      {/* HERO */}
      {heroFromSections ? (
        <FullBleed
          data={{
            title: heroFromSections.title,
            subtitle: heroFromSections.subtitle,
            ctaLabel: heroFromSections.ctaLabel,
            ctaHref: heroFromSections.ctaHref,
            align: heroFromSections.align,
            darken: heroFromSections.darken,
            // BackgroundMedia acepta {image,video,poster} o string
            asset: {
              image: heroFromSections.image,
              video: heroFromSections.video,
              poster: heroFromSections.poster,
            },
          }}
        />
      ) : (
        <div className="bg-hero">
          <Hero settings={settings ?? {}} />
        </div>
      )}

      {/* Secciones CMS */}
      {restSections.map((s: any, i: number) => {
        switch (s._type) {
          case "fullBleedSection":
            return (
              <FullBleed
                key={`fb-${i}`}
                data={{
                  title: s.title,
                  subtitle: s.subtitle,
                  ctaLabel: s.ctaLabel,
                  ctaHref: s.ctaHref,
                  align: s.align,
                  darken: s.darken,
                  asset: { image: s.image, video: s.video, poster: s.poster },
                }}
              />
            )

          case "splitSection":
            return (
              <Split
                key={`sp-${i}`}
                data={{
                  title: s.title,
                  text: s.text,
                  ctaLabel: s.ctaLabel,
                  ctaHref: s.ctaHref,
                  imageSide: s.imageSide,
                  darken: s.darken,
                  asset: { image: s.image, video: s.video, poster: s.poster },
                }}
              />
            )

          case "featuresSection":
            return <Features key={`ft-${i}`} data={s} />

          case "logosMarqueeSection":
            return (
              <LogosMarquee
                key={`lg-${i}`}
                data={{
                  title: s.title,
                  logos: s.logos || [],
                }}
              />
            )

          case "devicesStripSection":
            return (
              <DevicesStrip
                key={`dv-${i}`}
                data={{
                  title: s.title,
                  subtitle: s.subtitle,
                  items: s.items || [],
                }}
              />
            )

          case "statsSection":
            return <Stats key={`st-${i}`} data={{ items: s.items || [] }} />

          case "ctaBannerSection":
            return (
              <CTABanner
                key={`cb-${i}`}
                data={{
                  title: s.title,
                  subtitle: s.subtitle,
                  ctaLabel: s.ctaLabel,
                  ctaHref: s.ctaHref,
                }}
              />
            )

          case "mediaMosaicSection":
            return (
              <MediaMosaic
                key={`mm-${i}`}
                data={{
                  title: s.title,
                  subtitle: s.subtitle,
                  darken: s.darken,
                  items: s.items || [], // alias desde la query
                }}
              />
            )

          default:
            return null
        }
      })}

      {/* Fallback beneficios si no hay secciones */}
      {!home?.sections?.length && (
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
      )}

      {/* Planes destacados con imagen de fondo */}
      {top.length > 0 && (
        <section
          className="relative border-t border-[var(--border)]"
          style={{
            backgroundImage: "url(/bg/planes-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* overlay para contraste y coherencia con el tema */}
          <div className="absolute inset-0 bg-[var(--background)]/58 backdrop-blur-[1px]" />
          <div className="relative mx-auto max-w-6xl px-6 py-16">
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
          </div>
        </section>
      )}
    </main>
  )
}
