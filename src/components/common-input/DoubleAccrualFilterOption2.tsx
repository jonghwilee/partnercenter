import { doubleAccrualCardCompanies, doubleAccrualPartners } from "../../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "../../lib/utils";

type DoubleAccrualFilterOption2Props = {
  cardCompany: string;
  partner: string;
  onCardCompanyChange: (v: string) => void;
  onPartnerChange: (v: string) => void;
  className?: string;
};

/** 필터 모듈 ② — 제휴카드사 · 제휴사 (더블적립 정산) */
export function DoubleAccrualFilterOption2({
  cardCompany,
  partner,
  onCardCompanyChange,
  onPartnerChange,
  className,
}: DoubleAccrualFilterOption2Props) {
  return (
    <div className={cn("flex flex-wrap items-end gap-3", className)}>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">제휴카드사</p>
        <Select value={cardCompany} onValueChange={onCardCompanyChange}>
          <SelectTrigger className="w-[10.5rem] bg-background">
            <SelectValue placeholder="제휴카드사" />
          </SelectTrigger>
          <SelectContent>
            {doubleAccrualCardCompanies.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">제휴사</p>
        <Select value={partner} onValueChange={onPartnerChange}>
          <SelectTrigger className="w-[10.5rem] bg-background">
            <SelectValue placeholder="제휴사" />
          </SelectTrigger>
          <SelectContent>
            {doubleAccrualPartners.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
