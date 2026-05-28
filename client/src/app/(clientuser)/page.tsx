import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DressGrid from "@/components/dresses/dress-grid";
import { dresses } from "@/lib/mock-data";

const featured = dresses.filter((d) => d.available).slice(0, 4);

const steps = [
  { num: "01", title: "Chọn váy", desc: "Duyệt catalog và chọn váy yêu thích." },
  { num: "02", title: "Đặt thuê", desc: "Xác nhận đơn và đặt cọc trực tuyến." },
  { num: "03", title: "Nhận & Trả", desc: "Nhận váy đúng hẹn, trả sau sự kiện." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Tỏa sáng trong mọi{" "}
              <span className="underline decoration-2 underline-offset-4">
                dịp đặc biệt
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Cho thuê váy cao cấp với giá phải chăng. Từ váy cưới, dạ hội
              đến dự tiệc — bộ sưu tập đa dạng giúp bạn xinh đẹp nhất.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dresses">
                <Button size="lg">
                  Khám phá ngay <ArrowRight />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">
                  Đăng ký thành viên
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold">Cách thức thuê váy</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.num}>
                <CardContent className="items-center text-center gap-3 pt-2">
                  <span className="text-3xl font-bold text-muted-foreground/40">
                    {s.num}
                  </span>
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Váy nổi bật</h2>
          <Link
            href="/dresses"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
          >
            Xem tất cả &rarr;
          </Link>
        </div>
        <div className="mt-8">
          <DressGrid dresses={featured} />
        </div>
      </section>
    </div>
  );
}
