import { SettlementMonthPickerField } from "../period/SettlementMonthPickerField";
import { cn } from "../../lib/utils";

type PeriodSelectOption2Props = {
  monthStart: string;
  monthEnd: string;
  onMonthStartChange: (v: string) => void;
  onMonthEndChange: (v: string) => void;
  className?: string;
};

/** 기간 선택 모듈 ② — 정산월 시작·종료 (YYYY.MM), 일자 선택 시 해당 월 반영 */
export function PeriodSelectOption2({
  monthStart,
  monthEnd,
  onMonthStartChange,
  onMonthEndChange,
  className,
}: PeriodSelectOption2Props) {
  return (
    <div className={cn("flex flex-wrap items-end gap-3", className)}>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">정산월</p>
        <div className="flex items-center gap-2">
          <SettlementMonthPickerField
            value={monthStart}
            onChange={onMonthStartChange}
            aria-label="정산월 시작"
          />
          <span className="text-muted-foreground">~</span>
          <SettlementMonthPickerField
            value={monthEnd}
            onChange={onMonthEndChange}
            aria-label="정산월 종료"
          />
        </div>
      </div>
    </div>
  );
}
