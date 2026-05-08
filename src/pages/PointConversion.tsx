import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import {
  pointConversionDailyRows,
  pointConversionLedgerRows,
  pointConversionSummaryRows,
} from "../data/mockData";
import DownloadHistoryModal from "../components/DownloadHistoryModal";
import { TabSegmentOption3, type PointConversionTabValue } from "../components/common-input/TabSegmentOption3";
import { PeriodSelectOption1, type DatePreset } from "../components/common-input/PeriodSelectOption1";
import { PeriodSelectOption2 } from "../components/common-input/PeriodSelectOption2";
import { BrandStoreSelectOption1 } from "../components/common-input/BrandStoreSelectOption1";
import {
  AffiliateBrandSelectOption3,
  AFFILIATE_ALL_VALUE,
} from "../components/common-input/AffiliateBrandSelectOption3";
import { DownloadActionsOption3 } from "../components/common-input/DownloadActionsOption3";
import { DownloadActionsOption4 } from "../components/common-input/DownloadActionsOption4";
import { getPreviousMonthYYYYMM, getPreviousMonthDateRange } from "../lib/calendarUtils";

const noticeOptions = ["유입 전환", "유출 전환"] as const;

function fmtCellNum(n: number): string {
  if (n === 0) return "";
  return n.toLocaleString();
}

function fmtRate(s: string): string {
  return s || "";
}

function fmtText(s: string): string {
  return s || "";
}

export default function PointConversion() {
  const [conversionTab, setConversionTab] = useState<PointConversionTabValue>("monthlySummary");
  const [monthStart, setMonthStart] = useState(getPreviousMonthYYYYMM);
  const [monthEnd, setMonthEnd] = useState(getPreviousMonthYYYYMM);
  const [ledgerDateStart, setLedgerDateStart] = useState(() => getPreviousMonthDateRange().start);
  const [ledgerDateEnd, setLedgerDateEnd] = useState(() => getPreviousMonthDateRange().end);
  const [ledgerPreset, setLedgerPreset] = useState<DatePreset>("lastMonth");
  const [ledgerPartnerId, setLedgerPartnerId] = useState(AFFILIATE_ALL_VALUE);
  const [ledgerBrandId, setLedgerBrandId] = useState("");
  const [dailyDateStart, setDailyDateStart] = useState(() => getPreviousMonthDateRange().start);
  const [dailyDateEnd, setDailyDateEnd] = useState(() => getPreviousMonthDateRange().end);
  const [dailyPreset, setDailyPreset] = useState<DatePreset>("lastMonth");
  const [dailyPartnerId, setDailyPartnerId] = useState(AFFILIATE_ALL_VALUE);
  const [dailyBrandId, setDailyBrandId] = useState("");
  const [downloadHistoryOpen, setDownloadHistoryOpen] = useState(false);
  const [noticeDialogOpen, setNoticeDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<string[]>(["유입 전환"]);

  const totals = useMemo(
    () =>
      pointConversionSummaryRows.reduce(
        (acc, r) => ({
          inCount: acc.inCount + r.inCount,
          inPoints: acc.inPoints + r.inPoints,
          inFee: acc.inFee + r.inFee,
          outCount: acc.outCount + r.outCount,
          outPoints: acc.outPoints + r.outPoints,
          outFee: acc.outFee + r.outFee,
        }),
        { inCount: 0, inPoints: 0, inFee: 0, outCount: 0, outPoints: 0, outFee: 0 }
      ),
    []
  );

  const ledgerTotals = useMemo(
    () =>
      pointConversionLedgerRows.reduce(
        (acc, r) => ({
          convertPoints: acc.convertPoints + r.convertPoints,
          convertCancel: acc.convertCancel + r.convertCancel,
          convertNet: acc.convertNet + r.convertNet,
          fee: acc.fee + r.fee,
        }),
        { convertPoints: 0, convertCancel: 0, convertNet: 0, fee: 0 }
      ),
    []
  );

  const dailyTotals = useMemo(
    () =>
      pointConversionDailyRows.reduce(
        (acc, r) => ({
          convertPoints: acc.convertPoints + r.convertPoints,
          convertCancel: acc.convertCancel + r.convertCancel,
          convertNet: acc.convertNet + r.convertNet,
          fee: acc.fee + r.fee,
        }),
        { convertPoints: 0, convertCancel: 0, convertNet: 0, fee: 0 }
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
          <CardTitle className="text-xl font-semibold tracking-tight">포인트 전환</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TabSegmentOption3 value={conversionTab} onValueChange={setConversionTab} />

          {conversionTab === "monthlySummary" && (
            <>
              {/** 요약: 탭③ · 브랜드매장① · 기간② · 필터(-) · 다운로드④ */}
              <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                <BrandStoreSelectOption1 />
                <PeriodSelectOption2
                  monthStart={monthStart}
                  monthEnd={monthEnd}
                  onMonthStartChange={setMonthStart}
                  onMonthEndChange={setMonthEnd}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button type="button">조회</Button>
                <DownloadActionsOption4
                  onItemSettings={() => {}}
                  onExcelDownload={() => setDownloadHistoryOpen(true)}
                  onOfficialDownload={() => setNoticeDialogOpen(true)}
                />
              </div>
            </>
          )}

          {conversionTab === "dailyByDate" && (
            <>
              {/** 일자별: 탭③ · 기간① · 브랜드매장① · 필터③ · 다운로드③ (*필수값) */}
              <p className="text-xs text-muted-foreground">* 필수 입력 항목입니다.</p>
              <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                <PeriodSelectOption1
                  dateStart={dailyDateStart}
                  dateEnd={dailyDateEnd}
                  onDateStartChange={setDailyDateStart}
                  onDateEndChange={setDailyDateEnd}
                  preset={dailyPreset}
                  onPresetChange={setDailyPreset}
                />
                <BrandStoreSelectOption1 />
                <AffiliateBrandSelectOption3
                  partnerId={dailyPartnerId}
                  brandId={dailyBrandId}
                  onPartnerChange={setDailyPartnerId}
                  onBrandChange={setDailyBrandId}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button type="button">조회</Button>
                <DownloadActionsOption3
                  onItemSettings={() => {}}
                  onExcelDownload={() => setDownloadHistoryOpen(true)}
                />
              </div>
            </>
          )}

          {conversionTab === "byTransaction" && (
            <>
              {/** 건별: 탭③ · 기간① · 브랜드매장① · 필터③ · 다운로드③ */}
              <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                <PeriodSelectOption1
                  dateStart={ledgerDateStart}
                  dateEnd={ledgerDateEnd}
                  onDateStartChange={setLedgerDateStart}
                  onDateEndChange={setLedgerDateEnd}
                  preset={ledgerPreset}
                  onPresetChange={setLedgerPreset}
                />
                <BrandStoreSelectOption1 />
                <AffiliateBrandSelectOption3
                  partnerId={ledgerPartnerId}
                  brandId={ledgerBrandId}
                  onPartnerChange={setLedgerPartnerId}
                  onBrandChange={setLedgerBrandId}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button type="button">조회</Button>
                <DownloadActionsOption3
                  onItemSettings={() => {}}
                  onExcelDownload={() => setDownloadHistoryOpen(true)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {conversionTab === "monthlySummary" && (
        <Card>
          <CardContent className="overflow-x-auto pt-6">
            <Table>
              <TableHeader>
                <TableRow className="[&_th]:whitespace-nowrap [&_th]:text-xs">
                  <TableHead>정산기간</TableHead>
                  <TableHead>제휴사명</TableHead>
                  <TableHead className="text-right">유입 건수</TableHead>
                  <TableHead className="text-right">유입 포인트</TableHead>
                  <TableHead className="text-right">유입 수수료율</TableHead>
                  <TableHead className="text-right">유입 수수료</TableHead>
                  <TableHead className="text-right">유출 건수</TableHead>
                  <TableHead className="text-right">유출 포인트</TableHead>
                  <TableHead className="text-right">유출 수수료율</TableHead>
                  <TableHead className="text-right">유출 수수료</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm [&_td]:whitespace-nowrap">
                {pointConversionSummaryRows.map((row, index) => (
                  <TableRow key={`${row.period}-${row.affiliateName}-${index}`}>
                    <TableCell>{row.period}</TableCell>
                    <TableCell>{row.affiliateName}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.inCount)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.inPoints)}</TableCell>
                    <TableCell className="text-right">{fmtRate(row.inFeeRate)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.inFee)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.outCount)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.outPoints)}</TableCell>
                    <TableCell className="text-right">{fmtRate(row.outFeeRate)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.outFee)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-border bg-muted/40 font-medium">
                  <TableCell>총계</TableCell>
                  <TableCell />
                  <TableCell className="text-right">{fmtCellNum(totals.inCount)}</TableCell>
                  <TableCell className="text-right">{fmtCellNum(totals.inPoints)}</TableCell>
                  <TableCell className="text-right">—</TableCell>
                  <TableCell className="text-right">{fmtCellNum(totals.inFee)}</TableCell>
                  <TableCell className="text-right">{fmtCellNum(totals.outCount)}</TableCell>
                  <TableCell className="text-right">{fmtCellNum(totals.outPoints)}</TableCell>
                  <TableCell className="text-right">—</TableCell>
                  <TableCell className="text-right">{fmtCellNum(totals.outFee)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {conversionTab === "dailyByDate" && (
        <Card>
          <CardContent className="overflow-x-auto pt-6">
            <Table>
              <TableHeader>
                <TableRow className="[&_th]:whitespace-nowrap [&_th]:text-xs">
                  <TableHead>정산기간</TableHead>
                  <TableHead>제휴사명</TableHead>
                  <TableHead>거래 구분</TableHead>
                  <TableHead className="text-right">전환포인트</TableHead>
                  <TableHead className="text-right">전환 취소</TableHead>
                  <TableHead className="text-right">전환 계</TableHead>
                  <TableHead className="text-right">수수료율</TableHead>
                  <TableHead className="text-right">수수료</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm [&_td]:whitespace-nowrap">
                {pointConversionDailyRows.map((row, index) => (
                  <TableRow key={`${row.settlementPeriod}-${row.transactionKind}-${index}`}>
                    <TableCell>{row.settlementPeriod}</TableCell>
                    <TableCell>{row.affiliateName}</TableCell>
                    <TableCell>{row.transactionKind}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.convertPoints)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.convertCancel)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.convertNet)}</TableCell>
                    <TableCell className="text-right">{fmtRate(row.feeRate)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.fee)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-border bg-muted/40 font-medium">
                  <TableCell>총계</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell className="text-right">{fmtCellNum(dailyTotals.convertPoints)}</TableCell>
                  <TableCell className="text-right">{fmtCellNum(dailyTotals.convertCancel)}</TableCell>
                  <TableCell className="text-right">{fmtCellNum(dailyTotals.convertNet)}</TableCell>
                  <TableCell className="text-right">—</TableCell>
                  <TableCell className="text-right">{fmtCellNum(dailyTotals.fee)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {conversionTab === "byTransaction" && (
        <Card>
          <CardContent className="overflow-x-auto pt-6">
            <Table>
              <TableHeader>
                <TableRow className="[&_th]:whitespace-nowrap [&_th]:text-xs">
                  <TableHead>정산기간</TableHead>
                  <TableHead>제휴사명</TableHead>
                  <TableHead>거래 구분</TableHead>
                  <TableHead>회원번호</TableHead>
                  <TableHead>승인번호</TableHead>
                  <TableHead className="text-right">전환포인트</TableHead>
                  <TableHead className="text-right">전환 취소</TableHead>
                  <TableHead className="text-right">전환 계</TableHead>
                  <TableHead className="text-right">수수료율</TableHead>
                  <TableHead className="text-right">수수료</TableHead>
                  <TableHead>유효기간</TableHead>
                  <TableHead>영수증번호</TableHead>
                  <TableHead>원승인번호</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm [&_td]:whitespace-nowrap">
                {pointConversionLedgerRows.map((row, index) => (
                  <TableRow key={`${row.settlementPeriod}-${row.transactionKind}-${index}`}>
                    <TableCell>{row.settlementPeriod}</TableCell>
                    <TableCell>{row.affiliateName}</TableCell>
                    <TableCell>{row.transactionKind}</TableCell>
                    <TableCell>{fmtText(row.memberNo)}</TableCell>
                    <TableCell>{fmtText(row.approvalNo)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.convertPoints)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.convertCancel)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.convertNet)}</TableCell>
                    <TableCell className="text-right">{fmtRate(row.feeRate)}</TableCell>
                    <TableCell className="text-right">{fmtCellNum(row.fee)}</TableCell>
                    <TableCell>{fmtText(row.validUntil)}</TableCell>
                    <TableCell>{fmtText(row.receiptNo)}</TableCell>
                    <TableCell>{fmtText(row.originApprovalNo)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-border bg-muted/40 font-medium">
                  <TableCell>총계</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell className="text-right">{fmtCellNum(ledgerTotals.convertPoints)}</TableCell>
                  <TableCell className="text-right">{fmtCellNum(ledgerTotals.convertCancel)}</TableCell>
                  <TableCell className="text-right">{fmtCellNum(ledgerTotals.convertNet)}</TableCell>
                  <TableCell className="text-right">—</TableCell>
                  <TableCell className="text-right">{fmtCellNum(ledgerTotals.fee)}</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

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
