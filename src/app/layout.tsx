import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";

const isProd = process.env.VERCEL_ENV === "production";
const siteUrl =
  process.env.SITE_URL ?? "https://transdatelecom-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Transdatelecom",
  description: "Internet de alta velocidad y baja latencia",
  robots: { index: isProd, follow: isProd },
  openGraph: {
    title: "Transdatelecom",
    description:
      "Conectividad confiable para hogar y negocio. Instalación rápida, soporte local y cobertura donde otros no llegan.",
    url: siteUrl,
    siteName: "Transdatelecom",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Transdatelecom" }],
    locale: "es_CR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Transdatelecom" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await sanityClient.fetch(siteSettingsQuery).catch(() => null);
  const brand = settings?.brand || "Transdatelecom";

  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        <SiteHeader brand={brand} whatsapp={settings?.whatsapp} />
        {children}
        <SiteFooter
          brand={brand}
          phone={settings?.phone}
          whatsapp={settings?.whatsapp}
          address={settings?.address}
        />
      </body>
    </html>
  );
}
