import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader({ brand }: { brand: string }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-wide text-white">
          {brand}
        </Link>
        <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
          <Link href="/planes" className="hover:text-white">Planes</Link>
          <Link href="/cobertura" className="hover:text-white">Cobertura</Link>
          <Link href="/soporte" className="hover:text-white">Soporte</Link>
        </nav>
        <Button size="sm" variant="outline" className="border-zinc-600 text-white hover:bg-white/10">
          Contacto
        </Button>
      </div>
    </header>
  );
}
