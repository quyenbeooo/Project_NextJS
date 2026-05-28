"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { toast } from "sonner";

export default function WishlistButton({ dressId }: { dressId: string }) {
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(dressId));

  const handleToggle = () => {
    toggle(dressId);
    if (!isWishlisted) {
      toast.success("Đã thêm vào yêu thích", {
        description: "Sản phẩm đã được lưu vào danh sách yêu thích.",
      });
    } else {
      toast.info("Đã bỏ yêu thích", {
        description: "Sản phẩm đã được xóa khỏi danh sách yêu thích.",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggle();
      }}
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
