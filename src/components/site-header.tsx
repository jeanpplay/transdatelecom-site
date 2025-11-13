"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/beneficios", label: "Beneficios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/planes", label: "Planes" },
];

export function SiteHeader({
  brand,
  logoSrc = "/logo-spott.png",
}: {
  brand: string;
  logoSrc?: string;
}) {
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
    <header
      className="
        sticky top-0 z-40 w-full border-b backdrop-blur
        bg-[var(--card)]/70 supports-[backdrop-filter]:bg-[var(--card)]/50
        border-[var(--border)]
      "
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Brand: logo + texto */}
        <Link href="/" className="flex items-center gap-3" aria-label={brand}>
          <Image
            src={logoSrc}
            alt={`${brand} logo`}
            width={28}
            height={28}
            priority
            className="h-7 w-7 rounded-full object-contain"
          />
          <span className="font-semibold tracking-wide text-foreground">
            {brand}
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden gap-6 text-sm text-[var(--muted-foreground)] md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-[var(--primary)] ${
                  active ? "text-foreground underline underline-offset-4" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href={waHref}
          className="hidden md:block"
          target={waHref.startsWith("http") ? "_blank" : undefined}
        >
          <Button size="sm" className="btn-acc">Contacto</Button>
        </Link>
      </div>
    </header>
  );
}
