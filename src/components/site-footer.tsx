import Link from "next/link";
import Image from "next/image";

export function SiteFooter({
  phone,
  whatsapp,
  address,
  brand = "Spott",
  logoSrc = "/logo-spott.png",
}: {
  phone?: string;
  whatsapp?: string;
  address?: string;
  brand?: string;
  logoSrc?: string;
}) {
  const wa = (whatsapp || "").replace(/\D/g, "");
  const waHref = wa ? `https://wa.me/${wa}` : undefined;

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-6 py-10 text-[var(--muted-foreground)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand: logo + texto */}
          <div className="flex items-center gap-3">
            <Image
              src={logoSrc}
              alt={`${brand} logo`}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-contain"
            />
            <div>
              <p className="text-foreground font-semibold">{brand}</p>
              {address && <p className="mt-1 text-sm">{address}</p>}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {phone && (
              <a className="underline hover:text-[var(--primary)]" href={`tel:${phone}`}>
                {phone}
              </a>
            )}
            {waHref && (
              <a
                className="underline hover:text-[var(--primary)]"
                href={waHref}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            )}
            <Link className="underline hover:text-[var(--primary)]" href="/beneficios">
              Beneficios
            </Link>
            <Link className="underline hover:text-[var(--primary)]" href="/contacto">
              Contacto
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} {brand}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

