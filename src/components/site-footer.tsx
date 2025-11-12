import Link from "next/link";

export function SiteFooter({
  phone, whatsapp, address, brand = "Spott",
}: { phone?: string; whatsapp?: string; address?: string; brand?: string }) {
  const wa = (whatsapp || "").replace(/\D/g, "");
  const waHref = wa ? `https://wa.me/${wa}` : undefined;

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10 text-zinc-400">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-white font-semibold">{brand}</p>
            {address && <p className="text-sm mt-1">{address}</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {phone && <a className="underline hover:text-white" href={`tel:${phone}`}>{phone}</a>}
            {waHref && <a className="underline hover:text-white" href={waHref} target="_blank">WhatsApp</a>}
            <Link className="underline hover:text-white" href="/beneficios">Beneficios</Link>
            <Link className="underline hover:text-white" href="/contacto">Contacto</Link>
          </div>
        </div>
        <p className="mt-6 text-xs">© {new Date().getFullYear()} {brand}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
