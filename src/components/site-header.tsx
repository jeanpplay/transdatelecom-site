import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader({
  brand,
  whatsapp,
}: {
  brand: string;
  whatsapp?: string;
}) {
  const wa = (whatsapp || "").replace(/\D/g, "");
  const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(
    "Hola, quiero información de internet"
  )}` : undefined;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight text-white">
          {brand}
        </Link>

        <nav className="hidden gap-6 text-sm md:flex">
          <Link className="text-zinc-300 hover:text-white" href="/planes">
            Planes
          </Link>
          <Link className="text-zinc-300 hover:text-white" href="/cobertura">
            Cobertura
          </Link>
          <Link className="text-zinc-300 hover:text-white" href="/soporte">
            Soporte
          </Link>
        </nav>

        {waHref ? (
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={waHref} target="_blank" rel="noreferrer" aria-label="Contacto por WhatsApp">
              Contacto
            </a>
          </Button>
        ) : (
          <Button asChild size="sm" variant="outline" className="border-zinc-600 text-white hover:bg-white/10">
            <Link href="/soporte">Contacto</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
