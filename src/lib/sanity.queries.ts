import {groq} from 'next-sanity'

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

// HOME con secciones (acepta image o media)
export const homeQuery = groq`
*[_type=="home"][0]{
  sections[]{
    _type,

    // Full-bleed
    _type == "fullBleedSection" => {
      _type, label, title, subtitle,
      // en Studio a veces es ctaText/ctaUrl
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      align,
      "darken": coalesce(darken, darkOverlay),
      // imagen / video pueden llamarse distinto según tu schema
      "image":  coalesce(media.asset->url, image.asset->url),
      "video":  coalesce(video.asset->url, mediaVideo.asset->url, file.asset->url),
      "poster": coalesce(poster.asset->url, posterImage.asset->url)
    },

    // 50/50
    _type == "splitSection" => {
      _type, title,
      "text": coalesce(text, body),
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      imageSide,
      darken,
      "image":  coalesce(media.asset->url, image.asset->url),
      "video":  coalesce(video.asset->url, mediaVideo.asset->url, file.asset->url),
      "poster": coalesce(poster.asset->url, posterImage.asset->url)
    },

    // Features
    _type == "featuresSection" => {
      _type, title,
      items[]{ icon, title, body }
    }
  }
}
`
