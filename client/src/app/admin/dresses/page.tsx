"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { dresses } from "@/lib/mock-data";
import { toast } from "sonner";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
}

export default function AdminDressesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "available" | "maintenance">("all");

  const filtered = dresses.filter((d) => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "available" && !d.available) return false;
    if (filter === "maintenance" && d.status !== "maintenance") return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý váy</h1>
        <Button size="sm" onClick={() => toast.info("Tính năng đang phát triển")}>
          <Plus className="mr-1 h-4 w-4" />Thêm váy
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{dresses.length}</div>
            <p className="text-xs text-muted-foreground">Tổng số</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{dresses.filter((d) => d.status === "available").length}</div>
            <p className="text-xs text-muted-foreground">Còn trống</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-red-600">{dresses.filter((d) => !d.available).length}</div>
            <p className="text-xs text-muted-foreground">Đã cho thuê</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-yellow-600">{dresses.filter((d) => d.status === "maintenance").length}</div>
            <p className="text-xs text-muted-foreground">Bảo trì</p>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm tên váy..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {([["all", "Tất cả"], ["available", "Còn trống"], ["maintenance", "Bảo trì"]] as const).map(([key, label]) => (
            <Button key={key} variant={filter === key ? "default" : "outline"} size="sm" onClick={() => setFilter(key)}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Váy</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Màu sắc</TableHead>
                <TableHead>Giá/ngày</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-6 flex-shrink-0 rounded bg-muted flex items-center justify-center text-[8px] text-muted-foreground">Ảnh</div>
                      <span className="line-clamp-1">{d.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{d.category}</Badge></TableCell>
                  <TableCell className="text-sm">{d.color}</TableCell>
                  <TableCell className="text-sm">{formatPrice(d.price)}</TableCell>
                  <TableCell className="text-sm">{d.size.join(", ")}</TableCell>
                  <TableCell className="text-sm">★ {d.rating}</TableCell>
                  <TableCell>
                    <Badge variant={d.status === "available" ? "default" : d.status === "maintenance" ? "secondary" : "destructive"} className="text-[10px]">
                      {d.status === "available" ? "Còn trống" : d.status === "maintenance" ? "Bảo trì" : "Đã thuê"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-xs" onClick={() => toast.info("Chỉnh sửa váy - đang phát triển")}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-xs" onClick={() => {
                        toast.success(d.available ? "Đã chuyển sang bảo trì" : "Đã mở lại cho thuê", {
                          description: d.name,
                        });
                      }}>
                        {d.available ? <ToggleRight className="h-3.5 w-3.5" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon-xs" onClick={() => toast.error("Xóa váy", { description: "Tính năng đang phát triển" })}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
