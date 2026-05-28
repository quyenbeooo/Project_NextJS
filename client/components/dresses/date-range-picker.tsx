"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { rentalCalendar } from "@/lib/mock-data";

interface DateRangePickerProps {
  dressId: string;
  onDateChange: (start: string, end: string) => void;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function DateRangePicker({ dressId, onDateChange }: DateRangePickerProps) {
  const today = new Date();
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
    if (isPast(dateStr) || isBooked(dateStr) || isBuffer(dateStr)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate(null);
      onDateChange(dateStr, "");
    } else {
      if (new Date(dateStr) < new Date(startDate)) {
        setStartDate(dateStr);
        setEndDate(startDate);
        onDateChange(dateStr, startDate);
      } else {
        setEndDate(dateStr);
        onDateChange(startDate, dateStr);
      }
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

        {/* Selected range */}
        {startDate && (
          <div className="rounded-lg border border-border p-3 text-sm">
            <p className="text-muted-foreground">Ngày nhận:</p>
            <p className="font-medium">{startDate}</p>
            {endDate && (
              <>
                <p className="text-muted-foreground mt-1">Ngày trả:</p>
                <p className="font-medium">{endDate}</p>
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
