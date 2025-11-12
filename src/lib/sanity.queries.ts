import {groq} from "next-sanity";

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

/* ---- Home (hero + secciones) ---- */
export const homePageQuery = groq`
*[_type=="home"][0]{
  hero{
    overTitle, title, subtitle, ctaLabel, align, darken,
    "asset": media.asset->{url, mimeType, metadata{dimensions}}
  },
  sections[]{
    _type, title, subtitle, text, ctaLabel, ctaHref, align, imageSide, darken,
    "asset": media.asset->{url, mimeType, metadata{dimensions}},
    items[]{title, text}
  }
}
`;
