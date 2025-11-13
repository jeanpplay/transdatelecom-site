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
    imageUrl = asset;
  } else {
    const a = asset as any;
    const maybeUrl = a.url as string | undefined;
    const maybeMime = a.mimeType as string | undefined;

    if (a.video) {
      videoUrl = a.video as string;
      posterUrl = a.poster || a.image || maybeUrl;
    } else if (a.image) {
      imageUrl = a.image as string;
    } else if (maybeUrl) {
      if (maybeMime?.startsWith("video/")) videoUrl = maybeUrl;
      else imageUrl = maybeUrl;
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
          // Fondo full-bleed: evitar reprocesado si algo quedara fuera del allowlist
          unoptimized={false}
        />
      ) : null}
    </div>
  );
}
