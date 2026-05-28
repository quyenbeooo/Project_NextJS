"use client";

import Link from "next/link";
import { User, Mail, Phone, Package, Heart, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { orders } from "@/lib/mock-data";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const wishlistCount = useWishlistStore((s) => s.count());

  const menuItems = [
    { href: "/orders", label: "Đơn thuê của tôi", icon: Package, desc: `${orders.length} đơn hàng` },
    { href: "/wishlist", label: "Yêu thích", icon: Heart, desc: `${wishlistCount} sản phẩm` },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 page-enter">
      <h1 className="text-3xl font-bold tracking-tight mb-8 animate-fade-in-up">Tài khoản</h1>

      {/* User info */}
      <Card className="mb-6 animate-fade-in-up delay-100">
        <CardContent className="flex items-center gap-4 pt-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-xl font-bold">
            {user?.name?.[0] || "U"}
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold">{user?.name || "Khách hàng"}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {user?.email || "Chưa đăng nhập"}
            </p>
            {user && "phone" in user && (user as any).phone && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {(user as any).phone}
              </p>
            )}
          </div>
          <Button variant="outline" size="sm">Chỉnh sửa</Button>
        </CardContent>
      </Card>

      {/* Menu */}
      <div className="space-y-3 animate-fade-in-up delay-200">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="flex items-center gap-4 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-8 animate-fade-in-up delay-300">
        <Button variant="outline" className="w-full" onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
