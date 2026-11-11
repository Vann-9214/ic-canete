"use client";

import React, { useState } from "react";
import { FolderCode } from "lucide-react";

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = "",
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`bg-muted flex flex-col items-center justify-center gap-2 text-text-muted font-mono text-xs ${className}`}
        role="img"
        aria-label={alt || "Preview unavailable"}
      >
        <FolderCode size={24} className="opacity-60" aria-hidden="true" />
        <span>Preview unavailable</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`outline-1 -outline-offset-1 outline-image-outline object-cover ${className}`}
    />
  );
}
