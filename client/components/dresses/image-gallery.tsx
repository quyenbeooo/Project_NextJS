"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ImageGalleryProps {
  images: { id: string; color: string; label: string }[];
  available: boolean;
}

export default function ImageGallery({ images, available }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-muted">
        <div
          className="flex h-full items-center justify-center text-sm font-medium text-white"
          style={{ backgroundColor: images[selected].color }}
        >
          {images[selected].label}
        </div>
        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Badge variant="secondary">Đã được thuê</Badge>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setSelected(i)}
            className={cn(
              "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-20",
              selected === i
                ? "border-foreground"
                : "border-border opacity-60 hover:opacity-100"
            )}
          >
            <div
              className="flex h-full items-center justify-center text-[10px] font-medium text-white"
              style={{ backgroundColor: img.color }}
            >
              {img.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
