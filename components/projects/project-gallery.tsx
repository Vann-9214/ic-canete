import React from "react";
import type { ProjectImage } from "@/lib/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

export interface ProjectGalleryProps {
  images?: ProjectImage[];
  projectTitle: string;
  className?: string;
}

export function ProjectGallery({
  images,
  projectTitle,
  className = "",
}: ProjectGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className={`mt-12 pt-12 border-t border-border-subtle ${className}`}>
      <h2 className="font-sans text-xl md:text-2xl font-semibold tracking-tight text-balance text-text-primary mb-6">
        Project Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <figure key={image.src || index} className="flex flex-col gap-2">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted relative border border-border-subtle">
              <ImageWithFallback
                src={image.src}
                alt={image.alt || `${projectTitle} picture ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {image.caption && image.caption.trim().length > 0 && (
              <figcaption className="text-xs font-mono text-text-muted">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
