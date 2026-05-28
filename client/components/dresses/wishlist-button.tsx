"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/lib/stores/wishlist-store";

export default function WishlistButton({ dressId }: { dressId: string }) {
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(dressId));

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => toggle(dressId)}
      className="transition-all duration-200 hover:scale-110"
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-muted-foreground"
        )}
      />
    </Button>
  );
}
