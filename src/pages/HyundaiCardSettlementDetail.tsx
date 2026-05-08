import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { hyundaiCardSettlementSummaryRows } from "../data/mockData";
import DownloadHistoryModal from "../components/DownloadHistoryModal";
import { PeriodSelectOption2 } from "../components/common-input/PeriodSelectOption2";
import { BrandStoreSelectOption2 } from "../components/common-input/BrandStoreSelectOption2";
import { DownloadActionsOption4 } from "../components/common-input/DownloadActionsOption4";
import { getPreviousMonthYYYYMM } from "../lib/calendarUtils";

const noticeOptions = ["올리브영 현대카드 정산"] as const;

function fmtNum(n: number): string {
  if (n === 0) return "";
  return n.toLocaleString("ko-KR");
}

/** 올리브영 현대카드 정산내역 — 요약: 탭(−) · 기간② · 브랜드매장② · 필터(−) · 다운로드④ */
export default function HyundaiCardSettlementDetail() {
  const [monthStart, setMonthStart] = useState(getPreviousMonthYYYYMM);
  const [monthEnd, setMonthEnd] = useState(getPreviousMonthYYYYMM);
  const [downloadHistoryOpen, setDownloadHistoryOpen] = useState(false);
  const [noticeDialogOpen, setNoticeDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<string[]>(["올리브영 현대카드 정산"]);

  const totals = useMemo(
    () =>
      hyundaiCardSettlementSummaryRows.reduce(
        (acc, r) => ({
          issuedReward: acc.issuedReward + r.issuedReward,
          usedPoints: acc.usedPoints + r.usedPoints,
          useFee: acc.useFee + r.useFee,
        }),
        { issuedReward: 0, usedPoints: 0, useFee: 0 }
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
          <CardTitle className="text-xl font-semibold tracking-tight">정산 내역</CardTitle>
          <CardDescription>요약</CardDescription>
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
                <TableHead className="text-right">발행 리워드</TableHead>
                <TableHead className="text-right">사용 포인트</TableHead>
                <TableHead className="text-right">사용 수수료</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm [&_td]:whitespace-nowrap">
              {hyundaiCardSettlementSummaryRows.map((row, index) => (
                <TableRow key={`${row.settlementDate}-${index}`}>
                  <TableCell>{row.settlementDate}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.issuedReward)}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.usedPoints)}</TableCell>
                  <TableCell className="text-right">{fmtNum(row.useFee)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 border-border bg-muted/40 font-medium">
                <TableCell>총계</TableCell>
                <TableCell className="text-right">{fmtNum(totals.issuedReward)}</TableCell>
                <TableCell className="text-right">{fmtNum(totals.usedPoints)}</TableCell>
                <TableCell className="text-right">{fmtNum(totals.useFee)}</TableCell>
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
