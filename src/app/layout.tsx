import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer"; // <- footer
import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";

export const metadata: Metadata = {
  title: "Transdatelecom",
  description: "Internet de alta velocidad y baja latencia",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityClient.fetch(siteSettingsQuery).catch(() => null);
  const brand = settings?.brand || "Transdatelecom";

  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        <SiteHeader brand={brand} />
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
