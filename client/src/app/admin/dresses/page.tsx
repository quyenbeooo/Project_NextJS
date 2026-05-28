import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { dresses } from "@/lib/mock-data";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

export default function AdminDressesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý váy</h1>
        <Button size="sm">
          <Plus />
          Thêm váy
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{dresses.length}</div>
            <p className="text-xs text-muted-foreground">Tổng số váy</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{dresses.filter((d) => d.available).length}</div>
            <p className="text-xs text-muted-foreground">Còn trống</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{dresses.filter((d) => !d.available).length}</div>
            <p className="text-xs text-muted-foreground">Đã cho thuê</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Danh sách váy</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên váy</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Màu</TableHead>
                <TableHead>Giá/ngày</TableHead>
                <TableHead>Kích cỡ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dresses.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{d.category}</Badge>
                  </TableCell>
                  <TableCell>{d.color}</TableCell>
                  <TableCell>{formatPrice(d.price)}</TableCell>
                  <TableCell>{d.size.join(", ")}</TableCell>
                  <TableCell>
                    <Badge variant={d.available ? "default" : "secondary"}>
                      {d.available ? "Còn trống" : "Đã thuê"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-xs">
                        <Pencil />
                      </Button>
                      <Button variant="ghost" size="icon-xs">
                        <Trash2 />
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
