"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/lib/mock-data";
import type { OrderStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

const statusTabs: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xử lý" },
  { key: "confirmed", label: "Đã xác nhận" },
  { key: "shipping", label: "Đang giao" },
  { key: "renting", label: "Đang thuê" },
  { key: "returned", label: "Đã trả" },
  { key: "completed", label: "Hoàn tất" },
  { key: "cancelled", label: "Đã hủy" },
];

const statusConfig: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Chờ xử lý", variant: "secondary" },
  confirmed: { label: "Đã xác nhận", variant: "default" },
  shipping: { label: "Đang giao", variant: "outline" },
  renting: { label: "Đang thuê", variant: "default" },
  returned: { label: "Đã trả", variant: "secondary" },
  completed: { label: "Hoàn tất", variant: "outline" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

export default function OrdersPage() {
  const [tab, setTab] = useState<OrderStatus | "all">("all");

  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 page-enter">
      <h1 className="text-3xl font-bold tracking-tight mb-2 animate-fade-in-up">Đơn thuê của tôi</h1>
      <p className="text-muted-foreground mb-6 animate-fade-in-up delay-100">Quản lý và theo dõi đơn hàng</p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up delay-200">
        {statusTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-full px-3.5 py-1 text-sm font-medium border transition-all duration-200",
              tab === t.key
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center animate-fade-in">
          <Package className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Không có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order, i) => {
            const st = statusConfig[order.status];
            return (
              <Card key={order.id} className={`animate-fade-in-up delay-${Math.min((i + 1) * 100, 500)}`}>
                <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                  {/* Image */}
                  <div className="h-20 w-16 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    Ảnh
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{order.dressName}</p>
                      <Badge variant={st.variant}>{st.label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Mã đơn: {order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Size {order.size} · {order.startDate} → {order.endDate}
                    </p>
                    <p className="text-sm font-medium mt-1">{formatPrice(order.totalPrice)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 sm:flex-col">
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        Chi tiết
                      </Button>
                    </Link>
                    {order.status === "completed" && !order.review && (
                      <Link href={`/orders/${order.id}?review=true`}>
                        <Button size="sm">
                          <Star className="mr-1 h-3.5 w-3.5" />
                          Đánh giá
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
