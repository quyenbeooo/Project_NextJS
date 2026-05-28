"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CreditCard, Truck, Check, Building2, Wallet, QrCode, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dresses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

const paymentMethods = [
  { id: "cod", label: "Thanh toán khi nhận hàng", icon: Wallet, desc: "Trả tiền mặt khi nhận váy" },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: Building2, desc: "Chuyển khoản trước" },
  { id: "vnpay", label: "VNPay QR", icon: QrCode, desc: "Thanh toán qua VNPay" },
];

export default function DressCheckoutPage() {
  const params = useParams();
  const dress = dresses.find((d) => d.id === params.id);
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("cod");

  if (!dress) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Không tìm thấy váy.</p>
        <Link href="/dresses"><Button variant="link">Quay lại</Button></Link>
      </div>
    );
  }

  const deposit = dress.deposit;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 page-enter">
      <Link href={`/dresses/${dress.id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-all hover:translate-x-[-4px]">
        <ArrowLeft className="h-4 w-4" />Quay lại chi tiết váy
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-2 animate-fade-in-up">Đặt cọc thuê váy</h1>
      <p className="text-muted-foreground mb-8 animate-fade-in-up delay-100">Hoàn tất đặt cọc để giữ váy cho bạn.</p>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-10 animate-fade-in-up delay-100">
        {[{ num: 1, label: "Thông tin" }, { num: 2, label: "Thanh toán" }, { num: 3, label: "Xác nhận" }].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all",
              step >= s.num ? "bg-foreground text-background" : "bg-muted text-muted-foreground")}>
              {step > s.num ? <Check className="h-4 w-4" /> : s.num}
            </div>
            <span className={cn("text-sm font-medium", step >= s.num ? "text-foreground" : "text-muted-foreground")}>{s.label}</span>
            {i < 2 && <div className="w-12 h-px bg-border mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Step 1 */}
          {step === 1 && (
            <Card className="animate-slide-in-right">
              <CardHeader><CardTitle className="text-base">Thông tin giao hàng</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Họ tên</label>
                    <Input placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Số điện thoại</label>
                    <Input placeholder="0901 234 567" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Địa chỉ giao hàng</label>
                  <Input placeholder="Số nhà, đường, phường/xã, quận, thành phố" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Ghi chú (tùy chọn)</label>
                  <Input placeholder="Thời gian giao, yêu cầu đặc biệt..." />
                </div>
                <Button onClick={() => setStep(2)} className="w-full">Tiếp tục</Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <Card className="animate-slide-in-right">
              <CardHeader><CardTitle className="text-base">Phương thức thanh toán đặt cọc</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((pm) => (
                  <label key={pm.id}
                    className={cn("flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all",
                      payment === pm.id ? "border-foreground bg-muted/50" : "border-border hover:border-foreground/40")}>
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
                    <p className="font-medium">Chuyển khoản đến:</p>
                    <p className="text-muted-foreground">Vietcombank - 1234567890</p>
                    <p className="text-muted-foreground">Chủ TK: DRESS RENTAL LTD</p>
                    <p className="text-muted-foreground">Nội dung: [Tên] - [SĐT] - Đặt cọc {dress.name}</p>
                  </div>
                )}
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Quay lại</Button>
                  <Button onClick={() => setStep(3)} className="flex-1">Xác nhận đặt cọc</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <Card className="animate-scale-in">
              <CardContent className="py-8 text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold">Đặt cọc thành công!</h2>
                <p className="text-muted-foreground text-sm">
                  Váy <span className="font-medium text-foreground">{dress.name}</span> đã được giữ cho bạn.
                  <br />Vui lòng thanh toán đặt cọc để hoàn tất.
                </p>
                <div className="rounded-lg border border-border p-4 text-sm space-y-1 text-left max-w-xs mx-auto">
                  <p><span className="text-muted-foreground">Đặt cọc:</span> <span className="font-bold">{formatPrice(deposit)}</span></p>
                  <p><span className="text-muted-foreground">Thanh toán:</span> {payment === "cod" ? "COD khi nhận" : payment === "bank" ? "Chuyển khoản" : "VNPay"}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Link href="/orders"><Button>Đơn thuê của tôi</Button></Link>
                  <Link href="/dresses"><Button variant="outline">Tiếp tục thuê</Button></Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary */}
        <div className="animate-fade-in-up delay-200">
          <Card className="sticky top-20">
            <CardHeader><CardTitle className="text-base">Đơn đặt cọc</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="h-20 w-16 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">Ảnh</div>
                <div>
                  <p className="text-sm font-semibold">{dress.name}</p>
                  <p className="text-xs text-muted-foreground">{dress.color} · {dress.category}</p>
                </div>
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Giá thuê/ngày</span><span>{formatPrice(dress.price)}</span></div>
                <div className="flex justify-between font-bold border-t border-border pt-2">
                  <span>Đặt cọc</span><span>{formatPrice(deposit)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
                <Shield className="h-4 w-4 shrink-0" />
                Đặt cọc sẽ được hoàn lại khi bạn trả váy đúng hạn.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
