"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Eye, EyeOff, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
    toast.success("Đăng ký thành công!", { description: "Chào mừng bạn đến với DressRental." });
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex flex-col justify-center flex-1 px-6 py-12 sm:px-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-10">
            <ShoppingBag className="h-6 w-6" />DressRental
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">Tạo tài khoản</h1>
          <p className="mt-2 text-muted-foreground">Bắt đầu hành trình thuê váy của bạn.</p>

          <form className="mt-8 space-y-4" onSubmit={handleRegister}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} className="pl-9 h-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="tel" placeholder="0901 234 567" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-9 h-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9 pr-9 h-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Tối thiểu 6 ký tự</p>
            </div>
            <Button type="submit" className="w-full h-11 text-base mt-2">Đăng ký</Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-semibold text-foreground hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>

      {/* Right - Brand */}
      <div className="hidden lg:flex flex-1 bg-muted items-center justify-center">
        <div className="text-center px-12">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-2xl font-bold mb-3">Tham gia DressRental</h2>
          <p className="text-muted-foreground">Đăng ký để nhận ưu đãi độc quyền và trải nghiệm thuê váy tiện lợi.</p>
        </div>
      </div>
    </div>
  );
}
