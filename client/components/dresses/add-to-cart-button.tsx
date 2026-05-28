"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart-store";

interface AddToCartButtonProps {
  dressId: string;
  name: string;
  price: number;
  size: string;
  available: boolean;
}

export default function AddToCartButton({ dressId, name, price, size, available }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({ dressId, name, price, size });
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
      disabled={!available}
      onClick={handleAdd}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Thêm vào giỏ
    </Button>
  );
}
