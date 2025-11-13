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
  let imageUrl: string | undefined;
  let videoUrl: string | undefined;
  let posterUrl: string | undefined;

  if (!asset) return null;

  if (typeof asset === "string") {
    imageUrl = asset;
  } else {
    const maybeVideo = (asset as any).video as string | undefined;
    const maybePoster = (asset as any).poster as string | undefined;
    const maybeImage = (asset as any).image as string | undefined;
    const maybeUrl   = (asset as any).url   as string | undefined;
    const maybeMime  = (asset as any).mimeType as string | undefined;

    if (maybeVideo) {
      videoUrl = maybeVideo;
      posterUrl = maybePoster || maybeImage || maybeUrl;
    } else if (maybeImage) {
      imageUrl = maybeImage;
    } else if (maybeUrl) {
      if (maybeMime?.startsWith("video/")) videoUrl = maybeUrl;
      else imageUrl = maybeUrl;
    }
  }

  // 👇 Importante: sin z negativo
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
        />
      ) : null}
    </div>
  );
}
