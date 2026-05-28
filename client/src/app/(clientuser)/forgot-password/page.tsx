"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Thiếu email", { description: "Vui lòng nhập email." });
      return;
    }
    setSent(true);
    toast.success("Đã gửi email!", { description: "Kiểm tra hộp thư của bạn." });
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col justify-center flex-1 px-6 py-12 sm:px-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-10">
            <ShoppingBag className="h-6 w-6" />DressRental
          </Link>

          {sent ? (
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Kiểm tra email</h1>
              <p className="text-muted-foreground mb-6">Chúng tôi đã gửi link đặt lại mật khẩu đến <span className="font-medium text-foreground">{email}</span>.</p>
              <Link href="/login">
                <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" />Quay lại đăng nhập</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold tracking-tight">Quên mật khẩu?</h1>
              <p className="mt-2 text-muted-foreground">Nhập email và chúng tôi sẽ gửi link đặt lại.</p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9 h-11" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 text-base">Gửi link đặt lại</Button>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                <Link href="/login" className="font-semibold text-foreground hover:underline inline-flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" />Quay lại đăng nhập
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-muted items-center justify-center">
        <div className="text-center px-12">
          <div className="text-6xl mb-6">🔑</div>
          <h2 className="text-2xl font-bold mb-3">Đừng lo lắng</h2>
          <p className="text-muted-foreground">Chỉ cần email đúng, bạn sẽ lấy lại tài khoản trong vài bước.</p>
        </div>
      </div>
    </div>
  );
}
