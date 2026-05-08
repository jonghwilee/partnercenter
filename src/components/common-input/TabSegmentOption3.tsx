import { cn } from "../../lib/utils";

export type PointConversionTabValue = "monthlySummary" | "dailyByDate" | "byTransaction";

type TabSegmentOption3Props = {
  value: PointConversionTabValue;
  onValueChange: (v: PointConversionTabValue) => void;
  className?: string;
};

const tabs = [
  { id: "monthlySummary" as const, label: "요약" },
  { id: "dailyByDate" as const, label: "일자별" },
  { id: "byTransaction" as const, label: "건별" },
] as const;

/** 탭 구분 모듈 ③ — 포인트 전환(요약·일자별·건별) */
export function TabSegmentOption3({ value, onValueChange, className }: TabSegmentOption3Props) {
  return (
    <div
      className={cn("flex flex-wrap gap-5 border-b border-border md:gap-6", className)}
      role="tablist"
      aria-label="포인트 전환 집계 구분"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          className={cn(
            "-mb-px border-b-[3px] pb-2 text-[13px] font-medium transition-colors",
            value === tab.id
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
          onClick={() => onValueChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
