"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCart } from "@/lib/mock-data";
import type { CartItem } from "@/lib/mock-data";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(mockCart);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.dressId === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.dressId !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deposit = items.reduce((sum, item) => sum + item.price * item.quantity * 0.5, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center page-enter">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Giỏ hàng trống</h1>
        <p className="text-muted-foreground mb-6">Hãy thêm váy yêu thích vào giỏ hàng.</p>
        <Link href="/dresses">
          <Button size="lg">
            Mua sắm ngay <ArrowRight />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 page-enter">
      <h1 className="text-3xl font-bold tracking-tight mb-2 animate-fade-in-up">Giỏ hàng</h1>
      <p className="text-muted-foreground mb-8 animate-fade-in-up delay-100">{items.length} sản phẩm trong giỏ</p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (
            <Card key={item.dressId} className={`animate-fade-in-up delay-${(i + 1) * 100}`}>
              <CardContent className="flex gap-4 pt-4">
                {/* Image */}
                <div className="h-24 w-20 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  Ảnh
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/dresses/${item.dressId}`} className="font-semibold hover:underline line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-0.5">Size: {item.size}</p>
                  <p className="text-sm font-medium mt-1">{formatPrice(item.price)}/ngày</p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => updateQty(item.dressId, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => updateQty(item.dressId, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                      <Button variant="ghost" size="icon-xs" onClick={() => removeItem(item.dressId)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="animate-fade-in-up delay-300">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Đặt cọc (ước tính)</span>
                <span>{formatPrice(deposit)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span>Tổng cộng</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <Link href="/checkout" className="block mt-4">
                <Button className="w-full transition-all duration-200 hover:scale-[1.02]" size="lg">
                  Tiến hành thanh toán
                </Button>
              </Link>
              <Link href="/dresses" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
