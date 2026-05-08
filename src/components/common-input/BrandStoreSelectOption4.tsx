import { useState } from "react";
import { scopeOptions } from "../../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import BrandStoreSelector from "../BrandStoreSelector";
import { AFFILIATE_ALL_VALUE } from "./AffiliateBrandSelectOption3";
import { cn } from "../../lib/utils";

type BrandStoreSelectOption4Props = {
  className?: string;
};

/** 브랜드·매장 선택 모듈 ④ — 제휴사 + 브랜드|매장(적립 상세내역과 동일 드롭다운 UI) */
export function BrandStoreSelectOption4({ className }: BrandStoreSelectOption4Props) {
  const [partnerId, setPartnerId] = useState(AFFILIATE_ALL_VALUE);

  return (
    <div className={cn("flex flex-wrap items-end gap-3", className)}>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">제휴사</p>
        <Select
          value={partnerId}
          onValueChange={(v) => setPartnerId(v)}
        >
          <SelectTrigger className="h-10 w-[9rem] shrink-0 bg-background">
            <SelectValue placeholder="제휴사" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AFFILIATE_ALL_VALUE}>전체</SelectItem>
            {scopeOptions.partners.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">브랜드 | 매장</p>
        <BrandStoreSelector
          filterPartnerId={partnerId === AFFILIATE_ALL_VALUE ? undefined : partnerId}
          triggerClassName="h-10 w-[min(22rem,calc(100vw-6rem))] min-w-[12rem] max-w-[22rem] shrink-0 justify-between"
        />
      </div>
    </div>
  );
}
