import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import SiteBackdrop from "@/components/SiteBackdrop"; // fondo sutil global

export const metadata: Metadata = {
  metadataBase: new URL("https://transdatelecom-site.vercel.app"), // actualízalo luego
  title: "Spott — Plataforma OTT de Nueva Generación",
  description:
    "Lanza y monetiza tu servicio de streaming con calidad operadora: Live, VOD, FAST, apps multiplataforma y analítica en tiempo real.",
  openGraph: {
    title: "Spott — Plataforma OTT de Nueva Generación",
    description:
      "OTT, Live, FAST, monetización, apps nativas y analítica. Todo en una sola plataforma.",
    images: ["/og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spott — Plataforma OTT",
    description:
      "OTT, Live, FAST, monetización, apps nativas y analítica. Todo en una sola plataforma.",
    images: ["/og.jpg"],
  },
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
      {/* body en negro, contenido por encima del backdrop */}
      <body className="relative min-h-screen overflow-x-hidden bg-[#0B0D0E] text-white antialiased">
        {/* Fondo sutil tipo Starlink (puedes alternar variant="grid") */}
        <SiteBackdrop variant="topo" opacity={0.16} />

        <div className="relative z-10">
          <SiteHeader brand={brand} />
          {children}
          <SiteFooter
            brand={brand}
            phone={settings?.phone}
            whatsapp={settings?.whatsapp}
            address={settings?.address}
          />
        </div>
      </body>
    </html>
  );
}
