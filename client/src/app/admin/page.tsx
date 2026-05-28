"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shirt, ShoppingCart, Users, DollarSign, TrendingUp, Clock } from "lucide-react";
import { dresses, orders, users } from "@/lib/mock-data";
import { formatDate, formatDateTime } from "@/lib/date-utils";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

const statusLabels: Record<string, string> = {
  pending: "Chờ xử lý", confirmed: "Đã xác nhận", shipping: "Đang giao",
  renting: "Đang thuê", returned: "Đã trả", completed: "Hoàn tất", cancelled: "Đã hủy",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700", confirmed: "bg-blue-100 text-blue-700",
  shipping: "bg-purple-100 text-purple-700", renting: "bg-green-100 text-green-700",
  returned: "bg-orange-100 text-orange-700", completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const activeOrders = orders.filter((o) => ["shipping", "renting"].includes(o.status)).length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  const stats = [
    { title: "Doanh thu", value: formatPrice(totalRevenue), icon: DollarSign, change: "+12%", color: "text-green-600" },
    { title: "Đơn chờ xử lý", value: pendingOrders, icon: Clock, change: `${pendingOrders} đơn`, color: "text-yellow-600" },
    { title: "Đang cho thuê", value: activeOrders, icon: TrendingUp, change: `${activeOrders} đơn`, color: "text-blue-600" },
    { title: "Tổng váy", value: dresses.length, icon: Shirt, change: `${dresses.filter((d) => d.available).length} trống`, color: "text-muted-foreground" },
    { title: "Hoàn tất", value: completedOrders, icon: ShoppingCart, change: `${completedOrders} đơn`, color: "text-green-600" },
    { title: "Người dùng", value: users.length, icon: Users, change: `${users.filter((u) => u.role === "user").length} khách`, color: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader><CardTitle className="text-base">Đơn hàng gần đây</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{o.id} — {o.customerName}</p>
                  <p className="text-xs text-muted-foreground">{o.dressName} · Size {o.size} · {formatDate(o.startDate)} → {formatDate(o.endDate)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[o.status]}`}>
                    {statusLabels[o.status]}
                  </span>
                  <span className="text-sm font-medium">{formatPrice(o.totalPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dress status */}
      <Card>
        <CardHeader><CardTitle className="text-base">Trạng thái váy</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dresses.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="h-10 w-8 flex-shrink-0 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">Ảnh</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.category} · {d.color}</p>
                </div>
                <Badge variant={d.available ? "default" : "secondary"} className="text-[10px]">
                  {d.status === "available" ? "Còn trống" : d.status === "maintenance" ? "Bảo trì" : "Đã thuê"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
