import { settlementFilters } from "../../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "../../lib/utils";

type LedgerPointTypeOnlyOption4Props = {
  value: string;
  onValueChange: (v: string) => void;
  className?: string;
};

/** 필터 모듈 ④ — 적립 내역: 포인트유형만 */
export function LedgerPointTypeOnlyOption4({
  value,
  onValueChange,
  className,
}: LedgerPointTypeOnlyOption4Props) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs font-medium text-muted-foreground">포인트유형</p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-10 w-[12rem] max-w-full shrink-0 rounded-md border-input bg-background">
          <SelectValue placeholder="전체" />
        </SelectTrigger>
        <SelectContent>
          {settlementFilters.pointTypes.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
