"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.warning("Thiếu thông tin", { description: "Vui lòng điền đầy đủ họ tên, email và mật khẩu." });
      return;
    }
    if (password.length < 6) {
      toast.warning("Mật khẩu yếu", { description: "Mật khẩu phải có ít nhất 6 ký tự." });
      return;
    }
    toast.success("Đăng ký thành công", { description: "Vui lòng kiểm tra email để xác nhận tài khoản." });
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center justify-center px-4 py-20 page-enter">
      <Card className="w-full animate-scale-in">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-xl animate-fade-in-down">Đăng ký</CardTitle>
          <CardDescription className="animate-fade-in-down delay-100">Tạo tài khoản để bắt đầu thuê váy.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-1.5 animate-fade-in-up delay-200">
              <label htmlFor="name" className="text-sm font-medium">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} className="pl-9 transition-all duration-200 focus:scale-[1.02]" />
              </div>
            </div>
            <div className="space-y-1.5 animate-fade-in-up delay-200">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 transition-all duration-200 focus:scale-[1.02]" />
              </div>
            </div>
            <div className="space-y-1.5 animate-fade-in-up delay-300">
              <label htmlFor="phone" className="text-sm font-medium">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" type="tel" placeholder="0901 234 567" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-9 transition-all duration-200 focus:scale-[1.02]" />
              </div>
            </div>
            <div className="space-y-1.5 animate-fade-in-up delay-300">
              <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 transition-all duration-200 focus:scale-[1.02]" />
              </div>
              <p className="text-xs text-muted-foreground">Tối thiểu 6 ký tự</p>
            </div>
            <Button type="submit" className="w-full transition-all duration-200 hover:scale-[1.02] animate-fade-in-up delay-400">Đăng ký</Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground animate-fade-in delay-500">
            Đã có tài khoản? <Link href="/login" className="font-medium text-foreground hover:underline">Đăng nhập</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
