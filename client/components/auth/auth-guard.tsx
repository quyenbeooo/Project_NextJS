"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore } from "@/lib/stores/auth-store";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
  message?: string;
}

export default function AuthGuard({ children, message }: AuthGuardProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuthStore();

  if (user) return <>{children}</>;

  if (!showLogin) {
    return (
      <div className="relative">
        <div className="pointer-events-none opacity-50">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-xl">
          <Button onClick={() => setShowLogin(true)} className="shadow-lg">
            <Lock className="mr-2 h-4 w-4" />
            {message || "Đăng nhập để tiếp tục"}
          </Button>
        </div>
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Thiếu thông tin", { description: "Vui lòng nhập email và mật khẩu." });
      return;
    }
    login({ id: "U02", name: "Khách hàng", email, role: "user" });
    toast.success("Đăng nhập thành công!");
    setShowLogin(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-sm animate-scale-in">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-2">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">Đăng nhập</CardTitle>
          <CardDescription>Bạn cần đăng nhập để sử dụng tính năng này.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 pr-9" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">Đăng nhập</Button>
          </form>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowLogin(false)}>Hủy</Button>
            <Link href="/register" className="flex-1">
              <Button variant="secondary" className="w-full">Đăng ký</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
