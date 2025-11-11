import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import { Hero } from "@/components/Hero";

export const revalidate = 60;

export default async function Home() {
  const settings = await sanityClient.fetch(siteSettingsQuery).catch(() => null);
  return <Hero settings={settings || {}} />;
}
