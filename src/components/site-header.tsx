"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/beneficios", label: "Beneficios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/planes", label: "Planes" },
];

export function SiteHeader({ brand }: { brand: string }) {
  const pathname = usePathname();

  // WhatsApp (opcional, desde env) -> NEXT_PUBLIC_WA
  const rawWa = process.env.NEXT_PUBLIC_WA || "";
  const waDigits = rawWa.replace(/\D/g, "");
  const waHref = waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(
        "Hola, quiero más información de Spott."
      )}`
    : "/contacto";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 supports-backdrop-filter:bg-black/40 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-wide text-white">
          {brand}
        </Link>

        <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-white transition ${
                  active ? "text-white underline underline-offset-4" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href={waHref} className="hidden md:block" target={waHref.startsWith("http") ? "_blank" : undefined}>
          <Button size="sm" className="btn-acc">
            Contacto
          </Button>
        </Link>
      </div>
    </header>
  );
}
