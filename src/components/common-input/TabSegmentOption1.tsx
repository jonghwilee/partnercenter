import { cn } from "../../lib/utils";

export type BrandStoreTabValue = "brand" | "store" | "pointType" | "daily";

type TabSegmentOption1Props = {
  value: BrandStoreTabValue;
  onValueChange: (v: BrandStoreTabValue) => void;
  className?: string;
  /** true면 `포인트 유형별`·`일자별` 탭 포함 (멤버십 포인트 정산 등) */
  showPointTypeTab?: boolean;
};

const twoTabs = [
  { id: "brand" as const, label: "브랜드별" },
  { id: "store" as const, label: "매장별" },
] as const;

const fourTabs = [
  { id: "store" as const, label: "매장별" },
  { id: "daily" as const, label: "일자별" },
  { id: "pointType" as const, label: "포인트 유형별" },
  { id: "brand" as const, label: "브랜드별" },
] as const;

/** 탭 구분 모듈 ① — 매장별 | 일자별 | 포인트 유형별 | 브랜드별 (멤버십 정산 4탭) / 브랜드별 | 매장별 (2탭) */
export function TabSegmentOption1({
  value,
  onValueChange,
  className,
  showPointTypeTab = false,
}: TabSegmentOption1Props) {
  const tabs = showPointTypeTab ? fourTabs : twoTabs;

  return (
    <div className={cn("flex flex-wrap gap-5 border-b border-border md:gap-6", className)} role="tablist" aria-label="집계 구분">
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
