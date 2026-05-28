"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DressGrid from "@/components/dresses/dress-grid";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { dresses } from "@/lib/mock-data";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const wishlistDresses = dresses.filter((d) => ids.includes(d.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 page-enter">
      <h1 className="text-3xl font-bold tracking-tight mb-2 animate-fade-in-up">Yêu thích</h1>
      <p className="text-muted-foreground mb-8 animate-fade-in-up delay-100">
        {wishlistDresses.length} sản phẩm yêu thích
      </p>

      {wishlistDresses.length === 0 ? (
        <div className="py-20 text-center animate-fade-in">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-6">
            <Heart className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h2 className="text-xl font-bold mb-2">Chưa có sản phẩm yêu thích</h2>
          <p className="text-muted-foreground mb-6">Hãy duyệt catalog và thêm váy yêu thích.</p>
          <Link href="/dresses">
            <Button size="lg">
              Khám phá ngay <ArrowRight />
            </Button>
          </Link>
        </div>
      ) : (
        <DressGrid dresses={wishlistDresses} />
      )}
    </div>
  );
}
