import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { dresses } from "@/lib/mock-data";
import ImageGallery from "@/components/dresses/image-gallery";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

export function generateStaticParams() {
  return dresses.map((d) => ({ id: d.id }));
}

export default async function DressDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dress = dresses.find((d) => d.id === id);
  if (!dress) notFound();

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
          <ImageGallery images={dress.images} available={dress.available} />
        </div>

        {/* Info */}
        <div className="flex flex-col animate-fade-in-up">
          <Badge variant="outline" className="w-fit mb-3">
            {dress.category}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">{dress.name}</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dress.description}
          </p>

          {/* Price card */}
          <Card className="mt-6 hover-lift">
            <CardContent className="gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{formatPrice(dress.price)}</span>
                <span className="text-sm text-muted-foreground">/ngày</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Đặt cọc: {formatPrice(dress.deposit)}
              </p>
            </CardContent>
          </Card>

          {/* Details */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm animate-fade-in-up delay-100">
              <span className="font-medium w-24">Màu sắc</span>
              <span className="text-muted-foreground">{dress.color}</span>
            </div>
            <div className="flex items-center gap-2 text-sm animate-fade-in-up delay-200">
              <span className="font-medium w-24">Kích cỡ</span>
              <div className="flex gap-1.5">
                {dress.size.map((s) => (
                  <Badge key={s} variant="secondary" className="transition-transform duration-200 hover:scale-110">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm animate-fade-in-up delay-300">
              <span className="font-medium w-24">Tình trạng</span>
              {dress.available ? (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Check className="h-4 w-4" />
                  Còn trống
                </span>
              ) : (
                <Badge variant="destructive">Đã thuê</Badge>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-3 animate-fade-in-up delay-400">
            <Button size="lg" className="flex-1 transition-all duration-200 hover:scale-105 hover:shadow-lg" disabled={!dress.available}>
              Thuê ngay
            </Button>
            <Button size="lg" variant="outline" className="transition-all duration-200 hover:scale-105">
              Liên hệ tư vấn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
