"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Truck, Check, Building2, Wallet, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/lib/stores/cart-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

function calcDays(start: string, end: string) {
  return Math.max(1, Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)));
}

const paymentMethods = [
  { id: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: Wallet, desc: "Trả tiền mặt khi nhận váy" },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: Building2, desc: "Chuyển khoản trước khi giao hàng" },
  { id: "vnpay", label: "VNPay", icon: QrCode, desc: "Thanh toán qua VNPay QR" },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("cod");
  const { items, subtotal, clearCart } = useCartStore();
  const deposit = Math.round(subtotal() * 0.3);

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
          { num: 3, label: "Thanh toán", icon: Wallet },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
              step >= s.num ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
            )}>
              {step > s.num ? <Check className="h-4 w-4" /> : s.num}
            </div>
            <span className={cn("text-sm font-medium", step >= s.num ? "text-foreground" : "text-muted-foreground")}>
              {s.label}
            </span>
            {i < 2 && <div className="w-12 h-px bg-border mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Step 1: Info */}
          {step === 1 && (
            <Card className="animate-slide-in-right">
              <CardHeader><CardTitle className="text-base">Thông tin giao hàng</CardTitle></CardHeader>
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
                  <label className="text-sm font-medium">Địa chỉ giao hàng</label>
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
                <Button onClick={() => setStep(2)} className="w-full transition-all duration-200 hover:scale-[1.02]" size="lg">Tiếp tục</Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <Card className="animate-slide-in-right">
              <CardHeader><CardTitle className="text-base">Phương thức giao hàng</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Giao hàng tiêu chuẩn", desc: "2-3 ngày làm việc", price: 0 },
                  { label: "Giao hàng nhanh", desc: "1 ngày làm việc", price: 30000 },
                  { label: "Tự đến nhận tại shop", desc: "Quận 1, TP.HCM", price: 0 },
                ].map((opt) => (
                  <label key={opt.label} className="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer transition-all duration-200 hover:border-foreground/40 has-[:checked]:border-foreground has-[:checked]:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" defaultChecked={opt.price === 0} className="rounded border-border" />
                      <div>
                        <p className="text-sm font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{opt.price === 0 ? "Miễn phí" : formatPrice(opt.price)}</span>
                  </label>
                ))}
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Quay lại</Button>
                  <Button onClick={() => setStep(3)} className="flex-1 transition-all duration-200 hover:scale-[1.02]">Tiếp tục</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <Card className="animate-slide-in-right">
              <CardHeader><CardTitle className="text-base">Phương thức thanh toán</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((pm) => (
                  <label
                    key={pm.id}
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all duration-200",
                      payment === pm.id
                        ? "border-foreground bg-muted/50"
                        : "border-border hover:border-foreground/40"
                    )}
                  >
                    <input type="radio" name="payment" checked={payment === pm.id} onChange={() => setPayment(pm.id)} className="rounded border-border" />
                    <pm.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{pm.label}</p>
                      <p className="text-xs text-muted-foreground">{pm.desc}</p>
                    </div>
                  </label>
                ))}

                {payment === "bank" && (
                  <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm space-y-1">
                    <p className="font-medium">Thông tin chuyển khoản:</p>
                    <p className="text-muted-foreground">Ngân hàng: Vietcombank</p>
                    <p className="text-muted-foreground">Số TK: 1234567890</p>
                    <p className="text-muted-foreground">Chủ TK: DRESS RENTAL LTD</p>
                    <p className="text-muted-foreground">Nội dung: [Tên] - [SĐT]</p>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Quay lại</Button>
                  <Link href="/orders" className="flex-1" onClick={() => {
                    clearCart();
                    toast.success("Đặt hàng thành công!", {
                      description: "Đơn hàng của bạn đang chờ xác nhận. Bạn sẽ nhận email xác nhận trong vài phút.",
                    });
                  }}>
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
            <CardHeader><CardTitle className="text-base">Đơn hàng của bạn</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => {
                const days = calcDays(item.startDate, item.endDate);
                return (
                  <div key={`${item.dressId}-${item.size}`} className="flex gap-3">
                    <div className="h-14 w-12 flex-shrink-0 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">Ảnh</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Size {item.size} · {days} ngày × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(item.price * days * item.quantity)}</span>
                  </div>
                );
              })}
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Đặt cọc</span>
                  <span>{formatPrice(deposit)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Tổng thanh toán</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
