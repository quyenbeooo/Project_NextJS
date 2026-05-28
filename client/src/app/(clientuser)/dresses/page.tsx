"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import DressGrid from "@/components/dresses/dress-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { dresses, categories, sizes, colorOptions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const priceRanges = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "Dưới 200k", min: 0, max: 200000 },
  { label: "200k - 400k", min: 200000, max: 400000 },
  { label: "400k - 600k", min: 400000, max: 600000 },
  { label: "Trên 600k", min: 600000, max: Infinity },
];

const ITEMS_PER_PAGE = 8;

export default function DressesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return dresses.filter((d) => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.color.toLowerCase().includes(search.toLowerCase()) && !d.style.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "Tất cả" && d.category !== category) return false;
      if (size && !d.size.includes(size)) return false;
      if (color && !d.variants.some((v) => v.color === color)) return false;
      if (priceRange > 0) {
        const range = priceRanges[priceRange];
        if (d.price < range.min || d.price >= range.max) return false;
      }
      if (availableOnly && !d.available) return false;
      return true;
    });
  }, [search, category, size, color, priceRange, availableOnly]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);

  const activeFilters = [
    category !== "Tất cả" ? category : null,
    size,
    color,
    priceRange > 0 ? priceRanges[priceRange].label : null,
    availableOnly ? "Còn trống" : null,
  ].filter((f): f is string => f !== null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 page-enter">
      <h1 className="text-3xl font-bold tracking-tight mb-2 animate-fade-in-up">Thuê váy</h1>
      <p className="text-muted-foreground mb-6 animate-fade-in-up delay-100">
        Tìm kiếm và thuê bộ váy yêu thích của bạn.
      </p>

      {/* Search bar */}
      <div className="flex gap-3 mb-6 animate-fade-in-up delay-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, màu, phong cách..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 transition-all duration-200 focus:scale-[1.01]"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(showFilters && "bg-foreground text-background")}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Bộ lọc
          {activeFilters.length > 0 && (
            <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
              {activeFilters.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
          {activeFilters.map((f) => (
            <Badge key={f} variant="secondary" className="gap-1">
              {f}
              <X className="h-3 w-3 cursor-pointer" onClick={() => {
                if (f === category) setCategory("Tất cả");
                if (f === size) setSize(null);
                if (f === color) setColor(null);
                if (f === priceRanges[priceRange]?.label) setPriceRange(0);
                if (f === "Còn trống") setAvailableOnly(false);
              }} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={() => {
            setCategory("Tất cả"); setSize(null); setColor(null); setPriceRange(0); setAvailableOnly(false);
          }}>
            Xóa tất cả
          </Button>
        </div>
      )}

      {/* Filters panel */}
      {showFilters && (
        <div className="mb-6 p-4 rounded-xl border border-border bg-muted/30 space-y-5 animate-fade-in-down">
          {/* Category */}
          <div>
            <p className="text-sm font-medium mb-2">Danh mục</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setPage(1); }}
                  className={cn(
                    "rounded-full px-3.5 py-1 text-sm font-medium border transition-all duration-200",
                    category === c
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40"
                  )}
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
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSize(size === s ? null : s); setPage(1); }}
                  className={cn(
                    "rounded-md border px-3 py-1 text-sm font-medium transition-all duration-200",
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-medium mb-2">Màu sắc</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setColor(color === c.name ? null : c.name); setPage(1); }}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-all duration-200",
                    color === c.name
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40"
                  )}
                >
                  <div
                    className="h-3 w-3 rounded-full border"
                    style={{ backgroundColor: c.code }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <p className="text-sm font-medium mb-2">Khoảng giá</p>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => { setPriceRange(i); setPage(1); }}
                  className={cn(
                    "rounded-full px-3.5 py-1 text-sm font-medium border transition-all duration-200",
                    priceRange === i
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Available */}
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => { setAvailableOnly(e.target.checked); setPage(1); }}
              className="rounded border-border"
            />
            Chỉ hiển thị còn trống
          </label>
        </div>
      )}

      {/* Results */}
      <div className="mb-4 animate-fade-in">
        <p className="text-sm text-muted-foreground">
          {filtered.length} váy tìm thấy
          {page < totalPages && ` · Hiển thị ${paginated.length}/${filtered.length}`}
        </p>
      </div>

      <DressGrid dresses={paginated} />

      {/* Load more */}
      {page < totalPages && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setPage(page + 1)}
            className="transition-all duration-200 hover:scale-[1.02]"
          >
            Xem thêm ({filtered.length - paginated.length} váy)
          </Button>
        </div>
      )}
    </div>
  );
}
