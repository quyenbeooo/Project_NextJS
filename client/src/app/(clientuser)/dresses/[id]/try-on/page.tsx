"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Ruler, User, Scale, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SizeSuggestion from "@/components/dresses/size-suggestion";
import { dresses } from "@/lib/mock-data";

interface BodyMetrics {
  height: string;
  weight: string;
  bust: string;
  waist: string;
  hips: string;
}

function calculateSize(m: BodyMetrics, dressSizes: string[]) {
  const h = parseFloat(m.height) || 0;
  const w = parseFloat(m.weight) || 0;
  const b = parseFloat(m.bust) || 0;
  const waist = parseFloat(m.waist) || 0;
  const hips = parseFloat(m.hips) || 0;

  if (!h && !w && !b && !waist && !hips) return null;

  // Simple size estimation based on measurements
  let estimatedSize = "M";
  if (b > 0 || waist > 0) {
    if (b <= 80 && waist <= 62) estimatedSize = "XS";
    else if (b <= 86 && waist <= 68) estimatedSize = "S";
    else if (b <= 92 && waist <= 76) estimatedSize = "M";
    else if (b <= 100 && waist <= 84) estimatedSize = "L";
    else estimatedSize = "XL";
  } else if (w > 0 && h > 0) {
    const bmi = w / ((h / 100) ** 2);
    if (bmi < 17) estimatedSize = "XS";
    else if (bmi < 19) estimatedSize = "S";
    else if (bmi < 23) estimatedSize = "M";
    else if (bmi < 27) estimatedSize = "L";
    else estimatedSize = "XL";
  }

  const sizeOrder = ["XS", "S", "M", "L", "XL"];
  const estimatedIndex = sizeOrder.indexOf(estimatedSize);
  const availableIndices = dressSizes.map((s) => sizeOrder.indexOf(s)).filter((i) => i >= 0);

  // Find best available size
  let bestSize = dressSizes[0];
  let minDist = Infinity;
  availableIndices.forEach((idx) => {
    const dist = Math.abs(idx - estimatedIndex);
    if (dist < minDist) {
      minDist = dist;
      bestSize = sizeOrder[idx];
    }
  });

  // Build suggestions for all available sizes
  const results = dressSizes.map((size) => {
    const idx = sizeOrder.indexOf(size);
    const diff = idx - estimatedIndex;
    let match: "perfect" | "good" | "loose" | "tight";
    let note: string;

    if (diff === 0) {
      match = "perfect";
      note = "Size này vừa vặn với số đo của bạn.";
    } else if (diff === 1) {
      match = "loose";
      note = "Size này rộng hơn một chút, phù hợp nếu bạn thích mặc thoải mái.";
    } else if (diff === -1) {
      match = "tight";
      note = "Size này ôm sát hơn, phù hợp nếu bạn thích form ôm.";
    } else if (diff > 1) {
      match = "loose";
      note = "Size này khá rộng so với số đo của bạn.";
    } else {
      match = "tight";
      note = "Size này khá chật so với số đo của bạn.";
    }

    // Check if size is available
    const isAvailable = dressSizes.includes(size);

    return { size, match, note };
  });

  return { bestSize, results };
}

export default function TryOnPage() {
  const params = useParams();
  const dress = dresses.find((d) => d.id === params.id);

  const [metrics, setMetrics] = useState<BodyMetrics>({
    height: "",
    weight: "",
    bust: "",
    waist: "",
    hips: "",
  });
  const [result, setResult] = useState<{ bestSize: string; results: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    if (!dress) return;
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      const r = calculateSize(metrics, dress.size);
      setResult(r);
      setLoading(false);
    }, 800);
  };

  if (!dress) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Không tìm thấy váy.</p>
        <Link href="/dresses">
          <Button variant="link" className="mt-4">Quay lại danh sách</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 page-enter">
      <Link
        href={`/dresses/${dress.id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-[-4px]"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại chi tiết váy
      </Link>

      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Ruler className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Thử váy</h1>
            <p className="text-sm text-muted-foreground">
              Nhập chỉ số cơ thể để tìm size vừa vặn
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card className="animate-slide-in-right">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Chỉ số cơ thể
            </CardTitle>
            <CardDescription>
              Nhập càng nhiều thông tin càng chính xác
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Height */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
                Chiều cao (cm)
              </label>
              <Input
                type="number"
                placeholder="VD: 165"
                value={metrics.height}
                onChange={(e) => setMetrics({ ...metrics, height: e.target.value })}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            {/* Weight */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Scale className="h-3.5 w-3.5 text-muted-foreground" />
                Cân nặng (kg)
              </label>
              <Input
                type="number"
                placeholder="VD: 55"
                value={metrics.weight}
                onChange={(e) => setMetrics({ ...metrics, weight: e.target.value })}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                <Scale className="h-3 w-3" />
                Số đo vòng (nếu biết)
              </p>

              {/* Bust */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Vòng ngực (cm)</label>
                <Input
                  type="number"
                  placeholder="VD: 86"
                  value={metrics.bust}
                  onChange={(e) => setMetrics({ ...metrics, bust: e.target.value })}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              {/* Waist */}
              <div className="space-y-1.5 mt-3">
                <label className="text-sm font-medium">Vòng eo (cm)</label>
                <Input
                  type="number"
                  placeholder="VD: 68"
                  value={metrics.waist}
                  onChange={(e) => setMetrics({ ...metrics, waist: e.target.value })}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              {/* Hips */}
              <div className="space-y-1.5 mt-3">
                <label className="text-sm font-medium">Vòng mông (cm)</label>
                <Input
                  type="number"
                  placeholder="VD: 92"
                  value={metrics.hips}
                  onChange={(e) => setMetrics({ ...metrics, hips: e.target.value })}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full mt-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Ruler className="mr-2 h-4 w-4" />
                  Xem kết quả
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="animate-fade-in-up delay-200">
          {result ? (
            <SizeSuggestion results={result.results} bestSize={result.bestSize} />
          ) : (
            <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <Ruler className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground">
                Nhập chỉ số cơ thể và nhấn &quot;Xem kết quả&quot;
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Hệ thống sẽ gợi ý size phù hợp nhất
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
