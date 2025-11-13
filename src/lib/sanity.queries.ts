import { groq } from "next-sanity"

export const siteSettingsQuery = groq`
*[_type=="siteSettings"][0]{ brand, heroTitle, heroSubtitle, ctaLabel, phone, whatsapp, address }
`

export const plansByCategoryQuery = groq`
*[_type=="plan" && category==$category && available==true]{
  _id, title, price, down, up, features, "slug": slug.current, fineprint
} | order(price asc)
`

export const allFaqsQuery = groq`
*[_type=="faq"] | order(coalesce(order,999) asc, _createdAt asc){
  _id, question, answer, order
}
`

// HOME con secciones (forzamos tamaños y formato)
export const homeQuery = groq`
*[_type=="home"][0]{
  sections[]{
    _type,

    // Full-bleed (fondo grande)
    _type == "fullBleedSection" => {
      _type, label, title, subtitle,
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      align,
      "darken": coalesce(darken, darkOverlay),

      // Pedimos variantes ligeras a Sanity
      "image": select(
        defined(media.asset->url) => media.asset->url + "?auto=format&w=1920",
        defined(image.asset->url) => image.asset->url + "?auto=format&w=1920"
      ),
      "video":  coalesce(video.asset->url, file.asset->url),
      "poster": coalesce(
        poster.asset->url, 
        posterImage.asset->url
      ) + "?auto=format&w=1920"
    },

    // 50/50 (imagen mediana)
    _type == "splitSection" => {
      _type, title,
      "text":     coalesce(text, body),
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      imageSide,
      "darken": darken,
      "image": select(
        defined(media.asset->url) => media.asset->url + "?auto=format&w=1600",
        defined(image.asset->url) => image.asset->url + "?auto=format&w=1600"
      ),
      "video":  video.asset->url,
      "poster": poster.asset->url + "?auto=format&w=1600"
    },

    // Features (solo texto/emoji)
    _type == "featuresSection" => {
      _type, title,
      items[]{ icon, title, body }
    },

    // Logos (pequeños)
    _type == "logosMarqueeSection" => {
      _type, title,
      "logos": logos[]{ 
        "src": asset->url + "?auto=format&w=320&fm=png",
        alt
      }
    },

    // Galería de dispositivos (cards)
    _type == "devicesStripSection" => {
      _type, title, subtitle,
      "items": items[] {
        title,
        "image":  media.asset->url + "?auto=format&w=1000",
        "poster": poster.asset->url + "?auto=format&w=1000"
      }
    },

    // KPIs / Stats
    _type == "statsSection" => {
      _type,
      "items": items[]{ label, value }
    },

    // Banda CTA
    _type == "ctaBannerSection" => {
      _type, title, subtitle,
      "ctaLabel": ctaLabel,
      "ctaHref":  ctaUrl
    },

    // Mosaico de medios (grid)
    _type == "mediaMosaicSection" => {
      _type, title, subtitle, darken,
      "items": items[]{ "image": asset->url + "?auto=format&w=1400" }
    }
  }
}
`
