"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserCheck, UserX, Mail, Phone } from "lucide-react";
import { users, orders } from "@/lib/mock-data";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Quản lý người dùng</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Tổng người dùng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "user").length}</div>
            <p className="text-xs text-muted-foreground">Khách hàng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "admin").length}</div>
            <p className="text-xs text-muted-foreground">Quản trị viên</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">Tổng đơn hàng</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Tìm tên, email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>SĐT</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => {
                const userOrders = orders.filter((o) => o.customerName === u.name);
                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium text-sm">{u.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">{u.name[0]}</div>
                        <span className="text-sm">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{u.email}</TableCell>
                    <TableCell className="text-sm">{u.phone}</TableCell>
                    <TableCell>
                      <Badge variant={u.role === "admin" ? "default" : "outline"} className="text-[10px]">
                        {u.role === "admin" ? "Admin" : "User"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{userOrders.length} đơn</TableCell>
                    <TableCell className="text-sm">{u.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-xs" onClick={() => toast.info(`Gửi email đến ${u.email}`)}>
                          <Mail className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-xs" onClick={() => toast.success("Đã khóa tài khoản", { description: u.name })}>
                          <UserX className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
