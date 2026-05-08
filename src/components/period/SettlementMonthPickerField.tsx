import { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CalendarPickerPanel } from "./CalendarPickerPanel";
import { formatMonthDot, parseDotMonth } from "../../lib/calendarUtils";
import { cn } from "../../lib/utils";

const confirmClass =
  "rounded-full bg-[#f028d0] px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#d921c4]";

type SettlementMonthPickerFieldProps = {
  value: string;
  onChange: (month: string) => void;
  "aria-label"?: string;
  className?: string;
};

/**
 * 정산월 — 캘린더에서 일자를 눌러도 값은 해당 일이 속한 `YYYY.MM`만 반영
 */
export function SettlementMonthPickerField({
  value,
  onChange,
  "aria-label": ariaLabel,
  className,
}: SettlementMonthPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [visibleYear, setVisibleYear] = useState(() => new Date().getFullYear());
  const [visibleMonthIndex, setVisibleMonthIndex] = useState(() => new Date().getMonth());
  const [draft, setDraft] = useState<Date | null>(null);

  useEffect(() => {
    if (!open) return;
    const parsed = parseDotMonth(value);
    if (parsed) {
      setVisibleYear(parsed.getFullYear());
      setVisibleMonthIndex(parsed.getMonth());
      setDraft(parsed);
    } else {
      const t = new Date();
      setVisibleYear(t.getFullYear());
      setVisibleMonthIndex(t.getMonth());
      setDraft(new Date(t.getFullYear(), t.getMonth(), 1));
    }
  }, [open, value]);

  const handleConfirm = () => {
    if (draft) onChange(formatMonthDot(draft));
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 w-[9rem] shrink-0 items-center gap-2 rounded-lg border border-input bg-background px-2.5 py-2 text-left text-sm shadow-sm",
          "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <span className={cn("flex-1 truncate", !value && "text-muted-foreground")}>
          {value || "YYYY.MM"}
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
          <div className="absolute left-0 top-full z-50 mt-2 rounded-2xl border border-border bg-background p-4 shadow-xl">
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
              mode="single"
              rangeFrom={null}
              rangeTo={null}
              singleSelected={draft}
              onDayPick={(d) => {
                setDraft(d);
                setVisibleYear(d.getFullYear());
                setVisibleMonthIndex(d.getMonth());
              }}
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
