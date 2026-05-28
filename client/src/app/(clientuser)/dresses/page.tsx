"use client";

import { useState } from "react";
import DressGrid from "@/components/dresses/dress-grid";
import { Badge } from "@/components/ui/badge";
import { dresses, categories, sizes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DressesPage() {
  const [category, setCategory] = useState("Tất cả");
  const [size, setSize] = useState<string | null>(null);
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = dresses.filter((d) => {
    if (category !== "Tất cả" && d.category !== category) return false;
    if (size && !d.size.includes(size)) return false;
    if (availableOnly && !d.available) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 page-enter">
      <h1 className="text-3xl font-bold tracking-tight animate-fade-in-up">Thuê váy</h1>
      <p className="mt-2 text-muted-foreground animate-fade-in-up delay-100">
        Tìm kiếm và thuê bộ váy yêu thích của bạn.
      </p>

      {/* Filters */}
      <div className="mt-8 space-y-5 animate-fade-in-up delay-200">
        {/* Category */}
        <div>
          <p className="text-sm font-medium mb-2">Danh mục</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full px-3.5 py-1 text-sm font-medium border transition-all duration-200",
                  category === c
                    ? "border-foreground bg-foreground text-background scale-105"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:scale-105"
                )}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <p className="text-sm font-medium mb-2">Kích cỡ</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s, i) => (
              <button
                key={s}
                onClick={() => setSize(size === s ? null : s)}
                className={cn(
                  "rounded-md border px-3 py-1 text-sm font-medium transition-all duration-200",
                  size === s
                    ? "border-foreground bg-foreground text-background scale-105"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:scale-105"
                )}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Available */}
        <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="rounded border-border"
          />
          Chỉ hiển thị còn trống
        </label>
      </div>

      {/* Results */}
      <div className="mt-8">
        <p className="mb-4 text-sm text-muted-foreground animate-fade-in">
          {filtered.length} váy tìm thấy
        </p>
        <DressGrid dresses={filtered} />
      </div>
    </div>
  );
}
