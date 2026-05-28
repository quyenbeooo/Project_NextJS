import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shirt,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";
import { dresses, orders, users } from "@/lib/mock-data";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

const stats = [
  {
    title: "Tổng váy",
    value: dresses.length,
    icon: Shirt,
    desc: `${dresses.filter((d) => d.available).length} còn trống`,
  },
  {
    title: "Đơn thuê",
    value: orders.length,
    icon: ShoppingCart,
    desc: `${orders.filter((o) => o.status === "pending").length} chờ xử lý`,
  },
  {
    title: "Người dùng",
    value: users.length,
    icon: Users,
    desc: `${users.filter((u) => u.role === "user").length} khách hàng`,
  },
  {
    title: "Doanh thu",
    value: formatPrice(orders.reduce((sum, o) => sum + o.totalPrice, 0)),
    icon: DollarSign,
    desc: "Từ các đơn đã xác nhận",
  },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Chờ xử lý", variant: "secondary" },
  confirmed: { label: "Đã xác nhận", variant: "default" },
  shipping: { label: "Đang giao", variant: "outline" },
  renting: { label: "Đang thuê", variant: "default" },
  returned: { label: "Đã trả", variant: "secondary" },
  completed: { label: "Hoàn tất", variant: "outline" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
};

export default function AdminDashboardPage() {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.title}
              </CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Đơn gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((o) => {
              const st = statusMap[o.status];
              return (
                <div
                  key={o.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{o.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.customerName} — {o.dressName}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={st.variant}>{st.label}</Badge>
                    <span className="text-sm font-medium">{formatPrice(o.totalPrice)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
