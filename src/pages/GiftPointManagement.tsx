import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { giftPointByItemLedgerRows, giftPointSummaryRows } from "../data/mockData";
import DownloadHistoryModal from "../components/DownloadHistoryModal";
import {
  TabSegmentGiftPointManagementOption3,
  type GiftPointManagementTabValue,
} from "../components/common-input/TabSegmentGiftPointManagementOption3";
import { PeriodSelectOption2 } from "../components/common-input/PeriodSelectOption2";
import { GiftPointBrandProductOption3 } from "../components/common-input/GiftPointBrandProductOption3";
import { DownloadActionsOption4 } from "../components/common-input/DownloadActionsOption4";
import { AFFILIATE_ALL_VALUE } from "../components/common-input/AffiliateBrandSelectOption3";
import { getPreviousMonthYYYYMM } from "../lib/calendarUtils";

const noticeOptions = ["기프트 포인트"] as const;

function fmtInt(n: number): string {
  if (n === 0) return "0";
  return n.toLocaleString("ko-KR");
}

function fmtAmt(n: number): string {
  return n.toLocaleString("ko-KR");
}

function fmtCell(s: string) {
  return s || "";
}

/** 기프트 포인트 정산(발행/등록/소멸) — 요약·건별: ③②③−④ */
export default function GiftPointManagement() {
  const [tab, setTab] = useState<GiftPointManagementTabValue>("summary");
  const [monthStart, setMonthStart] = useState(getPreviousMonthYYYYMM);
  const [monthEnd, setMonthEnd] = useState(getPreviousMonthYYYYMM);
  const [partnerId, setPartnerId] = useState(AFFILIATE_ALL_VALUE);
  const [brandId, setBrandId] = useState("");
  const [productCategory, setProductCategory] = useState("전체");
  const [downloadHistoryOpen, setDownloadHistoryOpen] = useState(false);
  const [noticeDialogOpen, setNoticeDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<string[]>(["기프트 포인트"]);

  const totals = useMemo(
    () =>
      giftPointSummaryRows.reduce(
        (acc, r) => ({
          issueQty: acc.issueQty + r.issueQty,
          issueAmount: acc.issueAmount + r.issueAmount,
          registerQty: acc.registerQty + r.registerQty,
          registerAmount: acc.registerAmount + r.registerAmount,
          expireQty: acc.expireQty + r.expireQty,
          expireAmount: acc.expireAmount + r.expireAmount,
        }),
        {
          issueQty: 0,
          issueAmount: 0,
          registerQty: 0,
          registerAmount: 0,
          expireQty: 0,
          expireAmount: 0,
        }
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
          <CardTitle className="text-xl font-semibold tracking-tight">기프트 포인트 정산</CardTitle>
          <CardDescription>발행 / 등록 / 소멸</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TabSegmentGiftPointManagementOption3 value={tab} onValueChange={setTab} />

          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
            <PeriodSelectOption2
              monthStart={monthStart}
              monthEnd={monthEnd}
              onMonthStartChange={setMonthStart}
              onMonthEndChange={setMonthEnd}
            />
            <GiftPointBrandProductOption3
              partnerId={partnerId}
              brandId={brandId}
              productCategory={productCategory}
              onPartnerChange={setPartnerId}
              onBrandChange={setBrandId}
              onProductCategoryChange={setProductCategory}
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
        </CardContent>
      </Card>

      {tab === "summary" && (
        <Card>
          <CardContent className="overflow-x-auto pt-6">
            <Table>
              <TableHeader>
                <TableRow className="[&_th]:whitespace-nowrap [&_th]:text-xs">
                  <TableHead rowSpan={2} className="align-middle border-r bg-muted/20">
                    정산월
                  </TableHead>
                  <TableHead rowSpan={2} className="align-middle border-r bg-muted/20">
                    제휴사
                  </TableHead>
                  <TableHead rowSpan={2} className="align-middle border-r bg-muted/20">
                    상품명
                  </TableHead>
                  <TableHead rowSpan={2} className="align-middle border-r bg-muted/20 text-right">
                    단가
                  </TableHead>
                  <TableHead rowSpan={2} className="align-middle border-r bg-muted/20 text-right">
                    할인율
                  </TableHead>
                  <TableHead colSpan={2} className="border-x bg-muted/30 text-center text-[11px] font-medium leading-tight">
                    * 발행 − 발행취소
                  </TableHead>
                  <TableHead colSpan={2} className="border-x bg-muted/30 text-center text-[11px] font-medium leading-tight">
                    등록 − 등록취소
                  </TableHead>
                  <TableHead colSpan={2} className="bg-muted/30 text-center text-[11px] font-medium leading-tight">
                    소멸
                  </TableHead>
                </TableRow>
                <TableRow className="[&_th]:whitespace-nowrap [&_th]:text-xs">
                  <TableHead className="border-l bg-muted/15 text-right">발행수량</TableHead>
                  <TableHead className="border-r text-right">발행금액</TableHead>
                  <TableHead className="text-right">등록수량</TableHead>
                  <TableHead className="border-r text-right">등록금액</TableHead>
                  <TableHead className="text-right">소멸수량</TableHead>
                  <TableHead className="text-right">소멸금액</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm [&_td]:whitespace-nowrap">
                {giftPointSummaryRows.map((row, index) => (
                  <TableRow key={`${row.productName}-${index}`}>
                    <TableCell className="border-r">{row.period}</TableCell>
                    <TableCell className="border-r">{row.affiliate}</TableCell>
                    <TableCell className="max-w-[14rem] border-r truncate" title={row.productName}>
                      {row.productName}
                    </TableCell>
                    <TableCell className="border-r text-right">{fmtAmt(row.unitPrice)}</TableCell>
                    <TableCell className="border-r text-right">{row.discountRate}</TableCell>
                    <TableCell className="text-right">{fmtInt(row.issueQty)}</TableCell>
                    <TableCell className="border-r text-right">{fmtAmt(row.issueAmount)}</TableCell>
                    <TableCell className="text-right">{fmtInt(row.registerQty)}</TableCell>
                    <TableCell className="border-r text-right">{fmtAmt(row.registerAmount)}</TableCell>
                    <TableCell className="text-right">{fmtInt(row.expireQty)}</TableCell>
                    <TableCell className="text-right">{fmtAmt(row.expireAmount)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-border bg-muted/40 font-medium">
                  <TableCell className="border-r">총계</TableCell>
                  <TableCell className="border-r" />
                  <TableCell className="border-r" />
                  <TableCell className="border-r" />
                  <TableCell className="border-r" />
                  <TableCell className="text-right">{fmtInt(totals.issueQty)}</TableCell>
                  <TableCell className="border-r text-right">{fmtAmt(totals.issueAmount)}</TableCell>
                  <TableCell className="text-right">{fmtInt(totals.registerQty)}</TableCell>
                  <TableCell className="border-r text-right">{fmtAmt(totals.registerAmount)}</TableCell>
                  <TableCell className="text-right">{fmtInt(totals.expireQty)}</TableCell>
                  <TableCell className="text-right">{fmtAmt(totals.expireAmount)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {tab === "byItem" && (
        <Card>
          <CardContent className="overflow-x-auto pt-6">
            <Table>
              <TableHeader>
                <TableRow className="[&_th]:whitespace-nowrap [&_th]:text-xs">
                  <TableHead>정산월</TableHead>
                  <TableHead>인증번호</TableHead>
                  <TableHead>제휴사</TableHead>
                  <TableHead>상품구분</TableHead>
                  <TableHead>발행일자</TableHead>
                  <TableHead>발행 취소여부</TableHead>
                  <TableHead>발행 취소일자</TableHead>
                  <TableHead>등록 기한</TableHead>
                  <TableHead>등록여부</TableHead>
                  <TableHead>등록일자</TableHead>
                  <TableHead>등록 취소일자</TableHead>
                  <TableHead>등록자</TableHead>
                  <TableHead>소멸 여부</TableHead>
                  <TableHead>회원번호</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm [&_td]:whitespace-nowrap">
                {giftPointByItemLedgerRows.map((row, index) => (
                  <TableRow key={`gift-ledger-${index}`}>
                    <TableCell>{row.period}</TableCell>
                    <TableCell>{fmtCell(row.certNo)}</TableCell>
                    <TableCell>{fmtCell(row.affiliate)}</TableCell>
                    <TableCell className="max-w-[12rem] truncate" title={row.productCategory}>
                      {fmtCell(row.productCategory)}
                    </TableCell>
                    <TableCell>{fmtCell(row.issueDate)}</TableCell>
                    <TableCell>{fmtCell(row.issueCanceled)}</TableCell>
                    <TableCell>{fmtCell(row.issueCancelDate)}</TableCell>
                    <TableCell>{fmtCell(row.registerDeadline)}</TableCell>
                    <TableCell>{fmtCell(row.registered)}</TableCell>
                    <TableCell>{fmtCell(row.registerDate)}</TableCell>
                    <TableCell>{fmtCell(row.registerCancelDate)}</TableCell>
                    <TableCell>{fmtCell(row.registrant)}</TableCell>
                    <TableCell>{fmtCell(row.expired)}</TableCell>
                    <TableCell>{fmtCell(row.memberNo)}</TableCell>
                  </TableRow>
                ))}
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
