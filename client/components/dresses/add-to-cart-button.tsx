"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart-store";

interface AddToCartButtonProps {
  dressId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  startDate?: string;
  endDate?: string;
  available: boolean;
}

export default function AddToCartButton({
  dressId, name, price, size, color, startDate, endDate, available,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      dressId,
      name,
      price,
      size,
      color,
      quantity: 1,
      startDate: startDate || new Date().toISOString().split("T")[0],
      endDate: endDate || new Date().toISOString().split("T")[0],
      accessories: [],
    });
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
