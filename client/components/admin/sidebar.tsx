"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Shirt, ShoppingCart, Users,
  CalendarDays, Star, LogOut, Settings, ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dresses", label: "Quản lý váy", icon: Shirt },
  { href: "/admin/orders", label: "Đơn thuê", icon: ShoppingCart },
  { href: "/admin/bookings", label: "Lịch thuê", icon: CalendarDays },
  { href: "/admin/users", label: "Người dùng", icon: Users },
  { href: "/admin/reviews", label: "Đánh giá", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-border lg:bg-muted/30">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4 font-bold">
        <ShoppingBag className="h-5 w-5" />
        <span>DressRental</span>
        <span className="rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background">Admin</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link key={l.href} href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3 space-y-1">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
          <LogOut className="h-4 w-4" />Về trang chủ
        </Link>
      </div>
    </aside>
  );
}
