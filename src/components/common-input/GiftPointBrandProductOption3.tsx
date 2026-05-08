import { giftPointProductCategoryFilters } from "../../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  AffiliateBrandSelectOption3,
  AFFILIATE_ALL_VALUE,
} from "./AffiliateBrandSelectOption3";
import { cn } from "../../lib/utils";

type GiftPointBrandProductOption3Props = {
  partnerId: string;
  brandId: string;
  productCategory: string;
  onPartnerChange: (id: string) => void;
  onBrandChange: (id: string) => void;
  onProductCategoryChange: (v: string) => void;
  className?: string;
};

/** 브랜드·상품구분 모듈 ③ — 제휴사·브랜드 + 상품구분 (기프트 포인트 요약) */
export function GiftPointBrandProductOption3({
  partnerId,
  brandId,
  productCategory,
  onPartnerChange,
  onBrandChange,
  onProductCategoryChange,
  className,
}: GiftPointBrandProductOption3Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <AffiliateBrandSelectOption3
        partnerId={partnerId}
        brandId={brandId}
        onPartnerChange={onPartnerChange}
        onBrandChange={onBrandChange}
      />
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">상품구분</p>
          <Select value={productCategory} onValueChange={onProductCategoryChange}>
            <SelectTrigger className="w-[10.5rem] bg-background">
              <SelectValue placeholder="상품구분" />
            </SelectTrigger>
            <SelectContent>
              {giftPointProductCategoryFilters.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground">* 브랜드 · 상품구분 기준으로 집계됩니다.</p>
    </div>
  );
}

export { AFFILIATE_ALL_VALUE };
