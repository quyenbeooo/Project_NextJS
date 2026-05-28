"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search, User, ShoppingBag, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/dresses", label: "Thuê váy" },
  { href: "/orders", label: "Đơn thuê" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight transition-opacity hover:opacity-70">
          <ShoppingBag className="h-5 w-5" />
          <span className="text-lg">DressRental</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 hover:text-foreground link-underline",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" className="transition-all duration-200 hover:scale-105">
            <Search />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon-sm" className="relative transition-all duration-200 hover:scale-105">
              <ShoppingCart />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                2
              </span>
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
              <User />
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="transition-all duration-200 hover:scale-105">
              Đăng ký
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden transition-transform duration-200"
          onClick={() => setOpen(!open)}
        >
          <div className={cn("transition-transform duration-300", open && "rotate-90")}>
            {open ? <X /> : <Menu />}
          </div>
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border bg-background transition-all duration-300 ease-in-out",
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {navLinks.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="my-2 border-t border-border" />
          <Link href="/cart" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full transition-all duration-200 hover:scale-[1.02]" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Giỏ hàng (2)
            </Button>
          </Link>
          <Link href="/login" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full transition-all duration-200 hover:scale-[1.02] mt-1" size="sm">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register" onClick={() => setOpen(false)}>
            <Button className="w-full mt-1 transition-all duration-200 hover:scale-[1.02]" size="sm">
              Đăng ký
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
