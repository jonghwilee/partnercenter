import { cn } from "../../lib/utils";

export type DirectUseDetailTabValue = "summary" | "dailyByDate" | "byTransaction";

type TabSegmentDirectUseDetailOption3Props = {
  value: DirectUseDetailTabValue;
  onValueChange: (v: DirectUseDetailTabValue) => void;
  className?: string;
};

const tabs = [
  { id: "summary" as const, label: "요약" },
  { id: "dailyByDate" as const, label: "일자별" },
  { id: "byTransaction" as const, label: "건별" },
] as const;

/** 탭 구분 모듈 ③ — 바로사용 포인트 상세(요약·일자별·건별) */
export function TabSegmentDirectUseDetailOption3({
  value,
  onValueChange,
  className,
}: TabSegmentDirectUseDetailOption3Props) {
  return (
    <div
      className={cn("flex flex-wrap gap-5 border-b border-border md:gap-6", className)}
      role="tablist"
      aria-label="바로사용 포인트 집계 구분"
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
