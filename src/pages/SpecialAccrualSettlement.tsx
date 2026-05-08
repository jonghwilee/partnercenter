import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { specialAccrualSettlementRows } from "../data/mockData";
import DownloadHistoryModal from "../components/DownloadHistoryModal";
import { PeriodSelectOption2 } from "../components/common-input/PeriodSelectOption2";
import { BrandStoreSelectOption1 } from "../components/common-input/BrandStoreSelectOption1";
import { DownloadActionsOption4 } from "../components/common-input/DownloadActionsOption4";
import { getPreviousMonthYYYYMM } from "../lib/calendarUtils";

const noticeOptions = ["제휴카드 특별적립"] as const;

function fmtNum(n: number): string {
  if (n === 0) return "";
  return n.toLocaleString("ko-KR");
}

/** 제휴카드 특별적립 — 탭(-) · 기간② · 브랜드매장① · 필터(-) · 다운로드④ */
export default function SpecialAccrualSettlement() {
  const [monthStart, setMonthStart] = useState(getPreviousMonthYYYYMM);
  const [monthEnd, setMonthEnd] = useState(getPreviousMonthYYYYMM);
  const [downloadHistoryOpen, setDownloadHistoryOpen] = useState(false);
  const [noticeDialogOpen, setNoticeDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<string[]>(["제휴카드 특별적립"]);

  const totals = useMemo(
    () =>
      specialAccrualSettlementRows.reduce(
        (acc, r) => ({
          count: acc.count + r.count,
          usageAmount: acc.usageAmount + r.usageAmount,
          earnPoints: acc.earnPoints + r.earnPoints,
        }),
        { count: 0, usageAmount: 0, earnPoints: 0 }
      ),
    []
  );

  const toggleNotice = (value: string) => {
    setSelectedNotice((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">제휴카드 특별적립</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <PeriodSelectOption2
              monthStart={monthStart}
              monthEnd={monthEnd}
              onMonthStartChange={setMonthStart}
              onMonthEndChange={setMonthEnd}
            />
            <BrandStoreSelectOption1 />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button type="button">조회</Button>
            <DownloadActionsOption4
              onItemSettings={() => {}}
              onExcelDownload={() => setDownloadHistoryOpen(true)}
              onOfficialDownload={() => setNoticeDialogOpen(true)}
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
                <TableHead>제휴사</TableHead>
                <TableHead className="text-right">건수</TableHead>
                <TableHead className="text-right">이용금액</TableHead>
                <TableHead className="text-right">적립포인트</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm [&_td]:whitespace-nowrap">
              {specialAccrualSettlementRows.map((row, index) => (
                <TableRow key={`${row.settlementDate}-${index}`}>
                  <TableCell>{row.settlementDate}</TableCell>
                  <TableCell>{row.affiliate}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.count)}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.usageAmount)}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.earnPoints)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 border-border bg-muted/40 font-medium">
                <TableCell>총계</TableCell>
                <TableCell />
                <TableCell className="text-right">{fmtNum(totals.count)}</TableCell>
                <TableCell className="text-right">{fmtNum(totals.usageAmount)}</TableCell>
                <TableCell className="text-right">{fmtNum(totals.earnPoints)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DownloadHistoryModal open={downloadHistoryOpen} onOpenChange={setDownloadHistoryOpen} />

      {noticeDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setNoticeDialogOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold">공문 다운로드</h3>
            <p className="mb-4 text-sm text-muted-foreground">다운로드할 항목을 선택해 주세요.</p>
            <div className="space-y-3">
              {noticeOptions.map((label) => (
                <label
                  key={label}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50"
                >
                  <input
                    type="checkbox"
                    checked={selectedNotice.includes(label)}
                    onChange={() => toggleNotice(label)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNoticeDialogOpen(false)}>
                취소
              </Button>
              <Button
                onClick={() => setNoticeDialogOpen(false)}
                disabled={selectedNotice.length === 0}
              >
                다운로드
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
