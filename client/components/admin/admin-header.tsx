"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Shirt,
  ShoppingCart,
  Users,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dresses", label: "Váy", icon: Shirt },
  { href: "/admin/orders", label: "Đơn thuê", icon: ShoppingCart },
  { href: "/admin/users", label: "Người dùng", icon: Users },
];

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 font-bold lg:hidden">
          <ShoppingBag className="h-4 w-4" />
          <span className="text-sm">Admin</span>
        </div>

        <div className="flex-1" />

        {/* User */}
        <div className="flex items-center gap-2 text-sm">
          <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
            A
          </div>
          <span className="hidden sm:inline font-medium">Admin</span>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-60 bg-background border-r border-border">
            <div className="flex h-14 items-center justify-between border-b border-border px-4 font-bold">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span>DressRental</span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
            <nav className="space-y-1 px-3 py-4">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <l.icon className="h-4 w-4" />
                    {l.label}
                  </Link>
                );
              })}
              <div className="my-2 border-t border-border" />
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Về trang chủ
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
