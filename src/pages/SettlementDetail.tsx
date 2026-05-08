import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { settlementDetailRows, settlementFilters } from "../data/mockData";
import { useBrandStore } from "../context/BrandStoreContext";
import BrandStoreSelector from "../components/BrandStoreSelector";
import DateRangeFilter from "../components/DateRangeFilter";
import DownloadHistoryModal from "../components/DownloadHistoryModal";
import { getPreviousMonthDateRange } from "../lib/calendarUtils";

export default function SettlementDetail() {
  const { showStoreInTable } = useBrandStore();
  const [dateStart, setDateStart] = useState(() => getPreviousMonthDateRange().start);
  const [dateEnd, setDateEnd] = useState(() => getPreviousMonthDateRange().end);
  const [preset, setPreset] = useState<"lastMonth" | "last3Months" | "last6Months" | "thisYear">("lastMonth");
  const [downloadHistoryOpen, setDownloadHistoryOpen] = useState(false);
  const totals = useMemo(() => {
    return settlementDetailRows.reduce(
      (acc, row) => {
        acc.count += row.count;
        acc.points += row.points;
        acc.cancelPoints += row.cancelPoints;
        acc.netPoints += row.netPoints;
        acc.targetAmount += row.targetAmount;
        acc.earnFee += row.earnFee;
        acc.useFee += row.useFee;
        return acc;
      },
      { count: 0, points: 0, cancelPoints: 0, netPoints: 0, targetAmount: 0, earnFee: 0, useFee: 0 }
    );
  }, []);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>정산 상세</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <DateRangeFilter
              dateStart={dateStart}
              dateEnd={dateEnd}
              onDateStartChange={setDateStart}
              onDateEndChange={setDateEnd}
              preset={preset}
              onPresetChange={setPreset}
            />
            <div className="flex flex-wrap items-end gap-3">
              <BrandStoreSelector />
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">거래유형</p>
                <Select defaultValue={settlementFilters.transactionTypes[0]}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="거래유형" />
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
                <p className="text-xs text-muted-foreground">집계단위</p>
                <Select defaultValue={settlementFilters.groupingUnits[0]}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="집계단위" />
                  </SelectTrigger>
                  <SelectContent>
                    {settlementFilters.groupingUnits.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button>조회</Button>
            <Button variant="outline" type="button" onClick={() => setDownloadHistoryOpen(true)}>
              엑셀 다운로드
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>거래 유형별 정산 흐름</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>거래일자(월)</TableHead>
                <TableHead>브랜드</TableHead>
                {showStoreInTable && <TableHead>매장</TableHead>}
                <TableHead>거래유형</TableHead>
                <TableHead>포인트유형</TableHead>
                <TableHead className="text-right">건수</TableHead>
                <TableHead className="text-right">포인트</TableHead>
                <TableHead className="text-right">취소포인트</TableHead>
                <TableHead className="text-right">순포인트</TableHead>
                <TableHead className="text-right">대상금액</TableHead>
                <TableHead className="text-right">적립 수수료</TableHead>
                <TableHead className="text-right">사용 수수료</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {settlementDetailRows.map((row, index) => (
                <TableRow key={`${row.date}-${index}`}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.brand}</TableCell>
                  {showStoreInTable && <TableCell>{row.store}</TableCell>}
                  <TableCell>{row.transactionType}</TableCell>
                  <TableCell>{row.pointType}</TableCell>
                  <TableCell className="text-right">{row.count.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.points.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.cancelPoints.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.netPoints.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.targetAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.earnFee.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.useFee.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 border-border bg-muted/40 font-medium">
                <TableCell>합계</TableCell>
                <TableCell>-</TableCell>
                {showStoreInTable && <TableCell>-</TableCell>}
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="text-right">{totals.count.toLocaleString()}</TableCell>
                <TableCell className="text-right">{totals.points.toLocaleString()}</TableCell>
                <TableCell className="text-right">{totals.cancelPoints.toLocaleString()}</TableCell>
                <TableCell className="text-right">{totals.netPoints.toLocaleString()}</TableCell>
                <TableCell className="text-right">{totals.targetAmount.toLocaleString()}</TableCell>
                <TableCell className="text-right">{totals.earnFee.toLocaleString()}</TableCell>
                <TableCell className="text-right">{totals.useFee.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DownloadHistoryModal open={downloadHistoryOpen} onOpenChange={setDownloadHistoryOpen} />
    </div>
  );
}
