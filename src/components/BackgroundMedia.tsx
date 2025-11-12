"use client";
import Image from "next/image";

export default function BackgroundMedia({
  asset, alt = "", className = "", priority = false
}: {
  asset?: { url?: string; mimeType?: string; metadata?: { dimensions?: { width: number; height: number } } };
  alt?: string; className?: string; priority?: boolean;
}) {
  if (!asset?.url) return null;
  const isVideo = asset.mimeType?.startsWith("video");
  if (isVideo) {
    return (
      <video
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        src={asset.url}
        autoPlay muted loop playsInline
      />
    );
  }
  return (
    <Image
      src={asset.url}
      alt={alt}
      fill
      sizes="100vw"
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
