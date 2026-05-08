import { useState } from "react";
import { settlementFilters } from "../../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

type LedgerFilterOption4Props = {
  className?: string;
};

/**
 * 필터 모듈 ④ — 승인번호 · 제휴카드사 · 거래구분 · 포인트 유형 · 매출 없는 매장 제외
 * (적립/사용 내역 공통 패턴)
 */
export function LedgerFilterOption4({ className }: LedgerFilterOption4Props) {
  const [cardIssuer, setCardIssuer] = useState("전체");
  const [transactionType, setTransactionType] = useState("전체");
  const [pointType, setPointType] = useState("전체");
  const [approvalQuery, setApprovalQuery] = useState("");
  const [excludeNoSalesStores, setExcludeNoSalesStores] = useState(true);

  return (
    <div className={cn("space-y-3 rounded-lg border border-border/80 bg-muted/20 p-4", className)}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1 lg:col-span-2">
          <p className="text-xs font-medium text-muted-foreground">승인번호</p>
          <Input
            placeholder="승인번호 검색"
            value={approvalQuery}
            onChange={(e) => setApprovalQuery(e.target.value)}
            className="bg-background"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">제휴카드사</p>
          <Select value={cardIssuer} onValueChange={setCardIssuer}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="전체" />
            </SelectTrigger>
            <SelectContent>
              {settlementFilters.affiliateCardIssuers.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">거래구분</p>
          <Select value={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="전체" />
            </SelectTrigger>
            <SelectContent>
              {settlementFilters.transactionTypes.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">포인트 유형</p>
          <Select value={pointType} onValueChange={setPointType}>
            <SelectTrigger className="bg-background">
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
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-input"
            checked={excludeNoSalesStores}
            onChange={(e) => setExcludeNoSalesStores(e.target.checked)}
          />
          <span>매출 없는 매장 제외</span>
        </label>
        <Button type="button" size="sm" variant="secondary">
          검색
        </Button>
      </div>
    </div>
  );
}
