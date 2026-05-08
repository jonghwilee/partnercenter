import DateRangeFilter, { type DatePreset } from "../DateRangeFilter";
import { cn } from "../../lib/utils";

export type { DatePreset };

type PeriodSelectOption1Props = {
  dateStart: string;
  dateEnd: string;
  onDateStartChange: (v: string) => void;
  onDateEndChange: (v: string) => void;
  preset?: DatePreset;
  onPresetChange?: (v: DatePreset) => void;
  /** 바깥 래퍼 */
  className?: string;
};

/** 기간 선택 모듈 ① — 일자 범위 + 프리셋 (적립·사용 내역 등) */
export function PeriodSelectOption1({ className, ...rest }: PeriodSelectOption1Props) {
  return (
    <div className={cn(className)}>
      <DateRangeFilter {...rest} />
    </div>
  );
}
