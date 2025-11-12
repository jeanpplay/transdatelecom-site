import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-6xl place-items-center px-6 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Página no encontrada</h1>
        <p className="mt-2 text-zinc-400">
          Verifica la URL o vuelve al inicio.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Ir al inicio</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20">
            <Link href="/planes">Ver planes</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
