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

// HOME con secciones (alias consistentes: ctaLabel/ctaHref, image/video/poster, text, items/logos)
export const homeQuery = groq`
*[_type=="home"][0]{
  sections[]{
    _type,

    // Full-bleed
    _type == "fullBleedSection" => {
      _type, label, title, subtitle,
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      align,
      "darken": coalesce(darken, darkOverlay),
      "image":  coalesce(media.asset->url, image.asset->url),
      "video":  video.asset->url,
      "poster": poster.asset->url
    },

    // 50/50
    _type == "splitSection" => {
      _type, title,
      "text":     coalesce(text, body),
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      imageSide,
      "darken": darken,
      "image":  coalesce(media.asset->url, image.asset->url),
      "video":  video.asset->url,
      "poster": poster.asset->url
    },

    // Features
    _type == "featuresSection" => {
      _type, title,
      items[]{ icon, title, body }
    },

    // Marquesina de logos
    _type == "logosMarqueeSection" => {
      _type, title,
      "logos": logos[]{
        href,
        alt,
        "src": coalesce(image.asset->url, logo.asset->url, file.asset->url, asset->url)
      }
    },

    // Galería de dispositivos
    _type == "devicesStripSection" => {
      _type, title, subtitle,
      "items": items[]{
        label,
        "image":  image.asset->url,
        "poster": poster.asset->url
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
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl)
    },

    // Mosaico de medios
    _type == "mediaMosaicSection" => {
      _type, title, subtitle, darken,
      // si tu schema lo llama "medias", lo alias a "items"
      "items": coalesce(items, medias)[]{
        "image":  coalesce(image.asset->url, media.asset->url, asset->url),
        "video":  video.asset->url,
        "poster": poster.asset->url
      }
    }
  }
}
`
