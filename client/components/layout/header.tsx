"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/dresses", label: "Thuê váy" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <ShoppingBag className="h-5 w-5" />
          <span className="text-lg">DressRental</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon-sm">
            <Search />
          </Button>
          <Link href="/login">
            <Button variant="outline" size="sm">
              <User />
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Đăng ký</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full" size="sm">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button className="w-full mt-1" size="sm">
                Đăng ký
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
