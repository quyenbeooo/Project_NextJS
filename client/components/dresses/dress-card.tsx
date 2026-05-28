"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WishlistButton from "./wishlist-button";
import type { Dress } from "@/lib/mock-data";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

export default function DressCard({ dress, index = 0 }: { dress: Dress; index?: number }) {
  return (
    <Link href={`/dresses/${dress.id}`} className="group block">
      <Card className={`overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 animate-fade-in-up delay-${Math.min((index + 1) * 100, 500)}`}>
        {/* Image placeholder */}
        <div className="relative aspect-[3/4] bg-muted overflow-hidden">
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm transition-transform duration-500 group-hover:scale-110">
            Ảnh váy
          </div>
          {!dress.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 animate-fade-in">
              <Badge variant="secondary">
                {dress.status === "maintenance" ? "Bảo trì" : "Đã thuê"}
              </Badge>
            </div>
          )}
          {/* Wishlist button */}
          <div className="absolute top-2 right-2" onClick={(e) => e.preventDefault()}>
            <WishlistButton dressId={dress.id} />
          </div>
          {/* Rating */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur">
            ★ {dress.rating}
          </div>
        </div>

        <CardContent className="gap-2 transition-all duration-300">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-snug line-clamp-1 group-hover:underline">
              {dress.name}
            </h3>
            <Badge variant="outline" className="shrink-0 text-[10px]">
              {dress.category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {dress.color} · {dress.material}
          </p>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-base font-bold">{formatPrice(dress.price)}</span>
            <span className="text-xs text-muted-foreground">/ngày</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
