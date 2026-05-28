"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Check, X, Truck, Package, RotateCcw } from "lucide-react";
import { orders } from "@/lib/mock-data";
import type { OrderStatus } from "@/lib/mock-data";
import { toast } from "sonner";
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

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
  shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700" },
  renting: { label: "Đang thuê", color: "bg-green-100 text-green-700" },
  returned: { label: "Đã trả", color: "bg-orange-100 text-orange-700" },
  completed: { label: "Hoàn tất", color: "bg-gray-100 text-gray-700" },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
};

const nextStatus: Record<string, { status: OrderStatus; label: string; icon: any }[]> = {
  pending: [
    { status: "confirmed", label: "Xác nhận", icon: Check },
    { status: "cancelled", label: "Từ chối", icon: X },
  ],
  confirmed: [
    { status: "shipping", label: "Giao hàng", icon: Truck },
    { status: "cancelled", label: "Hủy", icon: X },
  ],
  shipping: [
    { status: "renting", label: "Khách nhận", icon: Package },
  ],
  renting: [
    { status: "returned", label: "Khách trả", icon: RotateCcw },
  ],
  returned: [
    { status: "completed", label: "Hoàn tất", icon: Check },
  ],
};

export default function AdminOrdersPage() {
  const [tab, setTab] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) => {
    if (tab !== "all" && o.status !== tab) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customerName.toLowerCase().includes(search.toLowerCase()) && !o.dressName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    toast.success(`Đã cập nhật trạng thái`, {
      description: `Đơn ${orderId} → ${statusConfig[newStatus]?.label || newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Quản lý đơn thuê</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {Object.entries(statusConfig).map(([key, val]) => (
          <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTab(key as OrderStatus)}>
            <CardContent className="pt-3 pb-3 text-center">
              <div className="text-lg font-bold">{orders.filter((o) => o.status === key).length}</div>
              <p className="text-[10px] text-muted-foreground">{val.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex flex-wrap gap-2 flex-1">
          {statusTabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all",
                tab === t.key ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground/40"
              )}
            >
              {t.label}
              {t.key !== "all" && <span className="ml-1">({orders.filter((o) => o.status === t.key).length})</span>}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm mã đơn, tên KH..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 text-sm" />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Váy</TableHead>
                <TableHead>Ngày thuê</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Thanh toán</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">Không có đơn hàng nào.</TableCell>
                </TableRow>
              ) : (
                filtered.map((o) => {
                  const st = statusConfig[o.status];
                  const actions = nextStatus[o.status] || [];
                  return (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium text-sm">{o.id}</TableCell>
                      <TableCell>
                        <p className="text-sm">{o.customerName}</p>
                        <p className="text-xs text-muted-foreground">{o.phone}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm line-clamp-1">{o.dressName}</p>
                        <p className="text-xs text-muted-foreground">Size {o.size} · {o.color}</p>
                      </TableCell>
                      <TableCell className="text-sm">{o.startDate} → {o.endDate}</TableCell>
                      <TableCell className="text-sm font-medium">{formatPrice(o.totalPrice)}</TableCell>
                      <TableCell className="text-xs">{o.paymentMethod}</TableCell>
                      <TableCell>
                        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", st?.color)}>
                          {st?.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {actions.map((a) => (
                            <Button key={a.status} variant={a.status === "cancelled" ? "destructive" : "default"} size="sm"
                              onClick={() => handleStatusChange(o.id, a.status)}>
                              <a.icon className="mr-1 h-3 w-3" />{a.label}
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
