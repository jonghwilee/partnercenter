import { scopeOptions } from "../../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "../../lib/utils";

const ALL = "__all__";

type AffiliateBrandSelectOption3Props = {
  partnerId: string;
  brandId: string;
  onPartnerChange: (partnerId: string) => void;
  onBrandChange: (brandId: string) => void;
  className?: string;
};

/** 브랜드·매장 선택 모듈 ③ — 제휴사 + 브랜드 (별도 셀렉트) */
export function AffiliateBrandSelectOption3({
  partnerId,
  brandId,
  onPartnerChange,
  onBrandChange,
  className,
}: AffiliateBrandSelectOption3Props) {
  const brands =
    partnerId === ALL
      ? scopeOptions.brands
      : scopeOptions.brands.filter((b) => b.partnerId === partnerId);

  return (
    <div className={cn("flex flex-wrap items-end gap-3", className)}>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">제휴사</p>
        <Select
          value={partnerId}
          onValueChange={(v) => {
            onPartnerChange(v);
            onBrandChange("");
          }}
        >
          <SelectTrigger className="h-10 w-[9rem] shrink-0 bg-background">
            <SelectValue placeholder="제휴사" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>전체</SelectItem>
            {scopeOptions.partners.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">브랜드</p>
        <Select
          value={brandId || undefined}
          onValueChange={onBrandChange}
        >
          <SelectTrigger className="h-10 w-[min(22rem,calc(100vw-6rem))] min-w-[12rem] max-w-[22rem] bg-background">
            <SelectValue placeholder="브랜드 선택" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export { ALL as AFFILIATE_ALL_VALUE };
