import { cn } from "../../lib/utils";

export type DoubleAccrualTabValue = "summary" | "byItem";

type TabSegmentDoubleAccrualOption3Props = {
  value: DoubleAccrualTabValue;
  onValueChange: (v: DoubleAccrualTabValue) => void;
  className?: string;
};

const tabs = [
  { id: "summary" as const, label: "요약" },
  { id: "byItem" as const, label: "건별" },
] as const;

/** 탭 구분 모듈 ③ — 제휴카드 더블적립 */
export function TabSegmentDoubleAccrualOption3({
  value,
  onValueChange,
  className,
}: TabSegmentDoubleAccrualOption3Props) {
  return (
    <div
      className={cn("flex flex-wrap gap-5 border-b border-border md:gap-6", className)}
      role="tablist"
      aria-label="제휴카드 더블적립 구분"
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
