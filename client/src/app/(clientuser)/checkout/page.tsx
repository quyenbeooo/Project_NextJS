"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCart } from "@/lib/mock-data";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const items = mockCart;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deposit = Math.round(subtotal * 0.5);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 page-enter">
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-[-4px]"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại giỏ hàng
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-8 animate-fade-in-up">Thanh toán</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-10 animate-fade-in-up delay-100">
        {[
          { num: 1, label: "Thông tin", icon: CreditCard },
          { num: 2, label: "Vận chuyển", icon: Truck },
          { num: 3, label: "Xác nhận", icon: Check },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                step >= s.num
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s.num ? <Check className="h-4 w-4" /> : s.num}
            </div>
            <span className={`text-sm font-medium ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
              {s.label}
            </span>
            {i < 2 && <div className="w-12 h-px bg-border mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <Card className="animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-base">Thông tin giao hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Họ và tên</label>
                    <Input placeholder="Nguyễn Văn A" className="transition-all duration-200 focus:scale-[1.02]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Số điện thoại</label>
                    <Input placeholder="0901 234 567" className="transition-all duration-200 focus:scale-[1.02]" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="you@example.com" className="transition-all duration-200 focus:scale-[1.02]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Địa chỉ</label>
                  <Input placeholder="Số nhà, đường, phường/xã" className="transition-all duration-200 focus:scale-[1.02]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Quận/Huyện</label>
                    <Input placeholder="Quận 1" className="transition-all duration-200 focus:scale-[1.02]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Tỉnh/Thành phố</label>
                    <Input placeholder="TP.HCM" className="transition-all duration-200 focus:scale-[1.02]" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Ghi chú (tùy chọn)</label>
                  <Input placeholder="Thời gian giao hàng mong muốn..." className="transition-all duration-200 focus:scale-[1.02]" />
                </div>
                <Button onClick={() => setStep(2)} className="w-full transition-all duration-200 hover:scale-[1.02]" size="lg">
                  Tiếp tục
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-base">Phương thức giao hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Giao hàng tiêu chuẩn", desc: "2-3 ngày làm việc", price: 0 },
                  { label: "Giao hàng nhanh", desc: "1 ngày làm việc", price: 30000 },
                  { label: "Tự đến nhận", desc: "Nhận tại cửa hàng", price: 0 },
                ].map((opt) => (
                  <label
                    key={opt.label}
                    className="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer transition-all duration-200 hover:border-foreground/40 has-[:checked]:border-foreground has-[:checked]:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" defaultChecked={opt.price === 0} className="rounded border-border" />
                      <div>
                        <p className="text-sm font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {opt.price === 0 ? "Miễn phí" : formatPrice(opt.price)}
                    </span>
                  </label>
                ))}
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Quay lại
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1 transition-all duration-200 hover:scale-[1.02]">
                    Tiếp tục
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-base">Xác nhận đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <p className="text-sm"><span className="font-medium">Họ tên:</span> Nguyễn Văn A</p>
                  <p className="text-sm"><span className="font-medium">SĐT:</span> 0901 234 567</p>
                  <p className="text-sm"><span className="font-medium">Địa chỉ:</span> Quận 1, TP.HCM</p>
                  <p className="text-sm"><span className="font-medium">Giao hàng:</span> Tiêu chuẩn (2-3 ngày)</p>
                </div>

                <div className="rounded-lg border border-border p-4 space-y-2">
                  {items.map((item) => (
                    <div key={item.dressId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Quay lại
                  </Button>
                  <Link href="/orders" className="flex-1">
                    <Button className="w-full transition-all duration-200 hover:scale-[1.02]">
                      Đặt hàng
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary */}
        <div className="animate-fade-in-up delay-200">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">Đơn hàng của bạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.dressId} className="flex gap-3">
                  <div className="h-14 w-12 flex-shrink-0 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                    Ảnh
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Size {item.size} x{item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Đặt cọc</span>
                  <span>{formatPrice(deposit)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Tổng thanh toán</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
