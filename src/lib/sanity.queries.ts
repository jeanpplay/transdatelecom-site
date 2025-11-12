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

// NUEVO: página Home con secciones
export const homeQuery = groq`
*[_type=="home"][0]{
  sections[]{
    _type,
    // full-bleed
    _type == "fullBleedSection" => {
      _type, label, title, subtitle, ctaText, ctaUrl, align, darkOverlay,
      "image": media.asset->url,
      "video": video.asset->url,
      "poster": poster.asset->url
    },
    // split
    _type == "splitSection" => {
      _type, title, body, ctaText, ctaUrl, imageSide,
      "image": media.asset->url,
      "video": video.asset->url,
      "poster": poster.asset->url
    },
    // features
    _type == "featuresSection" => {
      _type, title,
      items[]{ icon, title, body }
    }
  }
}
`
