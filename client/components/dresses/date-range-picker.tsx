"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { rentalCalendar } from "@/lib/mock-data";
import { toast } from "sonner";
import { formatDate } from "@/lib/date-utils";

interface DateRangePickerProps {
  dressId: string;
  onDateChange: (start: string, end: string) => void;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function DateRangePicker({ dressId, onDateChange }: DateRangePickerProps) {
  const [today] = useState(() => new Date());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const bookedDates = rentalCalendar[dressId] || [];
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const isBooked = (dateStr: string) => {
    const d = new Date(dateStr);
    return bookedDates.some(
      (b) => d >= new Date(b.start) && d <= new Date(b.end)
    );
  };

  const isPast = (dateStr: string) => {
    const d = new Date(dateStr);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return d < todayStart;
  };

  const isBuffer = (dateStr: string) => {
    const d = new Date(dateStr);
    return bookedDates.some((b) => {
      const end = new Date(b.end);
      const bufferEnd = new Date(end);
      bufferEnd.setDate(bufferEnd.getDate() + 1);
      return d > end && d <= bufferEnd;
    });
  };

  const isInRange = (dateStr: string) => {
    if (!startDate) return false;
    const end = endDate || hoverDate;
    if (!end) return false;
    const d = new Date(dateStr);
    return d >= new Date(startDate) && d <= new Date(end);
  };

  const handleDateClick = (dateStr: string) => {
    if (isPast(dateStr)) {
      toast.warning("Ngày đã qua", {
        description: "Không thể chọn ngày trong quá khứ. Vui lòng chọn ngày từ hôm nay trở đi.",
      });
      return;
    }
    if (isBooked(dateStr)) {
      const booking = bookedDates.find((b) => {
        const d = new Date(dateStr);
        return d >= new Date(b.start) && d <= new Date(b.end);
      });
      toast.error("Váy đã được thuê trong ngày này", {
        description: booking
          ? `Ngày ${formatDate(dateStr)} nằm trong khoảng ${formatDate(booking.start)} → ${formatDate(booking.end)} đã có khách thuê. Vui lòng chọn ngày khác.`
          : `Ngày ${formatDate(dateStr)} đã có người thuê. Vui lòng chọn ngày khác.`,
      });
      return;
    }
    if (isBuffer(dateStr)) {
      toast.warning("Váy đang được giặt/sấy", {
        description: `Ngày ${formatDate(dateStr)} là ngày buffer giặt váy sau khi khách trước trả. Váy sẽ sẵn sàng thuê từ ngày tiếp theo.`,
      });
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate(null);
      onDateChange(dateStr, "");
      toast.info("Đã chọn ngày nhận", {
        description: `Ngày nhận: ${dateStr}. Bây giờ hãy chọn ngày trả.`,
      });
    } else {
      // Check if range overlaps with booked dates
      const start = new Date(startDate);
      const end = new Date(dateStr);
      const s = start < end ? start : end;
      const e = start < end ? end : start;

      let hasConflict = false;
      let conflictBooking = null;
      for (const b of bookedDates) {
        const bStart = new Date(b.start);
        const bEnd = new Date(b.end);
        if (s <= bEnd && e >= bStart) {
          hasConflict = true;
          conflictBooking = b;
          break;
        }
      }

      if (hasConflict) {
      toast.error("Khoảng ngày trùng lịch thuê", {
        description: conflictBooking
          ? `Khoảng ngày bạn chọn (${formatDate(startDate)} → ${formatDate(dateStr)}) trùng với lịch thuê ${formatDate(conflictBooking.start)} → ${formatDate(conflictBooking.end)}. Vui lòng chọn lại.`
          : `Khoảng ngày bạn chọn trùng với lịch thuê khác. Vui lòng chọn lại.`,
      });
        return;
      }

      if (start < end) {
        setStartDate(startDate);
        setEndDate(dateStr);
        onDateChange(startDate, dateStr);
      } else {
        setStartDate(dateStr);
        setEndDate(startDate);
        onDateChange(dateStr, startDate);
      }

      const days = Math.ceil(
        (new Date(dateStr).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      toast.success("Đã chọn ngày thuê", {
        description: `${formatDate(startDate)} → ${formatDate(dateStr)} (${Math.abs(days)} ngày) - Váy còn trống trong khoảng này!`,
      });
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Chọn ngày thuê
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Month nav */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon-xs" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <Button variant="ghost" size="icon-xs" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const disabled = isPast(dateStr) || isBooked(dateStr) || isBuffer(dateStr);
            const isStart = dateStr === startDate;
            const isEnd = dateStr === endDate;
            const inRange = isInRange(dateStr);

            return (
              <button
                key={day}
                onClick={() => handleDateClick(dateStr)}
                onMouseEnter={() => setHoverDate(dateStr)}
                onMouseLeave={() => setHoverDate(null)}
                disabled={disabled}
                className={cn(
                  "h-8 w-full rounded-md text-xs font-medium transition-all duration-150",
                  disabled && "text-muted-foreground/30 cursor-not-allowed",
                  !disabled && !isStart && !isEnd && !inRange && "hover:bg-muted",
                  isStart && "bg-foreground text-background rounded-r-none",
                  isEnd && "bg-foreground text-background rounded-l-none",
                  inRange && !isStart && !isEnd && "bg-muted",
                  isBooked(dateStr) && "bg-red-100 text-red-400",
                  isBuffer(dateStr) && "bg-yellow-50 text-yellow-600"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-foreground" />
            Đã chọn
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-red-100 border border-red-200" />
            Đã thuê
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-yellow-50 border border-yellow-200" />
            Buffer giặt
          </div>
        </div>

        {/* Booked dates list */}
        {bookedDates.length > 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 space-y-2">
            <p className="text-xs font-medium text-red-700">Lịch đã được thuê trong tháng:</p>
            {bookedDates.map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-red-600">
                <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span>{formatDate(b.start)} → {formatDate(b.end)}</span>
                <span className="text-red-400">({Math.ceil((new Date(b.end).getTime() - new Date(b.start).getTime()) / (1000 * 60 * 60 * 24)) + 1} ngày)</span>
              </div>
            ))}
            <p className="text-[10px] text-red-400">Vui lòng chọn ngày nằm ngoài các khoảng trên.</p>
          </div>
        )}

        {/* Selected range */}
        {startDate && (
          <div className="rounded-lg border border-border p-3 text-sm">
            <p className="text-muted-foreground">Ngày nhận:</p>
            <p className="font-medium">{formatDate(startDate)}</p>
            {endDate && (
              <>
                <p className="text-muted-foreground mt-1">Ngày trả:</p>
                <p className="font-medium">{formatDate(endDate)}</p>
                <p className="text-muted-foreground mt-1">
                  Tổng:{" "}
                  <span className="font-medium text-foreground">
                    {Math.ceil(
                      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    ngày
                  </span>
                </p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
