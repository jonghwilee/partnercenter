import { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CalendarPickerPanel } from "./CalendarPickerPanel";
import { formatDateDot, parseDotDate } from "../../lib/calendarUtils";
import { cn } from "../../lib/utils";

const confirmClass =
  "rounded-full bg-[#f028d0] px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#d921c4]";

type DateRangePickerFieldProps = {
  dateStart: string;
  dateEnd: string;
  onChange: (start: string, end: string) => void;
  className?: string;
  "aria-labelledby"?: string;
};

/** 기간 입력 — 단일 필드 + 범위 캘린더(첫 이미지 UX) */
export function DateRangePickerField({
  dateStart,
  dateEnd,
  onChange,
  className,
  "aria-labelledby": ariaLabelledBy,
}: DateRangePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [visibleYear, setVisibleYear] = useState(() => new Date().getFullYear());
  const [visibleMonthIndex, setVisibleMonthIndex] = useState(() => new Date().getMonth());
  const [draftFrom, setDraftFrom] = useState<Date | null>(null);
  const [draftTo, setDraftTo] = useState<Date | null>(null);

  useEffect(() => {
    if (!open) return;
    const a = parseDotDate(dateStart);
    const b = parseDotDate(dateEnd);
    if (a && b) {
      setDraftFrom(a <= b ? a : b);
      setDraftTo(a <= b ? b : a);
      const v = a <= b ? a : b;
      setVisibleYear(v.getFullYear());
      setVisibleMonthIndex(v.getMonth());
    } else {
      const t = new Date();
      setDraftFrom(null);
      setDraftTo(null);
      setVisibleYear(t.getFullYear());
      setVisibleMonthIndex(t.getMonth());
    }
  }, [open, dateStart, dateEnd]);

  const handleDayPick = (d: Date) => {
    if (!draftFrom || (draftFrom && draftTo)) {
      setDraftFrom(d);
      setDraftTo(null);
      setVisibleYear(d.getFullYear());
      setVisibleMonthIndex(d.getMonth());
      return;
    }
    let a = draftFrom;
    let b = d;
    if (b < a) {
      const t = a;
      a = b;
      b = t;
    }
    setDraftFrom(a);
    setDraftTo(b);
  };

  const handleConfirm = () => {
    if (!draftFrom) {
      setOpen(false);
      return;
    }
    const endD = draftTo ?? draftFrom;
    let a = draftFrom;
    let b = endD;
    if (b < a) {
      const t = a;
      a = b;
      b = t;
    }
    onChange(formatDateDot(a), formatDateDot(b));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const display =
    dateStart && dateEnd ? `${dateStart} - ${dateEnd}` : "YYYY.MM.DD - YYYY.MM.DD";

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-labelledby={ariaLabelledBy}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-10 w-[min(18.5rem,100%)] min-w-[14rem] max-w-[20rem] shrink-0 items-center gap-2 rounded-lg border border-input bg-background px-2.5 py-2 text-left text-sm shadow-sm",
          "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <span className={cn("flex-1 truncate", !dateStart && "text-muted-foreground")}>
          {display}
        </span>
        <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            aria-label="닫기"
            onClick={handleCancel}
          />
          <div
            className="absolute left-0 top-full z-50 mt-2 rounded-2xl border border-border bg-background p-4 shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            <CalendarPickerPanel
              visibleYear={visibleYear}
              visibleMonthIndex={visibleMonthIndex}
              onPrevMonth={() => {
                const d = new Date(visibleYear, visibleMonthIndex - 1, 1);
                setVisibleYear(d.getFullYear());
                setVisibleMonthIndex(d.getMonth());
              }}
              onNextMonth={() => {
                const d = new Date(visibleYear, visibleMonthIndex + 1, 1);
                setVisibleYear(d.getFullYear());
                setVisibleMonthIndex(d.getMonth());
              }}
              mode="range"
              rangeFrom={draftFrom}
              rangeTo={draftTo}
              singleSelected={null}
              onDayPick={handleDayPick}
            />
            <div className="mt-4 flex justify-end gap-2 border-t border-border pt-3">
              <Button type="button" variant="secondary" className="rounded-full" onClick={handleCancel}>
                취소
              </Button>
              <button type="button" className={confirmClass} onClick={handleConfirm}>
                확인
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
