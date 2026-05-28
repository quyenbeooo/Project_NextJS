"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Check, Clock, Truck, Package, RotateCcw,
  Star, XCircle, CalendarPlus, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

const statusIcons: Record<string, any> = {
  pending: Clock, confirmed: Check, shipping: Truck,
  renting: Package, returned: RotateCcw, completed: Check,
  cancelled: XCircle, expired: XCircle,
};

const statusLabels: Record<string, string> = {
  pending: "Chờ xử lý", confirmed: "Đã xác nhận", shipping: "Đang giao",
  renting: "Đang thuê", returned: "Đã trả", completed: "Hoàn tất",
  cancelled: "Đã hủy", expired: "Hết hạn",
};

export default function OrderDetailPage() {
  const params = useParams();
  const order = orders.find((o) => o.id === params.id);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center page-enter">
        <p className="text-muted-foreground">Không tìm thấy đơn hàng.</p>
        <Link href="/orders"><Button variant="link" className="mt-4">Quay lại danh sách</Button></Link>
      </div>
    );
  }

  const canCancel = order.status === "pending" || order.status === "confirmed";
  const canExtend = order.status === "renting";
  const canReturn = order.status === "renting";
  const canReview = order.status === "completed" && !order.review;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 page-enter">
      <Link href="/orders" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-[-4px]">
        <ArrowLeft className="h-4 w-4" />Quay lại đơn hàng
      </Link>

      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Đơn {order.id}</h1>
          <p className="text-muted-foreground text-sm">Tạo ngày {order.createdAt}</p>
        </div>
        <Badge variant={order.status === "cancelled" ? "destructive" : "default"} className="text-sm">
          {statusLabels[order.status]}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card className="animate-slide-in-right">
            <CardHeader><CardTitle className="text-base">Tiến trình đơn hàng</CardTitle></CardHeader>
            <CardContent>
              <div className="relative ml-3">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
                <div className="space-y-6">
                  {order.timeline.map((step, i) => {
                    const Icon = statusIcons[step.status] || Clock;
                    const isLast = i === order.timeline.length - 1;
                    return (
                      <div key={i} className="relative flex gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className={cn(
                          "relative z-10 flex h-6 w-6 items-center justify-center rounded-full",
                          isLast ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                        )}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center gap-2">
                            <p className={cn("text-sm font-medium", isLast ? "text-foreground" : "text-muted-foreground")}>
                              {statusLabels[step.status] || step.status}
                            </p>
                            <span className="text-xs text-muted-foreground">{step.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{step.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {(canCancel || canExtend || canReturn) && (
            <Card className="animate-fade-in-up">
              <CardHeader><CardTitle className="text-base">Thao tác</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {canExtend && (
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <CalendarPlus className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Gia hạn thuê</p>
                        <p className="text-xs text-muted-foreground">Gia hạn thêm ngày thuê</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Gia hạn</Button>
                  </div>
                )}
                {canReturn && (
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <RotateCcw className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Trả váy</p>
                        <p className="text-xs text-muted-foreground">Trả tại shop hoặc ship trả</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Trả váy</Button>
                  </div>
                )}
                {canCancel && (
                  <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50/50 p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-sm font-medium text-red-700">Hủy đơn hàng</p>
                        <p className="text-xs text-red-500">Chỉ hủy được khi chưa giao hàng</p>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">Hủy đơn</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Review */}
          {order.review && (
            <Card className="animate-fade-in-up">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Star className="h-4 w-4" />Đánh giá của bạn</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={cn("h-5 w-5", s <= order.review!.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")} />
                  ))}
                </div>
                <p className="text-sm">{order.review!.comment}</p>
                <p className="text-xs text-muted-foreground">{order.review!.date}</p>
              </CardContent>
            </Card>
          )}

          {canReview && (
            <Card className="animate-fade-in-up">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Star className="h-4 w-4" />Đánh giá sản phẩm</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Bạn đã thuê váy này. Hãy để lại đánh giá!</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setRating(s)}>
                      <Star className={cn("h-7 w-7 transition-all duration-200 hover:scale-110", s <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30 hover:text-yellow-200")} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Chia sẻ cảm nhận về váy..."
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none min-h-[100px]"
                />
                <Button onClick={() => { setSubmitted(true); setShowReview(false); }} disabled={rating === 0} className="transition-all duration-200 hover:scale-[1.02]">
                  Gửi đánh giá
                </Button>
              </CardContent>
            </Card>
          )}

          {submitted && (
            <Card className="animate-scale-in border-green-200 bg-green-50/50">
              <CardContent className="flex items-center gap-3 pt-4">
                <Check className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-700">Cảm ơn bạn đã đánh giá!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order info */}
        <div className="animate-fade-in-up delay-200">
          <Card className="sticky top-20">
            <CardHeader><CardTitle className="text-base">Thông tin đơn hàng</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="h-20 w-16 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">Ảnh</div>
                <div>
                  <Link href={`/dresses/${order.dressId}`} className="font-semibold text-sm hover:underline">{order.dressName}</Link>
                  <p className="text-xs text-muted-foreground">Size {order.size} · {order.color}</p>
                </div>
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Ngày thuê</span><span>{order.startDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Ngày trả</span><span>{order.endDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Thanh toán</span><span>{order.paymentMethod}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Đặt cọc</span><span>{formatPrice(order.deposit)}</span></div>
                <div className="flex justify-between font-bold border-t border-border pt-2">
                  <span>Tổng cộng</span><span>{formatPrice(order.totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
