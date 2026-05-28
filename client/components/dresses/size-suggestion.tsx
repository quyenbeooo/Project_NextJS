"use client";

import { Check, AlertCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SizeResult {
  size: string;
  match: "perfect" | "good" | "loose" | "tight";
  note: string;
}

interface SizeSuggestionProps {
  results: SizeResult[];
  bestSize: string;
}

const matchConfig = {
  perfect: {
    label: "Vừa vặn",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: Check,
  },
  good: {
    label: "Tạm ổn",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: ArrowRight,
  },
  loose: {
    label: "Rộng hơn",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: AlertCircle,
  },
  tight: {
    label: "Chật hơn",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: AlertCircle,
  },
};

export default function SizeSuggestion({ results, bestSize }: SizeSuggestionProps) {
  return (
    <div className="space-y-4">
      {/* Best size highlight */}
      <Card className="border-2 border-green-300 bg-green-50/50 animate-scale-in">
        <CardContent className="flex items-center gap-4 pt-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <Check className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Size phù hợp nhất với bạn</p>
            <p className="text-2xl font-bold text-green-700">{bestSize}</p>
          </div>
        </CardContent>
      </Card>

      {/* All suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gợi ý kích cỡ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {results.map((r, i) => {
            const config = matchConfig[r.match];
            const Icon = config.icon;
            const isBest = r.size === bestSize;
            return (
              <div
                key={r.size}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3 transition-all duration-300 animate-fade-in-up",
                  isBest ? "border-green-300 bg-green-50/50" : "border-border",
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Badge
                  variant={isBest ? "default" : "secondary"}
                  className={cn("mt-0.5 shrink-0", isBest && "bg-green-600")}
                >
                  {r.size}
                </Badge>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", config.color)}>
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.note}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
