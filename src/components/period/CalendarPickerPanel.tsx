import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  formatMonthDot,
  getMonthCells,
  getWeekdayLabelsKo,
  isStrictlyBetweenDays,
  sameDay,
} from "../../lib/calendarUtils";
import { cn } from "../../lib/utils";

type CalendarPickerPanelProps = {
  /** 보이는 달 (년, 월 0~11) */
  visibleYear: number;
  visibleMonthIndex: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  mode: "range" | "single";
  rangeFrom: Date | null;
  rangeTo: Date | null;
  singleSelected: Date | null;
  onDayPick: (d: Date) => void;
};

export function CalendarPickerPanel({
  visibleYear,
  visibleMonthIndex,
  onPrevMonth,
  onNextMonth,
  mode,
  rangeFrom,
  rangeTo,
  singleSelected,
  onDayPick,
}: CalendarPickerPanelProps) {
  const cells = getMonthCells(visibleYear, visibleMonthIndex);
  const headerLabel = formatMonthDot(new Date(visibleYear, visibleMonthIndex, 1));
  const weekdays = getWeekdayLabelsKo();

  const rangeDone = Boolean(rangeFrom && rangeTo);
  const lo =
    rangeDone && rangeFrom && rangeTo
      ? rangeFrom <= rangeTo
        ? rangeFrom
        : rangeTo
      : null;
  const hi =
    rangeDone && rangeFrom && rangeTo
      ? rangeFrom <= rangeTo
        ? rangeTo
        : rangeFrom
      : null;

  return (
    <div className="w-[min(100vw-2rem,20rem)] select-none">
      <div className="mb-3 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={onPrevMonth}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          aria-label="이전 달"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-base font-semibold text-foreground">{headerLabel}</span>
        <button
          type="button"
          onClick={onNextMonth}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          aria-label="다음 달"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-0 text-center text-xs font-medium text-slate-400">
        {weekdays.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {cells.map(({ date, inCurrentMonth }) => {
          const inMiddle = mode === "range" && lo && hi && isStrictlyBetweenDays(date, lo, hi);
          const isEndpoint =
            mode === "range" &&
            ((rangeDone &&
              lo &&
              hi &&
              (sameDay(date, lo) || sameDay(date, hi))) ||
              Boolean(!rangeDone && rangeFrom && sameDay(date, rangeFrom)));
          const singleOn =
            mode === "single" && singleSelected && sameDay(date, singleSelected);

          return (
            <div key={date.toISOString()} className="flex h-9 items-center justify-center p-0">
              <button
                type="button"
                disabled={mode === "range" && !inCurrentMonth}
                onClick={() => onDayPick(date)}
                className={cn(
                  "relative flex h-9 w-full max-w-[2.25rem] items-center justify-center rounded-full text-center transition-colors",
                  !inCurrentMonth && mode === "range" && "pointer-events-none text-muted-foreground/35",
                  !inCurrentMonth &&
                    mode === "single" &&
                    "text-muted-foreground/50 hover:bg-muted/60 hover:text-foreground",
                  inCurrentMonth &&
                    !isEndpoint &&
                    !singleOn &&
                    !inMiddle &&
                    "text-foreground hover:bg-muted",
                  inMiddle && "rounded-none bg-slate-200/90 text-foreground",
                  isEndpoint &&
                    "z-[1] bg-[#1a2744] font-medium text-white shadow-sm hover:bg-[#1a2744]",
                  singleOn && "bg-[#1a2744] font-medium text-white hover:bg-[#1a2744]",
                  isEndpoint && inMiddle && "rounded-full",
                  isEndpoint && lo && hi && !sameDay(lo, hi) && sameDay(date, lo) && "rounded-l-full",
                  isEndpoint && lo && hi && !sameDay(lo, hi) && sameDay(date, hi) && "rounded-r-full"
                )}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
