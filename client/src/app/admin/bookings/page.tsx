"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { orders, dresses, rentalCalendar } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-200", confirmed: "bg-blue-200", shipping: "bg-purple-200",
  renting: "bg-green-200", returned: "bg-orange-200", completed: "bg-gray-200", cancelled: "bg-red-200",
};

export default function AdminBookingsPage() {
  const [today] = useState(() => new Date());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

  // Get all bookings for this month
  const monthBookings = orders.filter((o) => {
    if (["cancelled", "completed"].includes(o.status)) return false;
    const start = new Date(o.startDate);
    const end = new Date(o.endDate);
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    return start <= monthEnd && end >= monthStart;
  });

  const getBookingsForDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return monthBookings.filter((o) => {
      const start = new Date(o.startDate);
      const end = new Date(o.endDate);
      return d >= start && d <= end;
    });
  };

  const isBooked = (dateStr: string) => {
    return monthBookings.some((o) => {
      const d = new Date(dateStr);
      return d >= new Date(o.startDate) && d <= new Date(o.endDate);
    });
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else { setMonth(month - 1); }
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else { setMonth(month + 1); }
  };

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const selectedBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Lịch thuê</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{monthBookings.length}</div>
            <p className="text-xs text-muted-foreground">Đơn trong tháng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{monthBookings.filter((o) => o.status === "renting").length}</div>
            <p className="text-xs text-muted-foreground">Đang cho thuê</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{monthBookings.filter((o) => o.status === "confirmed").length}</div>
            <p className="text-xs text-muted-foreground">Chờ giao</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{dresses.filter((d) => d.available).length}/{dresses.length}</div>
            <p className="text-xs text-muted-foreground">Váy trống/tổng</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {monthNames[month]} {year}
                </CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-xs" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon-xs" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const booked = isBooked(dateStr);
                  const isSelected = dateStr === selectedDate;
                  const dayBookings = getBookingsForDate(dateStr);

                  return (
                    <button key={day} onClick={() => setSelectedDate(dateStr)}
                      className={cn(
                        "h-10 w-full rounded-md text-xs font-medium transition-all relative",
                        isSelected ? "bg-foreground text-background" : booked ? "bg-red-100 text-red-700 hover:bg-red-200" : "hover:bg-muted"
                      )}
                    >
                      {day}
                      {dayBookings.length > 0 && !isSelected && (
                        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 text-[8px] text-white flex items-center justify-center">
                          {dayBookings.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Day detail */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {selectedDate ? `Đơn ngày ${selectedDate}` : "Chọn ngày trên lịch"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                selectedBookings.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Không có đơn hàng nào trong ngày này.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedBookings.map((o) => (
                      <div key={o.id} className="rounded-lg border border-border p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{o.id}</p>
                          <Badge variant="outline" className="text-[10px]">{o.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{o.customerName} · {o.phone}</p>
                        <p className="text-xs text-muted-foreground">{o.dressName} (Size {o.size})</p>
                        <p className="text-xs text-muted-foreground">{o.startDate} → {o.endDate}</p>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Nhấn vào ngày trên lịch để xem chi tiết.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
