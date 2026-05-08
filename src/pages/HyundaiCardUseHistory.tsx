import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { hyundaiCardUseHistoryRows } from "../data/mockData";
import DownloadHistoryModal from "../components/DownloadHistoryModal";
import { PeriodSelectOption2 } from "../components/common-input/PeriodSelectOption2";
import { BrandStoreSelectOption2 } from "../components/common-input/BrandStoreSelectOption2";
import { DownloadActionsOption3 } from "../components/common-input/DownloadActionsOption3";
import { getPreviousMonthYYYYMM } from "../lib/calendarUtils";

function fmtNum(n: number): string {
  if (n === 0) return "";
  return n.toLocaleString("ko-KR");
}

function fmtText(s: string): string {
  return s || "";
}

/** 올리브영 현대카드 사용 내역 — 탭(−) · 기간② · 브랜드매장② · 필터(−) · 다운로드③ */
export default function HyundaiCardUseHistory() {
  const [monthStart, setMonthStart] = useState(getPreviousMonthYYYYMM);
  const [monthEnd, setMonthEnd] = useState(getPreviousMonthYYYYMM);
  const [downloadHistoryOpen, setDownloadHistoryOpen] = useState(false);

  const totals = useMemo(
    () =>
      hyundaiCardUseHistoryRows.reduce(
        (acc, r) => ({
          usePoints: acc.usePoints + r.usePoints,
          useCancel: acc.useCancel + r.useCancel,
          useNet: acc.useNet + r.useNet,
          feeAmount: acc.feeAmount + r.feeAmount,
        }),
        { usePoints: 0, useCancel: 0, useNet: 0, feeAmount: 0 }
      ),
    []
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">사용 내역</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <PeriodSelectOption2
              monthStart={monthStart}
              monthEnd={monthEnd}
              onMonthStartChange={setMonthStart}
              onMonthEndChange={setMonthEnd}
            />
            <BrandStoreSelectOption2 />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button type="button">조회</Button>
            <DownloadActionsOption3
              onItemSettings={() => {}}
              onExcelDownload={() => setDownloadHistoryOpen(true)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="overflow-x-auto pt-6">
          <Table>
            <TableHeader>
              <TableRow className="[&_th]:whitespace-nowrap [&_th]:text-xs">
                <TableHead>정산일자</TableHead>
                <TableHead>브랜드</TableHead>
                <TableHead>매장</TableHead>
                <TableHead className="text-right">사용 포인트</TableHead>
                <TableHead className="text-right">사용 취소</TableHead>
                <TableHead className="text-right">사용 계</TableHead>
                <TableHead className="text-right">수수료율</TableHead>
                <TableHead className="text-right">수수료 금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm [&_td]:whitespace-nowrap">
              {hyundaiCardUseHistoryRows.map((row, index) => (
                <TableRow key={`${row.settlementDate}-${index}`}>
                  <TableCell>{row.settlementDate}</TableCell>
                  <TableCell>{fmtText(row.brand)}</TableCell>
                  <TableCell>{fmtText(row.store)}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.usePoints)}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.useCancel)}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.useNet)}</TableCell>
                  <TableCell className="text-right">{fmtText(row.feeRate)}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.feeAmount)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 border-border bg-muted/40 font-medium">
                <TableCell>총계</TableCell>
                <TableCell />
                <TableCell />
                <TableCell className="text-right">{fmtNum(totals.usePoints)}</TableCell>
                <TableCell className="text-right">{fmtNum(totals.useCancel)}</TableCell>
                <TableCell className="text-right">{fmtNum(totals.useNet)}</TableCell>
                <TableCell className="text-right">—</TableCell>
                <TableCell className="text-right">{fmtNum(totals.feeAmount)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DownloadHistoryModal open={downloadHistoryOpen} onOpenChange={setDownloadHistoryOpen} />
    </div>
  );
}
