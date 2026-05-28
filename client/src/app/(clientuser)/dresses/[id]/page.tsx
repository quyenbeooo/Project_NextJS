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
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/dresses"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image Gallery */}
        <ImageGallery images={dress.images} available={dress.available} />

        {/* Info */}
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit mb-3">
            {dress.category}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">{dress.name}</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dress.description}
          </p>

          {/* Price card */}
          <Card className="mt-6">
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
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium w-24">Màu sắc</span>
              <span className="text-muted-foreground">{dress.color}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium w-24">Kích cỡ</span>
              <div className="flex gap-1.5">
                {dress.size.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
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
          <div className="mt-8 flex gap-3">
            <Button size="lg" className="flex-1" disabled={!dress.available}>
              Thuê ngay
            </Button>
            <Button size="lg" variant="outline">
              Liên hệ tư vấn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
