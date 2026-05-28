"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Ruler, ShoppingCart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dresses } from "@/lib/mock-data";
import { useCartStore } from "@/lib/stores/cart-store";
import { toast } from "sonner";
import ImageGallery from "@/components/dresses/image-gallery";
import WishlistButton from "@/components/dresses/wishlist-button";
import DateRangePicker from "@/components/dresses/date-range-picker";
import ReviewSection from "@/components/dresses/review-section";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

export default function DressDetailPage() {
  const params = useParams();
  const dress = dresses.find((d) => d.id === params.id);
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(dress?.variants[0]?.color || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!dress) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center page-enter">
        <p className="text-muted-foreground">Không tìm thấy váy.</p>
        <Link href="/dresses">
          <Button variant="link" className="mt-4">Quay lại danh sách</Button>
        </Link>
      </div>
    );
  }

  const selectedVariant = dress.variants.find((v) => v.color === selectedColor);
  const isAvailable = dress.status === "available" && selectedVariant?.available !== false;

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;
  const totalPrice = dress.price * days;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning("Chưa chọn kích cỡ", { description: "Vui lòng chọn size trước khi thêm vào giỏ." });
      return;
    }
    if (!startDate || !endDate) {
      toast.warning("Chưa chọn ngày thuê", { description: "Vui lòng chọn ngày nhận và ngày trả." });
      return;
    }
    addItem({
      dressId: dress.id,
      name: dress.name,
      price: dress.price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      startDate,
      endDate,
      accessories: [],
    });
    setAddedToCart(true);
    toast.success("Đã thêm vào giỏ hàng", {
      description: `${dress.name} (Size ${selectedSize}) - ${startDate} → ${endDate}`,
    });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 page-enter">
      <Link
        href="/dresses"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-[-4px]"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="animate-slide-in-right">
          <ImageGallery images={dress.images} available={isAvailable} />
        </div>

        {/* Info */}
        <div className="flex flex-col animate-fade-in-up">
          <div className="flex items-start justify-between">
            <Badge variant="outline" className="mb-3">{dress.category}</Badge>
            <WishlistButton dressId={dress.id} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{dress.name}</h1>

          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span>★ {dress.rating} ({dress.reviewCount} đánh giá)</span>
            <span>·</span>
            <span>{dress.material}</span>
            <span>·</span>
            <span>{dress.length}</span>
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed">{dress.description}</p>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{formatPrice(dress.price)}</span>
            <span className="text-sm text-muted-foreground">/ngày</span>
            <span className="text-sm text-muted-foreground ml-2">
              Đặt cọc: {formatPrice(dress.deposit)}
            </span>
          </div>

          {/* Status warning */}
          {dress.status === "maintenance" && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-700 animate-fade-in">
              <AlertTriangle className="h-4 w-4" />
              Váy đang bảo trì, chưa thể thuê.
            </div>
          )}

          {/* Color */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Màu sắc</p>
            <div className="flex flex-wrap gap-2">
              {dress.variants.map((v) => (
                <button
                  key={v.color}
                  onClick={() => {
                    if (v.available) {
                      setSelectedColor(v.color);
                    } else {
                      toast.error("Màu này đã hết", {
                        description: `${v.color} hiện đang được thuê. Vui lòng chọn màu khác.`,
                      });
                    }
                  }}
                  disabled={!v.available}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200",
                    selectedColor === v.color
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40",
                    !v.available && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: v.colorCode }} />
                  {v.color}
                  {!v.available && <span className="text-xs">(Hết)</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Kích cỡ</p>
            <div className="flex flex-wrap gap-2">
              {dress.size.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={cn(
                    "rounded-md border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    selectedSize === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Date picker */}
          <div className="mt-6">
            <DateRangePicker
              dressId={dress.id}
              onDateChange={(start, end) => { setStartDate(start); setEndDate(end); }}
            />
          </div>

          {/* Total */}
          {(startDate && endDate) && (
            <Card className="mt-4 animate-scale-in">
              <CardContent className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiền thuê ({days} ngày × {formatPrice(dress.price)})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-border pt-2">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Đặt cọc (trả khi trả váy)</span>
                  <span>{formatPrice(dress.deposit)}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <div className="mt-6 space-y-3 animate-fade-in-up delay-400">
            {addedToCart ? (
              <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-center text-sm font-medium text-green-700 animate-scale-in">
                Đã thêm vào giỏ hàng!
              </div>
            ) : (
              <Button
                size="lg"
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                disabled={!isAvailable || !selectedSize || !startDate || !endDate}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {!selectedSize ? "Chọn kích cỡ" : !startDate ? "Chọn ngày thuê" : "Thêm vào giỏ"}
              </Button>
            )}

            <div className="flex gap-3">
              <Button size="lg" variant="outline" className="flex-1 transition-all duration-200 hover:scale-105" disabled={!isAvailable}>
                Thuê ngay
              </Button>
              <Button size="lg" variant="outline" className="transition-all duration-200 hover:scale-105">
                Liên hệ tư vấn
              </Button>
            </div>

            <Link href={`/dresses/${dress.id}/try-on`}>
              <Button size="lg" variant="secondary" className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                <Ruler className="mr-2 h-4 w-4" />
                Thử váy — Xem size vừa
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <ReviewSection reviews={dress.reviews} rating={dress.rating} reviewCount={dress.reviewCount} />
      </div>
    </div>
  );
}
