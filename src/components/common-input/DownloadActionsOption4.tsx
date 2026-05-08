import { ChevronDown, Download } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

type DownloadActionsOption4Props = {
  onItemSettings?: () => void;
  onExcelDownload: () => void;
  onOfficialDownload: () => void;
  className?: string;
};

/** 다운로드 모듈 ④ — 항목 추가·삭제 | 엑셀 다운로드 | 공문 다운로드 */
export function DownloadActionsOption4({
  onItemSettings,
  onExcelDownload,
  onOfficialDownload,
  className,
}: DownloadActionsOption4Props) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={onItemSettings}
        aria-haspopup="true"
      >
        항목 추가·삭제
        <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
      </Button>
      <Button type="button" variant="outline" size="sm" className="gap-1" onClick={onExcelDownload}>
        <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
        엑셀 다운로드
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={onOfficialDownload}>
        공문 다운로드
      </Button>
    </div>
  );
}
