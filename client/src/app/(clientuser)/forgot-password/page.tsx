"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center justify-center px-4 py-20 page-enter">
      <Card className="w-full animate-scale-in">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-xl animate-fade-in-down">Quên mật khẩu</CardTitle>
          <CardDescription className="animate-fade-in-down delay-100">
            Nhập email để nhận link đặt lại mật khẩu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center space-y-4 animate-scale-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Đã gửi link đặt lại mật khẩu vào email của bạn. Vui lòng kiểm tra hộp thư.
              </p>
              <Link href="/login">
                <Button variant="link" className="text-sm">Quay lại đăng nhập</Button>
              </Link>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-9 transition-all duration-200 focus:scale-[1.02]" />
                </div>
              </div>
              <Button type="submit" className="w-full transition-all duration-200 hover:scale-[1.02]">
                Gửi link đặt lại
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                <Link href="/login" className="font-medium text-foreground hover:underline">
                  <ArrowLeft className="inline h-3 w-3 mr-1" />
                  Quay lại đăng nhập
                </Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
