"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, Trash2, Eye } from "lucide-react";
import { dresses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminReviewsPage() {
  const [search, setSearch] = useState("");

  // Get all reviews from all dresses
  const allReviews = dresses.flatMap((d) =>
    d.reviews.map((r) => ({
      ...r,
      dressName: d.name,
      dressId: d.id,
    }))
  );

  const filtered = allReviews.filter((r) => {
    if (search && !r.dressName.toLowerCase().includes(search.toLowerCase()) && !r.userName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const avgRating = allReviews.length > 0
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Quản lý đánh giá</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{allReviews.length}</div>
            <p className="text-xs text-muted-foreground">Tổng đánh giá</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              {avgRating}
            </div>
            <p className="text-xs text-muted-foreground">Đánh giá trung bình</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{allReviews.filter((r) => r.rating >= 4).length}</div>
            <p className="text-xs text-muted-foreground">5-4 sao</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-red-600">{allReviews.filter((r) => r.rating <= 2).length}</div>
            <p className="text-xs text-muted-foreground">1-2 sao</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Tìm tên váy, người đánh giá..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">Không có đánh giá nào.</CardContent>
          </Card>
        ) : (
          filtered.map((r) => (
            <Card key={r.id}>
              <CardContent className="flex gap-4 pt-4">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {r.userName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{r.userName}</p>
                      <p className="text-xs text-muted-foreground">{r.dressName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn("h-3 w-3", s <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{r.comment}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="ghost" size="sm" onClick={() => toast.info("Xem chi tiết - đang phát triển")}>
                      <Eye className="mr-1 h-3 w-3" />Chi tiết
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toast.success("Đã xóa đánh giá")}>
                      <Trash2 className="mr-1 h-3 w-3 text-destructive" />Xóa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
