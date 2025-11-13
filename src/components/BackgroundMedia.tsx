"use client";
import Image from "next/image";

type AssetUnion =
  | string
  | {
      image?: string;
      video?: string;
      poster?: string;
    }
  | {
      url?: string;
      mimeType?: string;
      metadata?: { dimensions?: { width: number; height: number } };
    };

/**
 * Si la URL proviene del CDN de Sanity y no trae params,
 * le agregamos auto=format y un ancho razonable para fondo.
 */
const withFormat = (u?: string, w = 1920) => {
  if (!u) return u;
  const isSanity = /sanity\.io\/images\//.test(u);
  const hasParams = u.includes("?");
  const hasAuto = /(^|[?&])auto=/.test(u);
  return isSanity && !hasAuto ? `${u}${hasParams ? "&" : "?"}auto=format&w=${w}` : u;
};

export default function BackgroundMedia({
  asset,
  alt = "",
  className = "",
  priority = false,
}: {
  asset?: AssetUnion;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!asset) return null;

  let imageUrl: string | undefined;
  let videoUrl: string | undefined;
  let posterUrl: string | undefined;

  if (typeof asset === "string") {
    imageUrl = withFormat(asset);
  } else {
    const a = asset as any;
    const maybeUrl = a.url as string | undefined;
    const maybeMime = a.mimeType as string | undefined;

    if (a.video) {
      videoUrl = a.video as string;
      posterUrl = withFormat(a.poster || a.image || maybeUrl);
    } else if (a.image) {
      imageUrl = withFormat(a.image as string);
    } else if (maybeUrl) {
      if (maybeMime?.startsWith("video/")) {
        videoUrl = maybeUrl;
        posterUrl = withFormat(a.poster || a.image);
      } else {
        imageUrl = withFormat(maybeUrl);
      }
    }
  }

  // z-0 (no negativo) para no quedar debajo de overlays globales
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      {videoUrl ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
          preload="auto"
        >
          <source src={videoUrl} />
        </video>
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={priority}
          // Fondo full-bleed: evitamos reprocesado/timeout en Vercel
          unoptimized={true}
        />
      ) : null}
    </div>
  );
}
