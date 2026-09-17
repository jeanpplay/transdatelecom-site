import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import SiteBackdrop from "@/components/SiteBackdrop";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.spot-tv.com"),

  title: {
    default: "Spott — Plataforma OTT de Nueva Generación",
    template: "%s | Spott",
  },

  description:
    "Plataforma OTT para servicios de streaming con TV en vivo, contenido multiplataforma y tecnología para operadores.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Spott — Plataforma OTT de Nueva Generación",
    description:
      "Plataforma OTT con TV en vivo, contenido multiplataforma y tecnología para operadores.",
    url: "https://www.spot-tv.com",
    siteName: "Spott",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Spott — Plataforma OTT",
      },
    ],
    locale: "es_CR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Spott — Plataforma OTT",
    description:
      "Plataforma OTT con TV en vivo, contenido multiplataforma y tecnología para operadores.",
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0E",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await sanityClient.fetch(siteSettingsQuery).catch(() => null);
  const brand = settings?.brand || "Spott";

  return (
    <html lang="es">
      <body className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        <SiteBackdrop variant="topo" opacity={0.16} />

        <div className="relative z-10">
          <SiteHeader brand={brand} logoSrc="/logo-spott.png" />

          {children}

          <SiteFooter
            brand={brand}
            logoSrc="/logo-spott.png"
            phone={settings?.phone}
            whatsapp={settings?.whatsapp}
            address={settings?.address}
          />
        </div>
      </body>
    </html>
  );
}