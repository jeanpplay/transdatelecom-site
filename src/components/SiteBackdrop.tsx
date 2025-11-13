"use client";

export default function SiteBackdrop({
  variant = "topo", // "topo" | "grid"
  opacity = 0.18,   // intensidad global
}: { variant?: "topo" | "grid"; opacity?: number }) {
  // data-uri de noise 32x32 (tiny PNG) para textura muy sutil
  const noise =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsSAAALEgHS3X78AAAAPElEQVRYhe3QwQkAIBAEwWv//2mS8kYk6k8nQy0kR7EJw6cL6kQ1g9mW4S7k3ZzQ7o9i9jv2C9sK2s2O8XwQy8QvUu0O6kC6Q5c8v2A1gQ3bQAAAABJRU5ErkJggg==";

  const topo =
    // 1) dos luces radiales muy suaves + 2) líneas “contour” en diagonal
    "radial-gradient(1200px 800px at 50% -10%, rgba(255,255,255,.08), transparent 60%)," +
    "radial-gradient(900px 600px at 0% 60%, rgba(255,255,255,.05), transparent 60%)," +
    "repeating-linear-gradient(125deg, rgba(255,255,255,.07) 0 1px, transparent 1px 14px)";

  const grid =
    // 1) luz radial + 2) grid fino + 3) noise
    "radial-gradient(1000px 700px at 50% -10%, rgba(255,255,255,.08), transparent 60%)," +
    "linear-gradient(transparent, transparent)," + // placeholder para mezclar con CSS variables
    `url("${noise}")`;

  const styleTopo: React.CSSProperties = {
    backgroundImage: topo,
    backgroundBlendMode: "soft-light, soft-light, normal",
    backgroundSize: "cover, cover, 700px 700px",
    opacity,
  };

  const styleGrid: React.CSSProperties = {
    backgroundImage: grid,
    backgroundBlendMode: "soft-light, normal, soft-light",
    backgroundSize: "cover, 48px 48px, 320px 320px",
    backgroundPosition: "center, center, center",
    // definimos la rejilla con CSS vars (líneas muy sutiles)
    // sobreescribimos via style del div contenedor:
    // --grid-color controla la línea
  } as any;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={
        variant === "topo"
          ? styleTopo
          : {
              ...styleGrid,
              // grid: líneas horizontales/verticales superpuestas
              // (dos gradients finitos cuadrados)
              ["--tw-bg-grid" as any]:
                "repeating-linear-gradient(0deg, var(--grid-color) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, var(--grid-color) 0 1px, transparent 1px 48px)",
              backgroundImage:
                grid.replace(
                  "linear-gradient(transparent, transparent)",
                  "var(--tw-bg-grid)"
                ),
              ["--grid-color" as any]: "rgba(255,255,255,.06)",
              opacity,
            }
      }
    />
  );
}
