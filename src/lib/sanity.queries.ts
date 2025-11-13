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

// HOME con secciones — coalesce de rutas para que no falte ninguna imagen
export const homeQuery = groq`
*[_type=="home"][0]{
  sections[]{
    _type,

    // FULL-BLEED
    _type == "fullBleedSection" => {
      _type, label, title, subtitle,
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      align,
      "darken":  coalesce(darken, darkOverlay),

      // Preferimos image > media > asset > url
      "image": select(
        defined(image.asset->url) => image.asset->url + "?auto=format&fit=max&w=1920&q=75",
        defined(media.asset->url)  => media.asset->url  + "?auto=format&fit=max&w=1920&q=75",
        defined(asset->url)        => asset->url        + "?auto=format&fit=max&w=1920&q=75",
        defined(url)               => url               + "?auto=format&fit=max&w=1920&q=75"
      ),
      "video":  coalesce(video.asset->url, file.asset->url, videoUrl),
      "poster": select(
        defined(poster.asset->url)      => poster.asset->url      + "?auto=format&fit=max&w=1920&q=75",
        defined(posterImage.asset->url) => posterImage.asset->url + "?auto=format&fit=max&w=1920&q=75",
        defined(image.asset->url)       => image.asset->url       + "?auto=format&fit=max&w=1920&q=75",
        defined(media.asset->url)       => media.asset->url       + "?auto=format&fit=max&w=1920&q=75",
        defined(asset->url)             => asset->url             + "?auto=format&fit=max&w=1920&q=75",
        defined(url)                    => url                    + "?auto=format&fit=max&w=1920&q=75"
      )
    },

    // SPLIT 50/50
    _type == "splitSection" => {
      _type, title,
      "text":     coalesce(text, body),
      "ctaLabel": coalesce(ctaLabel, ctaText),
      "ctaHref":  coalesce(ctaHref,  ctaUrl),
      imageSide,
      "darken": darken,

      "image": select(
        defined(image.asset->url) => image.asset->url + "?auto=format&fit=max&w=1600&q=75",
        defined(media.asset->url)  => media.asset->url + "?auto=format&fit=max&w=1600&q=75",
        defined(asset->url)        => asset->url       + "?auto=format&fit=max&w=1600&q=75",
        defined(url)               => url              + "?auto=format&fit=max&w=1600&q=75"
      ),
      "video":  coalesce(video.asset->url, file.asset->url, videoUrl),
      "poster": select(
        defined(poster.asset->url) => poster.asset->url + "?auto=format&fit=max&w=1600&q=75",
        defined(image.asset->url)  => image.asset->url  + "?auto=format&fit=max&w=1600&q=75",
        defined(media.asset->url)  => media.asset->url  + "?auto=format&fit=max&w=1600&q=75",
        defined(asset->url)        => asset->url        + "?auto=format&fit=max&w=1600&q=75",
        defined(url)               => url               + "?auto=format&fit=max&w=1600&q=75"
      )
    },

    // FEATURES
    _type == "featuresSection" => {
      _type, title, items[]{ icon, title, body }
    },

    // LOGOS MARQUEE
    _type == "logosMarqueeSection" => {
      _type, title,
      "logos": logos[]{
        "src": select(
          defined(image.asset->url) => image.asset->url + "?auto=format&fit=max&w=320&q=80",
          defined(asset->url)       => asset->url       + "?auto=format&fit=max&w=320&q=80",
          defined(url)              => url              + "?auto=format&fit=max&w=320&q=80"
        ),
        alt
      }
    },

    // DEVICES STRIP
    _type == "devicesStripSection" => {
      _type, title, subtitle,
      "items": items[]{
        title,
        "image": select(
          defined(image.asset->url) => image.asset->url + "?auto=format&fit=max&w=1000&q=80",
          defined(media.asset->url) => media.asset->url + "?auto=format&fit=max&w=1000&q=80",
          defined(asset->url)       => asset->url       + "?auto=format&fit=max&w=1000&q=80",
          defined(url)              => url              + "?auto=format&fit=max&w=1000&q=80"
        ),
        "poster": select(
          defined(poster.asset->url) => poster.asset->url + "?auto=format&fit=max&w=1000&q=80",
          defined(image.asset->url)  => image.asset->url  + "?auto=format&fit=max&w=1000&q=80",
          defined(asset->url)        => asset->url        + "?auto=format&fit=max&w=1000&q=80",
          defined(url)               => url               + "?auto=format&fit=max&w=1000&q=80"
        )
      }
    },

    // STATS
    _type == "statsSection" => { _type, "items": items[]{ label, value } },

    // CTA BANNER
    _type == "ctaBannerSection" => {
      _type, title, subtitle,
      "ctaLabel": ctaLabel,
      "ctaHref":  ctaUrl
    },

    // MEDIA MOSAIC
    _type == "mediaMosaicSection" => {
      _type, title, subtitle, darken,
      "items": items[]{
        "image": select(
          defined(image.asset->url) => image.asset->url + "?auto=format&fit=max&w=1400&q=75",
          defined(asset->url)       => asset->url       + "?auto=format&fit=max&w=1400&q=75",
          defined(url)              => url              + "?auto=format&fit=max&w=1400&q=75"
        )
      }
    }
  }
}
`
