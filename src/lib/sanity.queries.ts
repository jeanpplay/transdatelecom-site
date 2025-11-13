import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
*[_type=="siteSettings"][0]{
  brand, heroTitle, heroSubtitle, ctaLabel, phone, whatsapp, address
}
`;

export const plansByCategoryQuery = groq`
*[_type=="plan" && category==$category && available==true]{
  _id, title, price, down, up, features, "slug": slug.current, fineprint
} | order(price asc)
`;

export const allFaqsQuery = groq`
*[_type=="faq"] | order(coalesce(order,999) asc, _createdAt asc){
  _id, question, answer, order
}
`;

/**
 * HOME con secciones (normalizado a los props de tus componentes)
 * - Exponemos la imagen SIEMPRE como `asset` (URL string) para <BackgroundMedia asset=... />
 * - Unificamos nombres: ctaLabel/ctaHref, darken
 */
export const homeQuery = groq`
*[_type=="home"][0]{
  sections[]{
    _type,

    // ============ Full-bleed ============
    _type == "fullBleedSection" => {
      _type,
      label,
      title,
      subtitle,
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      align,
      "darken": coalesce(darken, darkOverlay),
      // la imagen principal (como URL), opcionalmente video/poster si luego lo usas
      "asset":  coalesce(media.asset->url, image.asset->url),
      "video":  video.asset->url,
      "poster": poster.asset->url
    },

    // ============ Split 50/50 ============
    _type == "splitSection" => {
      _type,
      title,
      "text":  coalesce(text, body),
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      imageSide,
      "darken": coalesce(darken, darkOverlay),
      "asset":  coalesce(media.asset->url, image.asset->url),
      "video":  video.asset->url,
      "poster": poster.asset->url
    },

    // ============ Features ===============
    _type == "featuresSection" => {
      _type,
      title,
      items[]{ icon, title, body }
    }
  }
}
`;
