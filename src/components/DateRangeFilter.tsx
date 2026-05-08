import { Button } from "./ui/button";
import { X } from "lucide-react";
import { DateRangePickerField } from "./period/DateRangePickerField";

export type DatePreset = "lastMonth" | "last3Months" | "last6Months" | "thisYear";

export function getPresetDates(preset: DatePreset) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  function fmt(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
  }
  if (preset === "lastMonth") {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { start: fmt(start), end: fmt(end) };
  }
  if (preset === "last3Months") {
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    const start = new Date(end);
    start.setMonth(start.getMonth() - 2);
    start.setDate(1);
    return { start: fmt(start), end: fmt(end) };
  }
  if (preset === "last6Months") {
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    const start = new Date(end);
    start.setMonth(start.getMonth() - 5);
    start.setDate(1);
    return { start: fmt(start), end: fmt(end) };
  }
  const start = new Date(today.getFullYear(), 0, 1);
  const end = new Date(today.getFullYear(), today.getMonth(), 0);
  return { start: fmt(start), end: fmt(end) };
}

type DateRangeFilterProps = {
  dateStart: string;
  dateEnd: string;
  onDateStartChange: (v: string) => void;
  onDateEndChange: (v: string) => void;
  preset?: DatePreset;
  onPresetChange?: (v: DatePreset) => void;
};

export default function DateRangeFilter({
  dateStart,
  dateEnd,
  onDateStartChange,
  onDateEndChange,
  preset,
  onPresetChange,
}: DateRangeFilterProps) {
  const hasInput = dateStart || dateEnd;

  const handleClear = () => {
    onDateStartChange("");
    onDateEndChange("");
  };

  const handlePreset = (p: DatePreset) => {
    const { start, end } = getPresetDates(p);
    onDateStartChange(start);
    onDateEndChange(end);
    onPresetChange?.(p);
  };

  const handleRangeChange = (start: string, end: string) => {
    onDateStartChange(start);
    onDateEndChange(end);
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="space-y-1">
        <span id="period-label" className="text-xs font-medium text-muted-foreground">
          기간
        </span>
        <DateRangePickerField
          aria-labelledby="period-label"
          dateStart={dateStart}
          dateEnd={dateEnd}
          onChange={handleRangeChange}
        />
      </div>
      {onPresetChange && (
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-background px-1 py-0.5">
          <Button
            variant={preset === "lastMonth" ? "default" : "ghost"}
            size="sm"
            onClick={() => handlePreset("lastMonth")}
          >
            지난달
          </Button>
          <Button
            variant={preset === "last3Months" ? "default" : "ghost"}
            size="sm"
            onClick={() => handlePreset("last3Months")}
          >
            지난 3개월
          </Button>
          <Button
            variant={preset === "last6Months" ? "default" : "ghost"}
            size="sm"
            onClick={() => handlePreset("last6Months")}
          >
            지난 6개월
          </Button>
          <Button
            variant={preset === "thisYear" ? "default" : "ghost"}
            size="sm"
            onClick={() => handlePreset("thisYear")}
          >
            올해
          </Button>
        </div>
      )}
      {hasInput && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="기간 지우기"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
