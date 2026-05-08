import BrandStoreSelector from "../BrandStoreSelector";
import { cn } from "../../lib/utils";

type BrandStoreSelectOption1Props = {
  className?: string;
};

/** 브랜드·매장 선택 모듈 ① — 단일 트리거(포인트 전환 등) */
export function BrandStoreSelectOption1({ className }: BrandStoreSelectOption1Props) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs font-medium text-muted-foreground">브랜드 | 매장</p>
      <BrandStoreSelector triggerClassName="h-10 w-[min(22rem,calc(100vw-6rem))] min-w-[12rem] max-w-[22rem] shrink-0 justify-between" />
    </div>
  );
}
